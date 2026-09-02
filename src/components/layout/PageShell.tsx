import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import { usePageMeta } from '../../hooks/usePageMeta';
import { ClientLogoMarquee } from '../sections/ClientLogoMarquee';
import { getLanguageFromPath } from '../../i18n';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function PageShell() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');
  const language = getLanguageFromPath(location.pathname);

  usePageMeta();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const autoRevealElements = Array.from(
      document.querySelectorAll<HTMLElement>('.premium-card, .feature-panel, .glass-strip'),
    );
    autoRevealElements.forEach((element) => {
      if (!element.hasAttribute('data-reveal')) {
        element.setAttribute('data-reveal', 'auto');
      }
    });

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const showImmediately = () => {
      revealElements.forEach((element) => element.classList.add('is-visible'));
    };

    if (reducedMotionQuery.matches) {
      showImmediately();
      document.documentElement.style.setProperty('--shell-parallax-shift', '0px');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    let ticking = false;
    const updateParallax = () => {
      document.documentElement.style.setProperty(
        '--shell-parallax-shift',
        `${Math.min(window.scrollY * 0.08, 40)}px`,
      );
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="page-shell min-h-screen bg-background text-foreground" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
      <div className="ambient-orb ambient-orb-two" aria-hidden="true" />
      <div className="ambient-grid" aria-hidden="true" />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      {!isAdminPage ? <ClientLogoMarquee /> : null}
      <Footer />
    </div>
  );
}

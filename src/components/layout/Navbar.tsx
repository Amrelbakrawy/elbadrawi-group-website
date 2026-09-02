import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { productRange } from '../../config/products';
import { commonText, getAlternateLanguagePath, getLanguageFromPath, localizePath, navigationText, stripLanguagePrefix } from '../../i18n';
import { buttonClasses } from '../../utils/buttonClasses';
import { BrandLogo } from './BrandLogo';

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const language = getLanguageFromPath(location.pathname);
  const text = commonText[language];
  const navigation = navigationText[language];
  const currentPath = stripLanguagePrefix(location.pathname);
  const alternatePath = getAlternateLanguagePath(location.pathname);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) =>
    path === '/' ? currentPath === '/' : currentPath.startsWith(path);

  const productMenuItems = productRange.map((product) => ({
    label: language === 'ar' ? product.arName : product.name,
    slug: product.name.toLowerCase().replaceAll(' ', '-').replaceAll('&', 'and'),
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="site-container py-4 md:py-5">
        <div className="flex justify-center border-b border-slate-100 pb-4 md:pb-5 mb-1">
          <Link to={localizePath('/', language)} className="shrink-0" aria-label="Elbadrawi Group home">
            <BrandLogo
              className="reveal-fade"
              imageClassName="h-auto w-[160px] md:w-[220px]"
            />
          </Link>
        </div>

        <div className="flex min-h-16 items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-4 xl:gap-7 lg:flex">
            {navigation.map((item) => (
              <div key={item.path} className="group relative">
                <Link
                  to={localizePath(item.path, language)}
                  className={`relative inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  {item.hasProducts ? <ChevronDown className="h-3.5 w-3.5" /> : null}
                </Link>
                {item.hasProducts ? (
                  <div className={`invisible absolute ${language === 'ar' ? 'right-0' : 'left-0'} top-full z-50 mt-4 max-h-[70vh] w-72 translate-y-2 overflow-y-auto rounded-2xl border border-border bg-white p-3 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100`}>
                    {productMenuItems.map(({ label, slug }) => {
                      const path = `${localizePath('/products', language)}?category=${encodeURIComponent(slug)}`;
                      return (
                        <Link
                          key={label}
                          to={path}
                          className="block rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-panel hover:text-foreground"
                        >
                          {label}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 lg:gap-6">
            {/* Desktop CTA */}
            <Link to={localizePath('/request-a-quote', language)} className={`hidden lg:inline-flex ${buttonClasses.primary}`}>
              {text.requestQuote}
            </Link>
            <Link
              to={alternatePath}
              className="hidden rounded-full border border-slate-200 px-3 py-2 text-xs font-bold tracking-wider text-foreground transition hover:bg-slate-50 lg:inline-flex"
              aria-label={language === 'ar' ? 'Switch to English' : 'Switch to Arabic'}
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-foreground hover:bg-slate-50 transition-colors duration-150"
              aria-label={isOpen ? text.closeMenu : text.openMenu}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((value) => !value)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="site-container py-4 space-y-2">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <div key={item.path}>
                  <Link
                    to={localizePath(item.path, language)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(item.path)
                        ? 'bg-panel text-foreground'
                        : 'text-foreground hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.hasProducts ? (
                    <div className={`${language === 'ar' ? 'mr-4 border-r pr-3' : 'ml-4 border-l pl-3'} max-h-80 overflow-y-auto border-border`}>
                      {productMenuItems.map(({ label, slug }) => {
                        const path = `${localizePath('/products', language)}?category=${encodeURIComponent(slug)}`;
                        return (
                          <Link
                            key={label}
                            to={path}
                            className="block rounded-lg px-4 py-2 text-sm text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                          >
                            {label}
                          </Link>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              ))}
            </nav>
            
            <div className="pt-3 border-t border-slate-100">
              <Link 
                to={localizePath('/request-a-quote', language)}
                className={`block text-center ${buttonClasses.primary}`}
              >
                {text.requestQuote}
              </Link>
              <Link
                to={alternatePath}
                className="mt-3 block rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-bold tracking-wider text-foreground"
              >
                {language === 'ar' ? 'EN' : 'AR'}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

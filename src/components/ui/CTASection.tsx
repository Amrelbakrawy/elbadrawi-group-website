import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

type CTASectionProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  tone?: 'light' | 'dark';
  backgroundImage?: string;
};

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
  tone = 'dark',
  backgroundImage,
}: CTASectionProps) {
  const isDark = tone === 'dark';

  return (
    <section
      className={`${backgroundImage ? 'relative bg-cover bg-center text-foreground' : isDark ? 'bg-foreground text-white' : 'bg-panel text-foreground'}`}
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : undefined}
    >
      {backgroundImage ? <div className="absolute inset-0 bg-stone-50/24" /> : null}
      <div className="site-container py-24 md:py-28">
        <div
          data-reveal
          className={`relative ${
            backgroundImage
              ? 'glass-strip rounded-[40px] border border-white/55 bg-white/52 px-8 py-14 shadow-[0_28px_70px_rgba(15,23,42,0.08)] backdrop-blur-[2px] md:px-14 md:py-18'
              : isDark
              ? 'rounded-[40px] border border-white/10 bg-black/92 px-8 py-14 md:px-14 md:py-18 shadow-[0_28px_70px_rgba(0,0,0,0.18)]'
              : 'glass-strip rounded-[40px] border border-border bg-white/80 px-8 py-14 md:px-14 md:py-18'
          }`}
        >
          <div className="max-w-4xl">
            <p className={`eyebrow ${isDark && !backgroundImage ? 'text-stone-400' : ''}`}>Start the conversation</p>
            <h2 className={`section-title mt-7 ${isDark && !backgroundImage ? 'text-white' : ''}`}>{title}</h2>
            <p className={`section-copy mt-7 max-w-3xl ${isDark && !backgroundImage ? 'text-stone-300' : ''}`}>{description}</p>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link to={primaryTo} className={isDark && !backgroundImage ? 'button-light' : 'button-primary'}>
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            {secondaryLabel && secondaryTo ? (
              <Link to={secondaryTo} className={isDark && !backgroundImage ? 'button-outline-light' : 'button-secondary'}>
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

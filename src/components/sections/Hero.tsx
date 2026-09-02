import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { elbadrawiImages } from '../../config/elbadrawiImages';
import { fullProductSentence } from '../../config/products';
import { commonText, homeText, localizePath, useLanguage } from '../../i18n';
import { buttonClasses, buttonGroupClasses } from '../../utils/buttonClasses';

export function Hero() {
  const language = useLanguage();
  const isArabic = language === 'ar';
  const text = homeText[language];

  return (
    <section
      className="hero-surface overflow-hidden relative bg-cover bg-center"
      style={{ backgroundImage: `url(${elbadrawiImages.wideBedroomWindow})` }}
    >
      <div className="absolute inset-0 bg-stone-50/16" />
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-stone-50/25 to-white/0" />

      <div className="site-container relative py-20 md:py-32 lg:py-44">
        <div data-reveal className="reveal-fade max-w-5xl">
            <div className="inline-flex items-center gap-2 bg-white/34 text-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide mb-6 md:mb-8 backdrop-blur-[2px]">
              <span className="h-2 w-2 bg-amber-300 rounded-full"></span>
              {text.heroBadge}
            </div>
            
            <h1 className="display-title mt-6 md:mt-8">
              {text.heroTitle}
            </h1>
            
            <p className="hero-copy mt-6 max-w-2xl md:mt-8">
              {text.heroSubtitle}{isArabic ? '' : ` ${fullProductSentence}`}
            </p>

            <div className={`mt-12 ${buttonGroupClasses}`}>
              <Link to={localizePath('/request-a-quote', language)} className={buttonClasses.primary}>
                {commonText[language].requestQuote}
                <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
              </Link>
              <Link to={localizePath('/capabilities', language)} className={buttonClasses.secondary}>
                {commonText[language].exploreCapabilities}
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
}

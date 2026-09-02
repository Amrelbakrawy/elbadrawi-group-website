import { CTASection } from '../components/ui/CTASection';
import { ProductCarousel } from '../components/sections/ProductCarousel';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';
import { commonText, localizePath, useLanguage } from '../i18n';

const egyptCards = [
  ['Strategic Location', 'Egypt offers access to key regional and international markets.'],
  ['Textile Heritage', 'Egypt has a long-standing reputation in cotton, textiles, and manufacturing.'],
  ['Manufacturing Flexibility', 'Suitable for hospitality, retail, wholesale, and private label programs.'],
  ['Regional Access', 'A practical sourcing base for clients across MENA, Africa, and Europe.'],
];
const clients = ['Importers', 'Wholesalers', 'Retail chains', 'Hospitality suppliers', 'Distributors', 'Private label brands', 'E-commerce brands', 'Hotel groups'];

export function Export() {
  const language = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      <PageHero
        eyebrow={isArabic ? 'التصدير والجملة' : 'Export & wholesale'}
        title={isArabic ? 'توريد المنسوجات للتصدير والجملة' : 'Export & Wholesale Textile Supply'}
        description={isArabic ? 'تصنيع وتوريد موثوق للمنسوجات المنزلية من مصر للأسواق المحلية والدولية.' : 'Reliable home textile manufacturing and wholesale supply from Egypt to local and international markets.'}
        image={elbadrawiImages.wholesalePacks}
        imageAlt="Export and wholesale home textile supply"
      />

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            label={isArabic ? 'توريد دولي' : 'International supply'}
            title={isArabic ? 'خدمة المشترين المحليين والدوليين' : 'Serving Local and International Buyers'}
            description={isArabic ? 'من موقعها في مصر، تتمتع مجموعة البدراوي بقدرة عملية على خدمة العملاء في الشرق الأوسط وأفريقيا وأوروبا والأسواق المجاورة، مع دعم المشترين الدوليين وتجار الجملة والمستوردين وتجار التجزئة ومجموعات الضيافة.' : 'Based in Egypt, Elbadrawi Group is strategically positioned to serve clients across the Middle East, Africa, Europe, and surrounding markets. Our manufacturing base allows us to support international buyers, wholesalers, importers, retailers, and hospitality groups with a wide range of home textile products.'}
          />
          <div className="media-frame aspect-[16/10]">
            <img src={elbadrawiImages.brandedTowels} alt="Export-ready packaged textiles" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <SectionHeading
            label="Sourcing"
            title="Why Source from Egypt?"
            description="Egypt has a strong textile heritage, access to skilled manufacturing capabilities, and a strategic location connecting Africa, Europe, and the Middle East. For home textile buyers, this creates strong opportunities for reliable production, competitive sourcing, and practical logistics."
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {egyptCards.map(([title, copy]) => (
              <article key={title} className="feature-panel">
                <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-2">
          <div className="premium-card">
            <p className="eyebrow">Export categories</p>
            <h2 className="section-title mt-6">Export Product Range</h2>
            <ProductCarousel />
          </div>
          <div className="premium-card">
            <p className="eyebrow">Clients</p>
            <h2 className="section-title mt-6">Who We Work With</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {clients.map((client) => (
                <li key={client} className="text-base leading-8 text-muted-foreground">• {client}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title={isArabic ? 'هل تبحث عن شريك تصدير موثوق؟' : 'Looking for a reliable export partner?'}
        description={isArabic ? 'شاركنا متطلبات المنتج والكميات والسوق المستهدف واحتياجات التوريد.' : 'Share your product requirements, quantity direction, destination market, and supply needs.'}
        primaryLabel={commonText[language].requestQuote}
        primaryTo={localizePath('/request-a-quote', language)}
      />
    </>
  );
}

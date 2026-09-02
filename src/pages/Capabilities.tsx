import { CTASection } from '../components/ui/CTASection';
import { ProductCarousel } from '../components/sections/ProductCarousel';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';
import { arFullProductSentence, fullProductSentence } from '../config/products';
import { commonText, localizePath, useLanguage } from '../i18n';

const capabilities = [
  ['Custom Specifications', 'We support custom sizing, fabrics, colors, finishes, filling weights, GSM levels, thread counts, and construction details based on project requirements.'],
  ['Private Label Support', 'We help clients develop labels, packaging, care labels, inserts, carton requirements, and finished product presentation for their own brands.'],
  ['Hospitality Programs', 'We support hotel and accommodation clients with durable product specifications, repeated supply, consistent presentation, and practical operational requirements.'],
  ['Bulk Production Planning', 'We work with wholesalers, distributors, retailers, and export partners that need clear specifications, dependable production planning, and repeat supply.'],
  ['Material & Filling Direction', 'We help align fabrics, fillings, textures, weights, and product construction with the target market, comfort level, and commercial positioning.'],
];

export function CapabilitiesPage() {
  const language = useLanguage();
  const isArabic = language === 'ar';
  const page = isArabic
    ? {
        eyebrow: 'قدراتنا التصنيعية',
        title: 'قدرات التصنيع',
        description: 'حلول تصنيع مرنة للمنسوجات المنزلية للفنادق وتجار التجزئة والعلامات التجارية الخاصة وتجار الجملة والموزعين وعملاء التصدير.',
        overviewLabel: 'نظرة عامة',
        overviewTitle: 'شريك تصنيع واحد عبر نطاق المنتجات الكامل',
        overviewDescription: `${arFullProductSentence} يمكن تطوير كل منتج بمواصفات وتشطيبات وتغليف وخطة توريد تناسب احتياجات شركتك.`,
        productsLabel: 'المنتجات المدعومة',
        productsTitle: 'نطاق المنتجات المدعوم بقدراتنا التصنيعية',
        supportLabel: 'دعم التصنيع',
        supportTitle: 'كيف ندعم مشاريع الشركات',
        ctaTitle: 'هل تحتاج إلى حل تصنيع مخصص؟',
        ctaText: 'أخبرنا بما تحتاج إلى إنتاجه وسيساعدك فريقنا في تحديد المنتج والمواصفة وطريقة التوريد المناسبة.',
      }
    : {
        eyebrow: 'Capabilities',
        title: 'Manufacturing Capabilities',
        description: 'Flexible home textile manufacturing solutions for hotels, retailers, private label brands, wholesalers, distributors, and export clients.',
        overviewLabel: 'Overview',
        overviewTitle: 'One Manufacturing Partner Across the Full Product Range',
        overviewDescription: `${fullProductSentence} Each product can be developed with specifications, finishing, packaging, and supply planning aligned to your business needs.`,
        productsLabel: 'Products supported',
        productsTitle: 'Product Range Supported by Our Capabilities',
        supportLabel: 'Manufacturing support',
        supportTitle: 'How We Support B2B Projects',
        ctaTitle: 'Need a custom manufacturing solution?',
        ctaText: 'Tell us what you need to produce and our team will help define the right product, specification, and supply approach.',
      };

  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
        image={elbadrawiImages.designStudio}
        imageAlt="Home textile manufacturing planning workspace"
      />

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            label={page.overviewLabel}
            title={page.overviewTitle}
            description={page.overviewDescription}
          />
          <div className="media-frame aspect-[16/10]">
            <img src={elbadrawiImages.wholesalePacks} alt="Bulk home textile products prepared for B2B supply" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <SectionHeading label={page.productsLabel} title={page.productsTitle} align="center" />
          <ProductCarousel />
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading label={page.supportLabel} title={page.supportTitle} align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {capabilities.map(([title, copy]) => (
              <article key={title} className="feature-panel">
                <h2 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={page.ctaTitle}
        description={page.ctaText}
        primaryLabel={commonText[language].requestQuote}
        primaryTo={localizePath('/request-a-quote', language)}
      />
    </>
  );
}

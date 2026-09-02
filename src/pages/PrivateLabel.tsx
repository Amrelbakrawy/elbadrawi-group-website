import { CTASection } from '../components/ui/CTASection';
import { ProductCarousel } from '../components/sections/ProductCarousel';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';
import { arFullProductSentence, fullProductSentence } from '../config/products';
import { commonText, localizePath, useLanguage } from '../i18n';

const steps = [
  ['1', 'Share Your Product Requirements', 'Tell us what you want to produce, your target market, estimated quantities, and preferred price level.'],
  ['2', 'Choose Materials & Specifications', 'Select fabrics, thread counts, GSM, filling weights, sizes, colors, finishes, and construction details.'],
  ['3', 'Develop Branding & Packaging', 'Create private label packaging, care labels, product labels, inserts, and carton requirements.'],
  ['4', 'Sampling & Confirmation', 'Review samples and confirm specifications before production.'],
  ['5', 'Bulk Production', 'Manufacture your collection with clear specifications and agreed timelines.'],
  ['6', 'Delivery & Long-Term Supply', 'Support repeat production, seasonal collections, and ongoing supply needs.'],
];
const reasons = ['Wide Product Range', 'Flexible Specifications', 'Packaging Support', 'Manufacturing Experience', 'Hospitality & Retail Knowledge', 'Export-Oriented Production'];

export function PrivateLabel() {
  const language = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      <PageHero
        eyebrow={isArabic ? 'تصنيع بعلامتك التجارية' : 'Private label'}
        title={isArabic ? 'تصنيع المنسوجات المنزلية بعلامتك التجارية' : 'Private Label Home Textile Manufacturing'}
        description={isArabic ? 'منتجات منسوجات منزلية مخصصة لعلامتك التجارية، من مواصفات المنتجات الفردية إلى مجموعات كاملة بعلامة خاصة.' : 'Custom home textile products manufactured for your brand, from individual product specifications to complete private label collections.'}
        image={elbadrawiImages.brandedBundle}
        imageAlt="Private label home textile packaging"
      />

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            label={isArabic ? 'علامة خاصة' : 'Private label'}
            title={isArabic ? 'من الفكرة إلى المنتج النهائي' : 'From Idea to Finished Product'}
            description={isArabic ? `تدعم مجموعة البدراوي العلامات التجارية وتجار التجزئة والموزعين والمستوردين والشركات الإلكترونية في تصنيع المنسوجات المنزلية بعلامة خاصة. ${arFullProductSentence}` : `Elbadrawi Group supports brands, retailers, distributors, importers, and online businesses with private label home textile manufacturing. ${fullProductSentence}`}
          />
          <div className="premium-card">
            <p className="text-base leading-8 text-muted-foreground">
              {isArabic ? 'سواء كانت لديك مواصفات دقيقة بالفعل أو تحتاج إلى دعم في تطوير مجموعة منتجات، يستطيع فريقنا مساعدتك في اختيار الخامات وبناء المنتج والمقاسات والتغليف والليبلات وتخطيط الإنتاج.' : 'Whether you already have exact specifications or need support developing a collection, our team can help with material selection, product construction, sizing, packaging, labeling, and production planning.'}
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <SectionHeading label="Process" title="Private Label Manufacturing Process" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {steps.map(([step, title, copy]) => (
              <article key={step} className="premium-card">
                <p className="font-heading text-4xl tracking-[-0.05em] text-foreground">{step}</p>
                <h3 className="mt-6 font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading label="Products" title="Private Label Products" />
            <ProductCarousel />
          </div>
          <div>
            <SectionHeading label="Why us" title="Why Private Label with Elbadrawi Group" />
            <div className="mt-8 grid gap-4">
              {reasons.map((reason) => (
                <article key={reason} className="feature-panel">
                  <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{reason}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={isArabic ? 'ابدأ مشروع علامتك التجارية الخاصة.' : 'Start your private label project.'}
        description={isArabic ? 'أخبرنا عن علامتك التجارية وفكرة المنتج والسوق المستهدف والكميات المتوقعة.' : 'Tell us about your brand, product idea, target market, and expected quantities.'}
        primaryLabel={commonText[language].requestQuote}
        primaryTo={localizePath('/request-a-quote', language)}
      />
    </>
  );
}

import { CTASection } from '../components/ui/CTASection';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';
import { commonText, localizePath, useLanguage } from '../i18n';

const options = ['Fabric selection', 'Thread count options', 'GSM options', 'Filling weight options', 'Product sizing', 'Color selection', 'Pattern selection', 'Embroidery', 'Jacquard borders', 'Labels', 'Packaging', 'Carton packing', 'Care labels', 'Private label branding'];
const qualityCards = [
  ['Material Selection', 'We help choose the right fabric, filling, and construction for each product purpose.'],
  ['Commercial Durability', 'Products can be developed for hotel use, retail use, or wholesale requirements.'],
  ['Specification Control', 'Clear product details help maintain consistency across production.'],
  ['Packaging & Presentation', 'We support packaging solutions that match the client’s market and brand positioning.'],
];

export function QualityCustomization() {
  const language = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      <PageHero
        eyebrow={isArabic ? 'الجودة والتخصيص' : 'Quality & customization'}
        title={isArabic ? 'الجودة والتخصيص' : 'Quality & Customization'}
        description={isArabic ? 'تطوير منتجات ومواصفات وخيارات تشطيب مرنة لعملاء المنسوجات من الشركات.' : 'Flexible product development, specifications, and finishing options for B2B textile clients.'}
        image={elbadrawiImages.samplingTable}
        imageAlt="Textile quality and customization planning"
      />

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            label={isArabic ? 'تطوير المنتج' : 'Product development'}
            title={isArabic ? 'مواصفات مبنية حول سوقك' : 'Specifications Built Around Your Market'}
            description={isArabic ? 'لكل سوق احتياجات مختلفة. بعض العملاء يحتاجون إلى مجموعات فاخرة من القطن المصري، بينما يحتاج آخرون إلى منتجات فندقية متينة أو حلول جملة اقتصادية أو تغليف بعلامة خاصة. تساعد مجموعة البدراوي العملاء على اختيار المواصفات المناسبة للعميل المستهدف والميزانية ونموذج العمل.' : 'Every market has different needs. Some clients need premium Egyptian cotton collections, while others need durable hotel products, cost-effective wholesale solutions, or private label packaging. Elbadrawi Group helps clients choose the right specifications for their target customer, budget, and business model.'}
          />
          <div className="premium-card">
            <p className="eyebrow">Customization options</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {options.map((option) => (
                <li key={option} className="text-base leading-8 text-muted-foreground">• {option}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <SectionHeading
            label="Quality approach"
            title="Quality Approach"
            description="Our quality approach focuses on practical product performance. We consider comfort, durability, washing requirements, finishing, packaging, and consistency across repeat production."
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {qualityCards.map(([title, copy]) => (
              <article key={title} className="feature-panel">
                <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="media-frame aspect-[16/10]">
            <img src={elbadrawiImages.careLabels} alt="Care labels and private label finishing" loading="lazy" />
          </div>
          <SectionHeading
            label="Support"
            title="Product Development Support"
            description="Clients can approach us with exact technical specifications or with a general product idea. Our team can help translate the requirement into a practical product plan."
          />
        </div>
      </section>

      <CTASection
        title={isArabic ? 'ناقش مواصفات منتجك معنا.' : 'Discuss your product specifications.'}
        description={isArabic ? 'أخبرنا عن الخامات والمقاسات وGSM والتشطيب والتغليف وموقع المنتج في السوق.' : 'Tell us about the materials, sizes, GSM, finishing, packaging, and market position you need.'}
        primaryLabel={commonText[language].requestQuote}
        primaryTo={localizePath('/request-a-quote', language)}
      />
    </>
  );
}

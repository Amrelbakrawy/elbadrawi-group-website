import { CTASection } from '../components/ui/CTASection';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';
import { commonText, localizePath, useLanguage } from '../i18n';

const products = ['Pillow filling', 'Duvet filling', 'Comforter filling', 'Cushion filling', 'Fiber-filled bedding', 'Custom filling weights'];
const benefits = [
  ['Better Product Control', 'Control over filling type, weight, softness, and loft.'],
  ['Flexible Comfort Levels', 'Support different products from soft pillows to structured bedding.'],
  ['Cost & Quality Balance', 'Create products for premium, mid-range, and cost-effective market needs.'],
  ['Consistent Production', 'Support repeat orders with consistent filling specifications.'],
];
const applications = ['Pillows', 'Duvets', 'Comforters', 'Mattress toppers', 'Quilts', 'Cushions', 'Hospitality bedding', 'Retail bedding collections'];

export function FiberFilling() {
  const language = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      <PageHero
        eyebrow={isArabic ? 'الفيبر والحشو' : 'Fiber & filling'}
        title={isArabic ? 'حلول الفيبر والحشو' : 'Fiber & Filling Solutions'}
        description={isArabic ? 'حلول فيبر وحشو للمخدات والألحفة والكومفورترات والخدديات ومنتجات المنسوجات المنزلية.' : 'Hollow fiber and filling solutions for pillows, duvets, comforters, cushions, and home textile products.'}
        image={elbadrawiImages.textileSculpture}
        imageAlt="Fiber and filling solutions for home textiles"
      />

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            label={isArabic ? 'منتجات محشوة' : 'Filled products'}
            title={isArabic ? 'قدرات حشو داخلية' : 'In-House Filling Capabilities'}
            description={isArabic ? 'تتيح قدرات الفيبر والحشو لدى مجموعة البدراوي دعم عملية إنتاج أكثر تكاملًا للمنتجات المحشوة، مع تحكم أفضل في الراحة والانتفاخ والمرونة ووزن الحشو وثبات المنتج.' : "Elbadrawi Group's fiber and filling capabilities allow us to support a more complete production process for filled textile products. This gives us greater control over comfort, loft, elasticity, filling weight, and product consistency."}
          />
          <div className="premium-card">
            <p className="text-base leading-8 text-muted-foreground">
              Our filling solutions include hollow conjugated polyester staple fiber, siliconized
              hollow fiber, and non-siliconized hollow fiber options. These materials are used
              across pillows, duvets, comforters, cushions, and other filled home textile products.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {products.map((product) => (
                <li key={product} className="text-base leading-8 text-muted-foreground">• {product}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <SectionHeading label="Why it matters" title="Why It Matters" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map(([title, copy]) => (
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
            <img src={elbadrawiImages.floatingLinenSet} alt="Filled bedding applications" loading="lazy" />
          </div>
          <div className="premium-card">
            <p className="eyebrow">Applications</p>
            <h2 className="section-title mt-6">Applications</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {applications.map((item) => (
                <li key={item} className="text-base leading-8 text-muted-foreground">• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title={isArabic ? 'هل تحتاج إلى منتجات تعتمد على الفيبر أو الحشو؟' : 'Need fiber or filling-based products?'}
        description={isArabic ? 'شاركنا مستوى الراحة المطلوب ومواصفات المنتج ووزن الحشو ومتطلبات الطلب.' : 'Share your comfort target, product requirements, filling weight, and order requirements.'}
        primaryLabel={commonText[language].requestQuote}
        primaryTo={localizePath('/request-a-quote', language)}
      />
    </>
  );
}

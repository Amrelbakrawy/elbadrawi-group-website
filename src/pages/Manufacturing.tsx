import { CTASection } from '../components/ui/CTASection';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';

const steps = [
  ['1', 'Requirement Review', 'We review product type, quantity, target market, quality level, budget direction, branding needs, and delivery expectations.'],
  ['2', 'Material Selection', 'We help align fabric, filling, and finishing options with the product’s intended use and market position.'],
  ['3', 'Product Specification', 'We define size, construction, stitching, finishing, packaging, and technical requirements before production.'],
  ['4', 'Cutting & Preparation', 'Materials are prepared carefully to support consistency and accurate production.'],
  ['5', 'Stitching & Assembly', 'Products are assembled with attention to structure, finish, and function.'],
  ['6', 'Quality Control', 'Finished products are checked to help maintain consistency across the order.'],
  ['7', 'Packaging & Dispatch', 'Products are packed according to project requirements and prepared for delivery.'],
];

export function Manufacturing() {
  return (
    <>
      <PageHero
        eyebrow="Manufacturing process"
        title="From Fabric Selection to Finished Bedding Products"
        description="Our manufacturing process is structured to support quality, consistency, efficiency, and reliable production for business clients."
        image={elbadrawiImages.designStudio}
        imageAlt="Textile production planning workspace"
      />

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            label="Manufacturing overview"
            title="Manufacturing Built Around Quality & Consistency"
            description="Elbadrawi Group supports clients across the full production journey, from product requirements and material selection to production, finishing, quality control, packaging, and dispatch."
          />
          <div className="premium-card">
            <div className="card-media">
              <img src={elbadrawiImages.samplingTable} alt="Manufacturing process samples" loading="lazy" />
            </div>
            <p className="text-base leading-8 text-muted-foreground">
              Our process is designed for business clients that need dependable output, clear
              specifications, and long-term supply potential.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="media-frame aspect-[4/5]">
              <img
                src={elbadrawiImages.textileSculpture}
                alt="Hollow fiber materials used in bedding manufacturing"
                loading="lazy"
              />
            </div>
            <div className="media-frame aspect-[4/5] sm:mt-12">
              <img
                src={elbadrawiImages.floatingLinenSet}
                alt="Filled bedding product supported by hollow fiber production"
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <SectionHeading
              label="Fibertex Industries Egypt"
              title="Hollow-Fiber Production for Bedding Manufacturing"
              description="Elbadrawi Group supports bedding production through advanced hollow-fiber manufacturing. We produce A-grade hollow polyester fiber using modern machinery, with a monthly capacity of 2,500 tonnes."
            />
            <p className="section-copy mt-6">
              Our fiber production supports comforters, pillows, cushions, and other filled bedding
              products that require loft, elasticity, and consistent filling performance.
            </p>
            <article className="premium-card mt-8">
              <p className="eyebrow">Technical material</p>
              <h3 className="mt-5 font-heading text-2xl tracking-[-0.04em] text-foreground">
                Non-Allergic Hollow Conjugated Polyester Staple Fiber
              </h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">
                Available in siliconised and non-siliconised options, hollow conjugated fiber
                provides spring-like crimp, superior loft, and high elasticity for bedding
                applications.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {steps.map(([step, title, copy]) => (
              <article key={step} className="premium-card">
                <p className="font-heading text-4xl tracking-[-0.05em] text-foreground">{step}</p>
                <h2 className="mt-6 font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="media-frame aspect-[16/11]">
            <img src={elbadrawiImages.brandedTowels} alt="Finished textile products prepared for quality review" loading="lazy" />
          </div>
          <SectionHeading
            label="Quality focus"
            title="Quality Control at Every Stage"
            description="For B2B clients, consistency matters. Our quality approach helps ensure that products match the agreed specifications, finishing expectations, and production standards required for hospitality, retail, wholesale, export, and private label projects."
          />
        </div>
      </section>

      <CTASection
        title="Start a Manufacturing Project"
        description="Tell us what you need to produce and our team will review your requirements."
        primaryLabel="Request a Quote"
        primaryTo="/request-quote"
      />
    </>
  );
}

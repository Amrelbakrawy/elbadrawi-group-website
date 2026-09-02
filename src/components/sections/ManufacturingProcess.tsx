import { elbadrawiImages } from '../../config/elbadrawiImages';
import { SectionHeading } from '../ui/SectionHeading';

const steps = [
  {
    step: '01',
    title: 'Requirement Review',
    description: 'We begin by understanding your product type, quantity, quality level, target market, and commercial requirements.',
    image: elbadrawiImages.cottonLinen,
  },
  {
    step: '02',
    title: 'Fabric & Material Selection',
    description: 'We align material choice with comfort, durability, price level, and intended product use.',
    image: elbadrawiImages.samplingTable,
  },
  {
    step: '03',
    title: 'Cutting & Preparation',
    description: 'Materials are prepared according to the required dimensions, construction, and specifications.',
    image: elbadrawiImages.careLabels,
  },
  {
    step: '04',
    title: 'Stitching & Production',
    description: 'Products are assembled with attention to finish, functionality, and consistency.',
    image: elbadrawiImages.brandedTowels,
  },
  {
    step: '05',
    title: 'Quality Control',
    description: 'Products are checked to help maintain standards across production runs and final output.',
    image: elbadrawiImages.wholesalePacks,
  },
  {
    step: '06',
    title: 'Packaging & Dispatch',
    description: 'Final products are packed according to project requirements before delivery or collection.',
    image: elbadrawiImages.brandedBundle,
  },
];

export function ManufacturingProcess() {
  return (
    <section className="section-space bg-muted/40">
      <div className="site-container">
        <SectionHeading
          label="Manufacturing process"
          title="From Fabric to Finished Product"
          description="Our manufacturing process is structured to support consistency, efficiency, and product quality across every stage."
          align="center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((item) => (
            <article key={item.step} data-reveal className="premium-card">
              <div className="card-media">
                <img src={item.image} alt={`${item.title} step`} loading="lazy" />
              </div>
              <p className="font-heading text-4xl tracking-[-0.04em] text-foreground">{item.step}</p>
              <h3 className="mt-6 font-heading text-2xl tracking-[-0.04em] text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

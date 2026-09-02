import { elbadrawiImages } from '../../config/elbadrawiImages';
import { SectionHeading } from '../ui/SectionHeading';

const items = [
  {
    title: 'Vision',
    copy: 'To be an unforgettable partner in home comfort, anticipating and exceeding customer expectations by providing the perfect textile solution for every need.',
    image: elbadrawiImages.wideBedroomMinimal,
  },
  {
    title: 'Mission',
    copy: 'To transform the home textile experience by providing a comprehensive collection of high-quality products, from fillings and pillows to bedding and raw materials. We continuously invest in expert personnel and innovative technology to deliver exceptional quality, personalized products, and rapid turnaround times.',
    image: elbadrawiImages.designStudio,
  },
];

export function VisionMissionPreview() {
  return (
    <section className="section-space bg-panel">
      <div className="site-container">
        <SectionHeading label="Company direction" title="Our Vision & Mission" align="center" />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {items.map((item) => (
            <article key={item.title} className="premium-card">
              <div className="card-media">
                <img src={item.image} alt={`${item.title} visual for Elbadrawi Group`} loading="lazy" />
              </div>
              <p className="eyebrow">{item.title}</p>
              <p className="mt-5 text-base leading-8 text-muted-foreground">{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

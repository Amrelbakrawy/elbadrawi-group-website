import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { elbadrawiImages } from '../../config/elbadrawiImages';
import { buttonClasses } from '../../utils/buttonClasses';
import { SectionHeading } from '../ui/SectionHeading';

const cards = [
  ['Global Presence', 'We build partnerships through industry connections and international market exposure.'],
  ['Proven Track Record', 'Years of textile manufacturing experience support reliable export relationships.'],
  ['Seamless Processes', 'Streamlined logistics and communication help ensure consistent and efficient supply.'],
];

export function ExportPartnerPreview() {
  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <SectionHeading
            label="Export partnerships"
            title="Reliable Export Partner"
            description="Elbadrawi Group supports global partnerships through experience, strong communication, and reliable export processes. Our participation in international industry events reflects our commitment to building long-term relationships and serving clients beyond the local market."
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {[elbadrawiImages.brandCollection, elbadrawiImages.wholesalePacks, elbadrawiImages.brandedBundle].map((image, index) => (
              <div className="media-frame aspect-[4/5]" key={image}>
                <img src={image} alt={`Export partnership visual ${index + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map(([title, copy]) => (
            <article key={title} className="feature-panel">
              <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
        <Link to="/export" className={`mt-10 ${buttonClasses.primary}`}>
          Discuss Export Requirements
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

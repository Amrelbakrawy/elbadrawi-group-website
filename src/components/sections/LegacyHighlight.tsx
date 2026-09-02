import { Link } from 'react-router';
import { elbadrawiImages } from '../../config/elbadrawiImages';
import { SectionHeading } from '../ui/SectionHeading';

export function LegacyHighlight() {
  return (
    <section className="section-space bg-white">
      <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div data-reveal className="reveal-fade media-frame aspect-[16/11]">
          <img
            src={elbadrawiImages.cottonLinen}
            alt="Premium white textiles reflecting Elbadrawi Group textile heritage"
            loading="lazy"
          />
        </div>

        <div>
          <SectionHeading
            label="Our legacy"
            title="A Legacy Built in Textiles"
            description="With more than 50 years of experience in the textile industry, Elbadrawi Group has built a strong foundation in bedding and home textile manufacturing. Our background reflects long-term industry knowledge, product understanding, and a commitment to serving evolving market needs across both local and international business environments."
          />
          <Link to="/about" className="button-secondary mt-10 inline-flex">
            Learn More About Elbadrawi Group
          </Link>
        </div>
      </div>
    </section>
  );
}

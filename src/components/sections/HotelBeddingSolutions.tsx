import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { elbadrawiImages } from '../../config/elbadrawiImages';
import { buttonClasses } from '../../utils/buttonClasses';
import { SectionHeading } from '../ui/SectionHeading';

export function HotelBeddingSolutions() {
  return (
    <section className="section-space bg-panel">
      <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            label="Hospitality"
            title="Hotel Bedding Solutions"
            description="Elbadrawi Group is a one-stop factory for hotel textile needs, offering a diverse range of high-quality bedding and bath products tailored to different budgets, styles, and hospitality requirements."
          />
          <p className="section-copy mt-6 max-w-2xl">
            From crisp sheets and plush duvets to comfortable pillows and cozy towels, we help
            hotels create a restful and reliable guest experience.
          </p>
          <Link to="/request-quote" className={`mt-8 ${buttonClasses.primary}`}>
            Request Hospitality Quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="media-frame aspect-[16/11]">
          <img
            src={elbadrawiImages.hotelBedSuite}
            alt="Premium hotel bed prepared with white bedding"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

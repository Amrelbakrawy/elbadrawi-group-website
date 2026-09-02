import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { elbadrawiImages } from '../../config/elbadrawiImages';
import { buttonClasses } from '../../utils/buttonClasses';
import { SectionHeading } from '../ui/SectionHeading';

export function FibertexHighlight() {
  return (
    <section className="section-space bg-white">
      <div className="site-container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="media-frame aspect-[16/11]">
          <img
            src={elbadrawiImages.textileSculpture}
            alt="Hollow fiber and filled bedding materials for manufacturing"
            loading="lazy"
          />
        </div>
        <div>
          <SectionHeading
            label="Manufacturing capability"
            title="Advanced Hollow-Fiber Production"
            description="Through Fibertex Industries Egypt, Elbadrawi Group produces A-grade hollow polyester fiber using modern machinery, supporting bedding products such as comforters, pillows, and cushions."
          />
          <div className="mt-8 rounded-[1.5rem] border border-border bg-panel p-6">
            <p className="font-heading text-4xl tracking-[-0.05em] text-foreground">2,500 Tonnes</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Monthly Capacity
            </p>
            <p className="section-copy mt-5">
              Our hollow-fiber production supports consistent filling quality, improved product
              comfort, and reliable supply for large-scale bedding manufacturing.
            </p>
          </div>
          <Link to="/manufacturing" className={`mt-8 ${buttonClasses.primary}`}>
            Explore Manufacturing
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

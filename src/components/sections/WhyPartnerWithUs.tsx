import { Clock3, Globe2, Layers3, Scale, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const reasons = [
  { title: 'Consistent Quality at Scale', icon: ShieldCheck, copy: 'Our production approach is built to maintain product consistency across volume orders and repeated manufacturing cycles.' },
  { title: 'Flexible Production Approach', icon: Layers3, copy: 'We work with different business models and product requirements, supporting a range of commercial needs from hospitality programs to private label development.' },
  { title: 'Competitive Manufacturing Value', icon: Scale, copy: 'We focus on balancing quality, functionality, and commercial viability to help businesses build sustainable product offerings.' },
  { title: 'Reliable Lead Times', icon: Clock3, copy: 'For B2B buyers, timing matters. Our goal is to support clients with organized production planning and dependable delivery expectations.' },
  { title: 'Regional & International Market Experience', icon: Globe2, copy: 'With decades in textiles and exposure to multiple markets, we understand how to support different product expectations, standards, and positioning needs.' },
];

export function WhyPartnerWithUs() {
  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <SectionHeading
          label="Why partner with us"
          title="Why Partner With Us"
          description="Businesses choose Elbadrawi Group for more than product supply. They choose a manufacturing partner that understands the importance of quality, consistency, flexibility, and long-term commercial reliability."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {reasons.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} data-reveal className="premium-card reveal-fade">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-5 text-base leading-8 text-muted-foreground">{item.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

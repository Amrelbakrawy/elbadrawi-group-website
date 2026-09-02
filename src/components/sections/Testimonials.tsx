import { Star } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  logo?: string;
  rating?: number;
}

const testimonials: Testimonial[] = [
  {
    quote: "Elbadrawi delivered consistent quality across 50,000 units annually. Their understanding of our hospitality requirements and proactive communication set them apart.",
    author: "Michael Chen",
    role: "Procurement Director",
    company: "Global Hospitality Group",
    rating: 5,
  },
  {
    quote: "Moving to a single manufacturing partner reduced complexity. Their integrated approach from specification to packaging saved us months in time-to-market.",
    author: "Sarah Williams",
    role: "VP Product Development",
    company: "Premium Retail Brands",
    rating: 5,
  },
  {
    quote: "Quality consistency is non-negotiable for us. Elbadrawi's ISO 9001 certification and detailed QC processes give us complete confidence in every delivery.",
    author: "James Patterson",
    role: "Operations Manager",
    company: "Hotel Collection LLC",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <SectionHeading
          label="Client success stories"
          title="Trusted by leading commercial brands worldwide"
          description="From global hospitality groups to emerging private label brands, our partners rely on consistent quality and reliable delivery."
          align="center"
        />

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-reveal
              className="reveal-fade group flex flex-col rounded-xl border border-slate-200 p-6 md:p-8 bg-gradient-to-br from-white to-slate-50 hover:shadow-lg transition-all duration-300 hover:border-slate-300"
            >
              {/* Rating stars */}
              {testimonial.rating && (
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )}

              {/* Quote */}
              <blockquote className="text-sm md:text-base leading-relaxed text-muted-foreground flex-1">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {testimonial.role}
                </p>
                <p className="text-xs md:text-sm font-medium text-blue-600 mt-2">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust metrics */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600">500+</div>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Active partnerships globally
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600">98%</div>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                On-time delivery rate
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600">25+</div>
              <p className="mt-2 text-sm md:text-base text-muted-foreground">
                Countries served
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { CTASection } from '../components/ui/CTASection';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { getIndustryBySlug } from '../config/industries';
import { NotFound } from './NotFound';

export function IndustryDetail() {
  const { slug } = useParams();
  const industry = getIndustryBySlug(slug);

  if (!industry) {
    return <NotFound />;
  }

  const Icon = industry.icon;

  return (
    <>
      <PageHero
        eyebrow="Industry focus"
        title={industry.heroTitle}
        description={industry.heroDescription}
        accent={industry.intro}
        image={industry.image}
        imageAlt={`${industry.title} textile program by Elbadrawi Group`}
      />

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            label={industry.title}
            title={`How we support ${industry.shortTitle.toLowerCase()}.`}
            description={industry.description}
          />

          <article className="premium-card reveal-fade">
            <div className="card-media">
              <img src={industry.image} alt={`${industry.title} textile focus`} loading="lazy" />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border">
                <Icon className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <p className="eyebrow">Key priorities</p>
                <h2 className="mt-3 font-heading text-3xl tracking-[-0.04em] text-foreground">
                  What matters most in this sector
                </h2>
              </div>
            </div>

            <ul className="mt-8 grid gap-4">
              {industry.needs.map((need) => (
                <li key={need} className="border-t border-border pt-4 text-base leading-8 text-muted-foreground">
                  {need}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <SectionHeading
            label="Next step"
            title="Send me the content for this page and I will build it out."
            description="You can give me the text, key services, target buyer needs, project examples, process details, and any proof points you want featured for this industry."
            align="center"
          />

          <div className="reveal-fade mx-auto mt-14 max-w-4xl rounded-[32px] border border-border bg-white p-8 md:p-10">
            <p className="text-base leading-8 text-muted-foreground">
              This page is now connected and ready. Once you send the information for
              <span className="font-semibold text-foreground"> {industry.title}</span>, I can turn
              it into a full dedicated page with the same premium style as the rest of the site.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/request-quote" className="button-primary">
                Request Quote
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/industries" className="button-secondary">
                Back to Industries
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={`Need a textile solution tailored to ${industry.shortTitle.toLowerCase()}?`}
        description="We can shape the right product, manufacturing, and delivery approach once we understand the full brief."
        primaryLabel="Start the Conversation"
        primaryTo="/request-quote"
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
      />
    </>
  );
}

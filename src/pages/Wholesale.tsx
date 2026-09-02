import { CTASection } from '../components/ui/CTASection';
import { ProductCarousel } from '../components/sections/ProductCarousel';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';
import { fullProductSentence } from '../config/products';

const buyers = [
  ['Distributors', 'Reliable supply for businesses distributing bedding and home textile products across different markets.'],
  ['Wholesale Buyers', 'Bulk manufacturing solutions for buyers seeking quality products at commercial volumes.'],
  ['Retail Chains', 'Product supply for retailers looking to source individual home textile products with consistent specifications.'],
  ['Export Clients', 'Manufacturing support for clients serving local, regional, or international markets.'],
  ['Project-Based Buyers', 'Flexible supply for specific commercial projects, tenders, or large-volume requirements.'],
];

const advantages = [
  ['Scalable Production', 'We support volume-based orders and repeated manufacturing requirements.'],
  ['Consistent Specifications', 'Our process is structured to maintain product consistency across bulk orders.'],
  ['Flexible Product Options', 'Products can be adapted according to your market, price point, and customer expectations.'],
  ['Commercial Manufacturing Value', 'We focus on balancing quality, functionality, and pricing practicality for B2B clients.'],
  ['Long-Term Supply Potential', 'We aim to build reliable partnerships with businesses that require ongoing sourcing support.'],
];

export function Wholesale() {
  return (
    <>
      <PageHero
        eyebrow="Wholesale"
        title="Wholesale Bedding Supply for Distributors, Retailers & Bulk Buyers"
        description="Elbadrawi Group provides scalable bedding and home textile manufacturing solutions for businesses that require reliable bulk supply and consistent product standards."
        image={elbadrawiImages.wholesalePacks}
        imageAlt="Wholesale bedding packs ready for bulk supply"
      />

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            label="Wholesale supply"
            title="Reliable Manufacturing for Commercial Buyers"
            description="Wholesale buyers and distributors need products that are consistent, commercially viable, and available through dependable production planning."
          />
          <div className="premium-card">
            <p className="text-base leading-8 text-muted-foreground">
              Elbadrawi Group supports bulk bedding supply for businesses seeking long-term sourcing,
              repeated orders, and flexible product specifications. {fullProductSentence}
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <SectionHeading label="B2B buyers" title="Designed for B2B Buyers" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {buyers.map(([title, copy]) => (
              <article key={title} className="feature-panel">
                <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading label="Product range" title="Wholesale Product Range" />
          <ProductCarousel />
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <SectionHeading label="Advantages" title="Why Source Wholesale Bedding from Elbadrawi Group" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {advantages.map(([title, copy]) => (
              <article key={title} className="premium-card">
                <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Looking for a Bulk Bedding Supplier?"
        description="Share your product requirements, target quantities, and specifications. Our team will review your request and prepare a suitable quotation."
        primaryLabel="Request Bulk Pricing"
        primaryTo="/request-quote"
        secondaryLabel="Contact Our Team"
        secondaryTo="/contact"
      />
    </>
  );
}

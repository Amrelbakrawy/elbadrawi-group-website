import { Link } from 'react-router';
import { CTASection } from '../components/ui/CTASection';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';

const industries = [
  {
    title: 'Hotels & Hospitality',
    copy: 'Bedding solutions designed for guest comfort, clean presentation, and repeated operational use.',
    to: '/hospitality',
    image: elbadrawiImages.hotelBedSuite,
  },
  {
    title: 'Retail & E-commerce Brands',
    copy: 'Manufacturing support for businesses selling bedding products through stores, online platforms, or branded collections.',
    to: '/industries/retail-chains',
    image: elbadrawiImages.brandCollection,
  },
  {
    title: 'Private Label Brands',
    copy: 'Custom bedding production for businesses building their own product identity and market position.',
    to: '/private-label',
    image: elbadrawiImages.brandedBundle,
  },
  {
    title: 'Wholesale & Distribution',
    copy: 'Bulk supply solutions for distributors and commercial buyers needing consistent specifications and repeated production.',
    to: '/wholesale',
    image: elbadrawiImages.wholesalePacks,
  },
  {
    title: 'Airbnb & Short-Term Rentals',
    copy: 'Practical and visually appealing bedding solutions for hosts and operators seeking better guest experience.',
    to: '/industries/residential-projects',
    image: elbadrawiImages.residentialBedroom,
  },
  {
    title: 'Export Partners',
    copy: 'Reliable manufacturing support for international clients seeking dependable home textile supply from Egypt.',
    to: '/export',
    image: elbadrawiImages.brandedTowels,
  },
];

export function Industries() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Textile Manufacturing Solutions for Different Business Sectors"
        description="We support hospitality, retail, wholesale, distribution, private label, export, and short-term rental clients with reliable bedding and home textile manufacturing."
        image={elbadrawiImages.wideBedroomSoft}
        imageAlt="Finished bedding prepared for business sectors"
      />

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading label="Industries" title="Find Your Solution" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {industries.map((industry) => (
              <Link key={industry.title} to={industry.to} className="premium-card group block">
                <div className="card-media">
                  <img src={industry.image} alt={`${industry.title} textile solution`} loading="lazy" />
                </div>
                <h2 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{industry.title}</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{industry.copy}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Need a Solution for Your Market?"
        description="Tell us about your business type, target customer, required products, and expected quantities. Our team will help you identify the right manufacturing approach."
        primaryLabel="Request a Quote"
        primaryTo="/request-quote"
        secondaryLabel="Contact Us"
        secondaryTo="/contact"
      />
    </>
  );
}

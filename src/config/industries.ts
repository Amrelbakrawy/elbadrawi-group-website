import type { LucideIcon } from 'lucide-react';
import { Building2, Hotel, Package2, ShieldPlus, Store, Warehouse } from 'lucide-react';
import { elbadrawiImages } from './elbadrawiImages';

export type IndustryItem = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  description: string;
  needs: string[];
  heroTitle: string;
  heroDescription: string;
  intro: string;
  image: string;
};

export const industries: IndustryItem[] = [
  {
    slug: 'hotels-resorts',
    title: 'Hotels & Resorts',
    shortTitle: 'Hotels & resorts',
    icon: Hotel,
    description:
      'Programs designed around guest comfort, laundering cycles, replenishment planning, and consistent room standards.',
    needs: ['Bulk consistency', 'Commercial durability', 'Property-level specifications'],
    heroTitle: 'Textile programs designed for hotels and resorts.',
    heroDescription:
      'We support hospitality buyers who need bedding and bath textile programs aligned with guest experience, operational durability, and dependable replenishment.',
    intro:
      'This dedicated page is now ready for your hotel and resort content. Send me the full details you want included here and I will build it out section by section.',
    image: elbadrawiImages.hotelBedSuite,
  },
  {
    slug: 'retail-chains',
    title: 'Retail Chains',
    shortTitle: 'Retail chains',
    icon: Store,
    description:
      'Repeatable assortments and reliable supply for multi-location retail and omni-channel collections.',
    needs: ['Range planning', 'Consistent quality', 'Merchandising-ready packing'],
    heroTitle: 'Retail textile supply built for consistency at scale.',
    heroDescription:
      'We help retail chains develop repeatable bedding and bath assortments with the structure needed for ongoing supply and presentation across locations.',
    intro:
      'This dedicated page is now ready for your retail chain content. Send me the text, positioning, and any proof points you want added here.',
    image: elbadrawiImages.brandCollection,
  },
  {
    slug: 'private-label-brands',
    title: 'Private Label Brands',
    shortTitle: 'Private label brands',
    icon: Package2,
    description:
      'Manufacturing support for brands that need product development, packaging, and dependable scaling.',
    needs: ['Sampling', 'Brand presentation', 'Launch-to-scale support'],
    heroTitle: 'Private label development with manufacturing depth behind it.',
    heroDescription:
      'We support branded collections that need product development, presentation control, and scalable production discipline from concept to launch.',
    intro:
      'This dedicated page is now ready for your private label brand content. Send me the narrative and I will turn it into a full industry-specific page.',
    image: elbadrawiImages.brandedBundle,
  },
  {
    slug: 'distributors',
    title: 'Distributors',
    shortTitle: 'Distributors',
    icon: Warehouse,
    description:
      'Bulk manufacturing suited to wholesale partners serving institutional and commercial buyers across markets.',
    needs: ['Volume support', 'Flexible categories', 'Export readiness'],
    heroTitle: 'Bulk textile manufacturing for distributor networks.',
    heroDescription:
      'We help distributors source dependable textile programs with the consistency, flexibility, and export readiness required across multiple commercial channels.',
    intro:
      'This dedicated page is now ready for your distributor content. Send me the information you want featured and I will structure it into a polished page.',
    image: elbadrawiImages.wholesalePacks,
  },
  {
    slug: 'healthcare-care',
    title: 'Healthcare & Care',
    shortTitle: 'Healthcare & care facilities',
    icon: ShieldPlus,
    description:
      'Practical linen solutions balancing performance, washability, and comfort for professional care environments.',
    needs: ['Operational durability', 'Material suitability', 'Reliable repeat supply'],
    heroTitle: 'Linen solutions for healthcare and care environments.',
    heroDescription:
      'We support institutions that need practical textile programs where hygiene, durability, comfort, and repeat supply all matter at once.',
    intro:
      'This dedicated page is now ready for your healthcare and care content. Send me the key points and I will add them into this page.',
    image: elbadrawiImages.whiteBathTowels,
  },
  {
    slug: 'residential-projects',
    title: 'Residential Projects',
    shortTitle: 'Residential projects',
    icon: Building2,
    description:
      'Custom textile packages for furnished residences, serviced apartments, and project-based procurement.',
    needs: ['Project coordination', 'Custom bundles', 'Delivery alignment'],
    heroTitle: 'Custom textile packages for residential projects.',
    heroDescription:
      'We support furnished residences, compounds, and serviced developments with bedding and bath programs shaped around project delivery and presentation needs.',
    intro:
      'This dedicated page is now ready for your residential project content. Send me the information and I will build the full page around it.',
    image: elbadrawiImages.residentialBedroom,
  },
];

export function getIndustryBySlug(slug?: string) {
  return industries.find((industry) => industry.slug === slug);
}

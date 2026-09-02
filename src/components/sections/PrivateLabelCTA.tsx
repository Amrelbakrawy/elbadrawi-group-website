import { CTASection } from '../ui/CTASection';
import { elbadrawiImages } from '../../config/elbadrawiImages';

export function PrivateLabelCTA() {
  return (
    <CTASection
      title="Private Label Bedding Solutions"
      description="We support businesses globally as a trusted supplier of private label bedding solutions, offering a comprehensive range of products, customization options, and packaging solutions that help elevate your brand."
      primaryLabel="Start Your Private Label Project"
      primaryTo="/request-quote"
      secondaryLabel="Explore Private Label Solutions"
      secondaryTo="/private-label"
      backgroundImage={elbadrawiImages.brandedBundle}
    />
  );
}

import { CTASection } from '../ui/CTASection';
import { elbadrawiImages } from '../../config/elbadrawiImages';
import { commonText, homeText, localizePath, useLanguage } from '../../i18n';

export function FinalCTA() {
  const language = useLanguage();
  const text = homeText[language];

  return (
    <CTASection
      title={text.ctaTitle}
      description={text.ctaText}
      primaryLabel={commonText[language].requestQuote}
      primaryTo={localizePath('/request-a-quote', language)}
      secondaryLabel={commonText[language].contactUs}
      secondaryTo={localizePath('/contact', language)}
      tone="dark"
      backgroundImage={elbadrawiImages.wholesalePacks}
    />
  );
}

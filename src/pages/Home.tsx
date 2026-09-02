import { Capabilities } from '../components/sections/Capabilities';
import { ExportPartnerPreview } from '../components/sections/ExportPartnerPreview';
import { FibertexHighlight } from '../components/sections/FibertexHighlight';
import { FinalCTA } from '../components/sections/FinalCTA';
import { Hero } from '../components/sections/Hero';
import { HotelBeddingSolutions } from '../components/sections/HotelBeddingSolutions';
import { ManufacturingProcess } from '../components/sections/ManufacturingProcess';
import { PrivateLabelCTA } from '../components/sections/PrivateLabelCTA';
import { TrustStrip } from '../components/sections/TrustStrip';
import { VisionMissionPreview } from '../components/sections/VisionMissionPreview';
import { WhatWeManufacture } from '../components/sections/WhatWeManufacture';
import { WhoWeServe } from '../components/sections/WhoWeServe';
import { WhyElbadrawi } from '../components/sections/WhyElbadrawi';
import { useLanguage } from '../i18n';

export function Home() {
  const language = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      <Hero />
      <TrustStrip />
      <WhoWeServe />
      <Capabilities />
      <WhatWeManufacture />
      <WhyElbadrawi />
      {!isArabic ? (
        <>
          <FibertexHighlight />
          <HotelBeddingSolutions />
          <PrivateLabelCTA />
          <ExportPartnerPreview />
          <ManufacturingProcess />
          <VisionMissionPreview />
        </>
      ) : null}
      <FinalCTA />
    </>
  );
}

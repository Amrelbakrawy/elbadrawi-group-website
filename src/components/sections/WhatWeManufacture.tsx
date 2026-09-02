import { Link } from 'react-router';
import { commonText, homeText, localizePath, useLanguage } from '../../i18n';
import { SectionHeading } from '../ui/SectionHeading';
import { ProductCarousel } from './ProductCarousel';

export function WhatWeManufacture() {
  const language = useLanguage();
  const text = homeText[language];

  return (
    <section className="section-space bg-muted/35">
      <div className="site-container">
        <SectionHeading
          label={text.productsLabel}
          title={text.productsTitle}
          description={text.productsIntro}
          align="center"
        />

        <ProductCarousel />
        <div className="mt-10 text-center">
          <Link to={localizePath('/products', language)} className="button-primary">{commonText[language].viewFullProductRange}</Link>
        </div>
      </div>
    </section>
  );
}

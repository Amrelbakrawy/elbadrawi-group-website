import { Building2, Globe2, Hotel, Package2, Store, Warehouse } from 'lucide-react';
import { elbadrawiImages } from '../../config/elbadrawiImages';
import { fullProductSentence } from '../../config/products';
import { homeText, useLanguage } from '../../i18n';
import { SectionHeading } from '../ui/SectionHeading';

const clients = [
  ['Hotels & Resorts', 'Durable bedding and bath textile solutions designed for guest comfort and repeated commercial use.', Hotel, elbadrawiImages.hotelBedSuite],
  ['Retail & E-commerce Brands', 'Individual home textile products and complete private label collections manufactured for retail, online, and wholesale distribution.', Store, elbadrawiImages.brandCollection],
  ['Private Label Clients', 'Custom products, specifications, labels, packaging, and collection development for your own brand.', Package2, elbadrawiImages.brandedBundle],
  ['Airbnb & Serviced Apartments', 'Practical, durable, and cost-effective textile solutions for high-turnover accommodation businesses.', Building2, elbadrawiImages.residentialBedroom],
  ['Distributors & Wholesalers', `Bulk supply for distributors and wholesalers. ${fullProductSentence}`, Warehouse, elbadrawiImages.wholesalePacks],
  ['Export Partners', 'Manufacturing support for international clients seeking reliable home textile production from Egypt.', Globe2, elbadrawiImages.brandedTowels],
] as const;

const arClients = [
  ['الفنادق والمنتجعات', 'حلول مفروشات ومناشف متينة مصممة لراحة النزلاء والاستخدام التجاري المتكرر.', Hotel, elbadrawiImages.hotelBedSuite],
  ['علامات التجزئة والتجارة الإلكترونية', 'تصنيع مجموعات كاملة من المفروشات والمنسوجات المنزلية للبيع بالتجزئة والتوزيع.', Store, elbadrawiImages.brandCollection],
  ['عملاء العلامات التجارية الخاصة', 'منتجات ومواصفات وتغليف وليبلات مخصصة لتطوير مجموعات تحمل علامتكم التجارية.', Package2, elbadrawiImages.brandedBundle],
  ['الشقق الفندقية والإيجارات قصيرة الأجل', 'حلول عملية ومتينة ومناسبة للأماكن التي تحتاج إلى استخدام وغسيل متكرر.', Building2, elbadrawiImages.residentialBedroom],
  ['الموزعون وتجار الجملة', 'توريد كميات كبيرة من المفروشات، المراتب، المناشف، المخدات، الألحفة، والحماية.', Warehouse, elbadrawiImages.wholesalePacks],
  ['شركاء التصدير', 'دعم تصنيعي للعملاء الدوليين الباحثين عن إنتاج موثوق للمنسوجات المنزلية من مصر.', Globe2, elbadrawiImages.brandedTowels],
] as const;

export function WhoWeServe() {
  const language = useLanguage();
  const text = homeText[language];
  const clientItems = language === 'ar' ? arClients : clients;

  return (
    <section className="bg-panel section-space">
      <div className="site-container">
        <SectionHeading
          label={text.whoLabel}
          title={text.whoTitle}
          description={text.whoIntro}
          align="center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {clientItems.map(([title, description, Icon, image]) => (
            <article key={title} data-reveal className="premium-card reveal-fade">
              <div className="card-media">
                <img src={image} alt={`${title} textile manufacturing support`} loading="lazy" />
              </div>
              <Icon className="h-8 w-8 text-foreground" />
              <h3 className="mt-6 font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

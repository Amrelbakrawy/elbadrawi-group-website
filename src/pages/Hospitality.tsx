import { CTASection } from '../components/ui/CTASection';
import { ProductCarousel } from '../components/sections/ProductCarousel';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';
import { arFullProductSentence, fullProductSentence } from '../config/products';
import { commonText, localizePath, useLanguage } from '../i18n';

const benefits = [
  ['Durable for Repeated Washing', 'Specifications selected for commercial laundry cycles and repeated room turnover.'],
  ['Comfortable Guest Experience', 'Bedding and bath textiles built around softness, presentation, and reliable daily use.'],
  ['Flexible Specifications', 'Sizes, fabrics, weights, colors, finishes, and packaging can be adapted to each property.'],
  ['Bulk Supply Capability', 'Production planning for volume orders, phased deliveries, and replenishment programs.'],
  ['Hotel-Ready Product Range', 'Room and bathroom textiles supplied across core hospitality categories.'],
  ['Cost-Effective Options Available', 'Balanced product specifications for different property levels and budgets.'],
];

const arBenefits = [
  ['تحمل الغسيل المتكرر', 'مواصفات مناسبة لدورات الغسيل التجارية والاستخدام اليومي المتكرر.'],
  ['راحة النزلاء', 'مفروشات ومنسوجات حمام تركز على النعومة والمظهر والاستخدام العملي.'],
  ['مواصفات مرنة', 'إمكانية تعديل المقاسات والخامات والأوزان والألوان والتشطيبات والتغليف.'],
  ['قدرة توريد بالكميات', 'تخطيط إنتاج للطلبات الكبيرة والتوريد المرحلي وبرامج إعادة التوريد.'],
  ['نطاق منتجات فندقي', 'توريد منسوجات الغرف والحمامات عبر فئات الضيافة الأساسية.'],
  ['خيارات اقتصادية', 'مواصفات متوازنة تناسب مستويات منشآت وميزانيات مختلفة.'],
];

const clients = ['Hotels', 'Resorts', 'Serviced Apartments', 'Airbnb Operators', 'Hospitality Groups', 'Staff Accommodation', 'Rental Properties', 'Housekeeping Suppliers'];
const arClients = ['فنادق', 'منتجعات', 'شقق فندقية', 'مشغلو Airbnb', 'مجموعات ضيافة', 'سكن موظفين', 'عقارات للإيجار', 'موردو هاوس كيبينج'];

export function Hospitality() {
  const language = useLanguage();
  const isArabic = language === 'ar';
  const displayedBenefits = isArabic ? arBenefits : benefits;
  const displayedClients = isArabic ? arClients : clients;

  return (
    <>
      <PageHero
        eyebrow={isArabic ? 'الفنادق والضيافة' : 'Hospitality'}
        title={isArabic ? 'حلول منسوجات الفنادق والضيافة' : 'Hotel & Hospitality Textile Solutions'}
        description={isArabic ? 'حلول مفروشات ومنسوجات حمام متينة للفنادق والمنتجعات والشقق الفندقية ومجموعات الضيافة.' : 'Durable bedding and bath textile solutions for hotels, resorts, serviced apartments, and hospitality groups.'}
        accent={isArabic ? 'نوفر لقطاع الضيافة منتجات مفروشات وحمام مصممة لراحة النزلاء، والغسيل المتكرر، والعملية التشغيلية، والقيمة طويلة الأجل.' : 'We supply hospitality businesses with bedding and bath textile products designed for guest comfort, repeated washing, operational practicality, and long-term value.'}
        image={elbadrawiImages.brightSuite}
        imageAlt="Hotel bedding and hospitality textiles"
      />

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            label={isArabic ? 'منسوجات الغرف' : 'Room textiles'}
            title={isArabic ? 'حلول متكاملة لمنسوجات الغرف' : 'Complete Room Textile Solutions'}
            description={isArabic ? `تدعم مجموعة البدراوي الفنادق ومشغلي الضيافة بحلول متكاملة لمنسوجات الغرف. ${arFullProductSentence}` : `Elbadrawi Group can support hotels and hospitality operators with complete room textile solutions. ${fullProductSentence}`}
          />
          <div className="media-frame aspect-[16/11]">
            <img
              src={elbadrawiImages.hotelBedSuite}
              alt={isArabic ? 'سرير فندقي مجهز بمفروشات بيضاء' : 'Hotel bed prepared with white hospitality bedding'}
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <SectionHeading
            label={isArabic ? 'استخدام تجاري' : 'Commercial use'}
            title={isArabic ? 'مصممة لاستخدام الضيافة' : 'Built for Hospitality Use'}
            description={isArabic ? 'تحتاج منسوجات الضيافة إلى التوازن بين الراحة والتحمل وأداء الغسيل وكفاءة التكلفة. نساعد العملاء على اختيار مواصفات تناسب مستوى المنشأة وتوقعات النزلاء ونظام الغسيل والميزانية.' : 'Hospitality textiles need to balance comfort, durability, washing performance, and cost efficiency. We help clients choose specifications that match their property level, guest expectations, laundry process, and budget.'}
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayedBenefits.map(([title, copy]) => (
              <article key={title} className="feature-panel">
                <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading
            label={isArabic ? 'نطاق المنتجات' : 'Product range'}
            title={isArabic ? 'منتجات مناسبة لبرامج الفنادق' : 'Products for Hotel Textile Programs'}
            description={isArabic ? 'استعرض فئات المنتجات التي يمكن دمجها داخل برامج الضيافة، من مفروشات الغرف إلى منسوجات الحمام والحماية.' : 'Explore product categories that can be combined into hospitality programs, from room bedding to bath textiles and protection items.'}
            align="center"
          />
          <ProductCarousel />
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <SectionHeading
            label={isArabic ? 'عملاء الضيافة' : 'Hospitality clients'}
            title={isArabic ? 'عملاء الضيافة الذين نخدمهم' : 'Hospitality Clients We Serve'}
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {displayedClients.map((client) => (
              <article key={client} className="premium-card">
                <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{client}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={isArabic ? 'ابنِ برنامج منسوجات الفندق مع مجموعة البدراوي.' : 'Build your hotel textile program with Elbadrawi Group.'}
        description={isArabic ? 'أخبرنا بنوع المنشأة والكميات وفئات المنتجات ومستوى المواصفات المطلوب.' : 'Tell us about your property type, quantities, textile categories, and preferred specification level.'}
        primaryLabel={commonText[language].requestQuote}
        primaryTo={localizePath('/request-a-quote', language)}
      />
    </>
  );
}

import { arFullProductSentence, fullProductSentence } from '../../config/products';
import { homeText, useLanguage } from '../../i18n';
import { SectionHeading } from '../ui/SectionHeading';

const reasons = [
  ['Decades of Textile Experience', 'A long-standing Egyptian textile business with deep roots in bedding, home textiles, and manufacturing.'],
  ['Complete Product Range', fullProductSentence],
  ['Flexible B2B Production', 'We support different specifications, target price points, packaging needs, and market positioning.'],
  ['Hospitality Knowledge', 'Products designed for hotels, resorts, serviced apartments, and commercial environments.'],
  ['Private Label Support', 'From product idea to finished packed goods, we help brands build complete home textile collections.'],
  ['Export-Oriented Mindset', 'A strategic manufacturing base in Egypt serving local and international markets.'],
];

const arReasons = [
  ['خبرة طويلة في المنسوجات', 'شركة مصرية ذات تاريخ طويل في تصنيع المفروشات والمنسوجات المنزلية.'],
  ['مجموعة منتجات واسعة', arFullProductSentence],
  ['إنتاج مرن لعملاء الشركات', 'ندعم مواصفات مختلفة، مستويات سعرية متعددة، احتياجات تغليف متنوعة، ومتطلبات علامات تجارية خاصة.'],
  ['خبرة في قطاع الضيافة', 'منتجات مناسبة للفنادق والمنتجعات والشقق الفندقية والاستخدام التجاري المتكرر.'],
  ['دعم العلامات التجارية الخاصة', 'نساعد العلامات التجارية في تطوير منتجاتها من الفكرة حتى المنتج النهائي المعبأ.'],
  ['رؤية مناسبة للتصدير', 'قاعدة تصنيع مصرية تخدم الأسواق المحلية والدولية.'],
];

export function WhyElbadrawi() {
  const language = useLanguage();
  const text = homeText[language];
  const items = language === 'ar' ? arReasons : reasons;

  return (
    <section className="section-space bg-white">
      <div className="site-container">
        <SectionHeading label={text.whyLabel} title={text.whyTitle} align="center" />
        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map(([title, copy]) => (
            <article key={title} className="feature-panel">
              <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

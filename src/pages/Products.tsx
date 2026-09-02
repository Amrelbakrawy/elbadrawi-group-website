import { CTASection } from '../components/ui/CTASection';
import { ProductCard } from '../components/sections/ProductCard';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';
import { productRange } from '../config/products';
import { commonText, localizePath, useLanguage } from '../i18n';

export function Products() {
  const language = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      <PageHero
        eyebrow={isArabic ? 'المنتجات' : 'Products'}
        title={isArabic ? 'المنتجات التي نصنعها' : 'Products We Manufacture'}
        description={
          isArabic
            ? 'مجموعة متكاملة من المفروشات ومنسوجات الحمام والمنتجات المنزلية التي نصنعها للفنادق وتجار التجزئة وتجار الجملة والعلامات التجارية الخاصة والموزعين وعملاء التصدير.'
            : 'A complete range of bedding, bath, and home textile products manufactured for hotels, retailers, wholesalers, private label brands, distributors, and export clients.'
        }
        image={elbadrawiImages.brandCollection}
        imageAlt="Elbadrawi Group home textile product portfolio"
      />

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading
            label={isArabic ? 'نطاق المنتجات' : 'Product portfolio'}
            title={isArabic ? 'مجموعة متكاملة من منتجات المنسوجات المنزلية' : 'Complete Home Textile Product Range'}
            description={
              isArabic
                ? 'تصنع مجموعة البدراوي مجموعة واسعة من المنسوجات المنزلية المصممة لتلبية احتياجات مختلفة، من مجموعات التجزئة الفاخرة إلى برامج الضيافة المتينة والتوريد الكبير للعلامات التجارية الخاصة.'
                : 'Elbadrawi Group manufactures a wide range of home textile products designed for different business needs, from premium retail collections to durable hospitality programs and large-scale private label supply.'
            }
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {productRange.map((product) => (
              <ProductCard key={product.name} product={product} language={language} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={isArabic ? 'هل تبحث عن منتج أو مواصفة أو مجموعة بعلامتك التجارية؟' : 'Looking for a specific product, specification, or private label collection?'}
        description={isArabic ? 'شاركنا متطلباتك، وسيساعدك فريقنا في بناء الحل المناسب لاحتياجات شركتك.' : "Share your requirements with our team and we'll help you build the right product solution for your business."}
        primaryLabel={commonText[language].requestQuote}
        primaryTo={localizePath('/request-a-quote', language)}
      />
    </>
  );
}

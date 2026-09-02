import { CTASection } from '../components/ui/CTASection';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';
import { commonText, localizePath, useLanguage } from '../i18n';

const values = [
  ['Quality', 'We focus on products that are practical, comfortable, durable, and suitable for their intended use.'],
  ['Reliability', 'We aim to build long-term partnerships through consistency, communication, and dependable production.'],
  ['Flexibility', 'We support different client needs, from premium collections to commercial and cost-effective textile programs.'],
  ['Experience', 'Our decades in the textile market help us understand product performance, client expectations, and manufacturing challenges.'],
  ['Partnership', 'We work with clients as long-term partners, not one-time buyers.'],
];

export function About() {
  const language = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      <PageHero
        eyebrow={isArabic ? 'من نحن' : 'About'}
        title={isArabic ? 'عن مجموعة البدراوي' : 'About Elbadrawi Group'}
        description={isArabic ? 'شركة مصرية موثوقة في تصنيع المنسوجات المنزلية بخبرة طويلة في المفروشات ومنسوجات الحمام وتوريد الضيافة والتصنيع بعلامة خاصة والإنتاج الموجه للتصدير.' : 'A trusted Egyptian home textile manufacturer with decades of experience in bedding, bath textiles, hospitality supply, private label manufacturing, and export-oriented production.'}
        image={elbadrawiImages.wholesalePacks}
        imageAlt="Elbadrawi Group home textile manufacturing"
      />

      <section className="section-space bg-white">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading title={isArabic ? 'شريك تصنيع متكامل للمنسوجات المنزلية' : 'A Complete Home Textile Manufacturing Partner'} label={isArabic ? 'الشركة' : 'Company'} />
          <div className="premium-card">
            <p className="text-base leading-8 text-muted-foreground">
              {isArabic ? 'تجمع مجموعة البدراوي بين عقود من الخبرة في المنسوجات، وفرق إنتاج ماهرة، ومجموعة واسعة من منتجات المنسوجات المنزلية لخدمة الشركات التي تحتاج إلى جودة موثوقة وتخصيص مرن وتوريد مستقر.' : 'Elbadrawi Group brings together decades of textile experience, skilled production teams, and a wide home textile product portfolio to serve businesses that need reliable quality, flexible customization, and consistent supply.'}
            </p>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              From Egyptian cotton bedding and hotel textiles to pillows, duvets, towels, mattress
              protection, bathrobes, and polyester filling solutions, we support clients across
              hospitality, retail, wholesale, private label manufacturing, and export markets.
            </p>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              Our strength is not only in producing products, but in understanding different market
              needs, from premium luxury collections to cost-effective, high-volume textile
              solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="media-frame aspect-[16/10]">
            <img src={elbadrawiImages.designStudio} alt="Home textile product development workspace" loading="lazy" />
          </div>
          <SectionHeading
            label="Experience"
            title="Built on Textile Experience"
            description="Since 1970, Elbadrawi Group has grown with a clear focus on home textiles, bedding, and manufacturing. Over the years, the company has developed experience across retail, wholesale, hospitality, private label, and international supply."
          />
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container grid gap-6 lg:grid-cols-2">
          <article className="feature-panel">
            <p className="eyebrow">Mission</p>
            <h2 className="section-title mt-6">Our Mission</h2>
            <p className="section-copy mt-6">
              To manufacture reliable, high-quality home textile products that help our partners
              build stronger businesses, better collections, and long-term customer trust.
            </p>
          </article>
          <article className="feature-panel">
            <p className="eyebrow">Vision</p>
            <h2 className="section-title mt-6">Our Vision</h2>
            <p className="section-copy mt-6">
              To become one of Egypt's most trusted home textile manufacturing partners for
              hospitality groups, retailers, private label brands, wholesalers, and international
              buyers.
            </p>
          </article>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <SectionHeading label="Values" title="Our Values" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {values.map(([title, copy]) => (
              <article key={title} className="feature-panel">
                <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={isArabic ? 'اعمل مع شريك تصنيع متكامل للمنسوجات المنزلية' : 'Work With a Complete Home Textile Manufacturing Partner'}
        description={isArabic ? 'أخبرنا بالمنتجات التي تحتاجها، وسوقك المستهدف، واحتياجات التوريد. سيساعدك فريقنا في تحديد الخطوة التالية.' : 'Tell us about the products you need, your target market, and your supply needs. Our team will help you define the next step.'}
        primaryLabel={commonText[language].requestQuote}
        primaryTo={localizePath('/request-a-quote', language)}
        secondaryLabel={commonText[language].exploreCapabilities}
        secondaryTo={localizePath('/capabilities', language)}
      />
    </>
  );
}

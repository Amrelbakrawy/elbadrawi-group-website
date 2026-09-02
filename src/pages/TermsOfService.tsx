import { Link } from 'react-router';
import { PageHero } from '../components/ui/PageHero';
import { siteConfig } from '../config/site';
import { localizePath, useLanguage } from '../i18n';

export function TermsOfService() {
  const language = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      <PageHero
        eyebrow={isArabic ? 'قانوني' : 'Legal'}
        title={isArabic ? 'شروط الخدمة' : 'Terms of Service'}
        description={
          isArabic
            ? 'تحكم هذه الشروط استخدام موقع مجموعة البدراوي وإرسال الاستفسارات التجارية عبره.'
            : 'These terms govern use of the Elbadrawi Group website and submission of business inquiries through it.'
        }
      />

      <section className="section-space bg-white">
        <div className="site-container max-w-3xl space-y-8 text-base leading-8 text-muted-foreground">
          <p>
            {isArabic
              ? `آخر تحديث: ${new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}`
              : `Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`}
          </p>

          <div>
            <h2 className="font-heading text-2xl text-foreground">
              {isArabic ? 'الغرض من الموقع' : 'Purpose of This Website'}
            </h2>
            <p className="mt-4">
              {isArabic
                ? 'يوفر هذا الموقع معلومات عن منتجات وخدمات تصنيع المنسوجات المنزلية لدى مجموعة البدراوي. لا يشكل محتوى الموقع عرضًا ملزمًا أو عقدًا تجاريًا.'
                : 'This website provides information about Elbadrawi Group textile manufacturing products and services. Website content does not constitute a binding offer or commercial contract.'}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-foreground">
              {isArabic ? 'الاستفسارات وعروض الأسعار' : 'Inquiries and Quotations'}
            </h2>
            <p className="mt-4">
              {isArabic
                ? 'تخضع عروض الأسعار والشروط التجارية النهائية للمواصفات المعتمدة والكميات وجداول التسليم والاتفاقيات المكتوبة بين الطرفين.'
                : 'Final pricing and commercial terms are subject to approved specifications, quantities, delivery schedules, and written agreements between the parties.'}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-foreground">
              {isArabic ? 'الملكية الفكرية' : 'Intellectual Property'}
            </h2>
            <p className="mt-4">
              {isArabic
                ? 'جميع النصوص والصور والعلامات التجارية والمواد المعروضة على هذا الموقع مملوكة لمجموعة البدراوي أو مرخصة لها، ولا يجوز إعادة استخدامها دون إذن مسبق.'
                : 'All text, images, trademarks, and materials displayed on this website are owned by or licensed to Elbadrawi Group and may not be reused without prior permission.'}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-foreground">
              {isArabic ? 'إخلاء المسؤولية' : 'Disclaimer'}
            </h2>
            <p className="mt-4">
              {isArabic
                ? 'نسعى لضمان دقة المعلومات، لكن قد تتغير المواصفات والمنتجات والقدرات التصنيعية. يتم توفير الموقع "كما هو" دون ضمانات صريحة أو ضمنية.'
                : 'We aim to keep information accurate, but specifications, products, and manufacturing capabilities may change. This website is provided on an "as is" basis without express or implied warranties.'}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-foreground">
              {isArabic ? 'القانون الحاكم' : 'Governing Law'}
            </h2>
            <p className="mt-4">
              {isArabic
                ? 'تخضع هذه الشروط للقوانين المعمول بها في جمهورية مصر العربية، ما لم يُتفق كتابيًا على خلاف ذلك في عقد تجاري منفصل.'
                : 'These terms are governed by the laws of the Arab Republic of Egypt, unless otherwise agreed in a separate written commercial contract.'}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-foreground">
              {isArabic ? 'التواصل' : 'Contact'}
            </h2>
            <p className="mt-4">
              {isArabic ? 'للاستفسارات المتعلقة بهذه الشروط، راسلنا على' : 'For questions about these terms, email'}{' '}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-foreground underline">
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </div>

          <Link to={localizePath('/contact', language)} className="button-secondary inline-flex">
            {isArabic ? 'تواصل معنا' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </>
  );
}

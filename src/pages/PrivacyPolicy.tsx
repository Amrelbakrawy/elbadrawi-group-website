import { Link } from 'react-router';
import { PageHero } from '../components/ui/PageHero';
import { siteConfig } from '../config/site';
import { localizePath, useLanguage } from '../i18n';

export function PrivacyPolicy() {
  const language = useLanguage();
  const isArabic = language === 'ar';

  return (
    <>
      <PageHero
        eyebrow={isArabic ? 'قانوني' : 'Legal'}
        title={isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
        description={
          isArabic
            ? 'توضح هذه السياسة كيفية جمع مجموعة البدراوي للمعلومات واستخدامها وحمايتها عند استخدام هذا الموقع.'
            : 'This policy explains how Elbadrawi Group collects, uses, and protects information when you use this website.'
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
              {isArabic ? 'المعلومات التي نجمعها' : 'Information We Collect'}
            </h2>
            <p className="mt-4">
              {isArabic
                ? 'عند إرسال نموذج طلب عرض سعر أو التواصل معنا، قد نجمع الاسم واسم الشركة والبريد الإلكتروني ورقم الهاتف والدولة وتفاصيل المشروع التي تختار مشاركتها.'
                : 'When you submit a quote request or contact us, we may collect your name, company name, email address, phone number, country, and project details you choose to share.'}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-foreground">
              {isArabic ? 'كيف نستخدم المعلومات' : 'How We Use Information'}
            </h2>
            <p className="mt-4">
              {isArabic
                ? 'نستخدم المعلومات للرد على الاستفسارات التجارية، وإعداد عروض الأسعار، وإدارة علاقات العملاء، وتحسين خدماتنا. لا نبيع بياناتك الشخصية لأطراف ثالثة.'
                : 'We use submitted information to respond to business inquiries, prepare quotations, manage customer relationships, and improve our services. We do not sell your personal data to third parties.'}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-foreground">
              {isArabic ? 'الاحتفاظ بالبيانات والأمان' : 'Data Retention and Security'}
            </h2>
            <p className="mt-4">
              {isArabic
                ? 'نحتفظ بالاستفسارات التجارية للمدة اللازمة لتقديم الخدمة والامتثال للمتطلبات التشغيلية والقانونية. نطبق ضوابط وصول وإجراءات تقنية معقولة لحماية المعلومات.'
                : 'We retain business inquiries for as long as needed to provide services and meet operational or legal requirements. We apply reasonable access controls and technical safeguards to protect submitted information.'}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-foreground">
              {isArabic ? 'حقوقك' : 'Your Rights'}
            </h2>
            <p className="mt-4">
              {isArabic
                ? 'يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها عبر التواصل معنا على البريد الإلكتروني أدناه، وفقًا للقوانين المعمول بها.'
                : 'You may request access to, correction of, or deletion of your data by contacting us at the email below, subject to applicable law.'}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl text-foreground">
              {isArabic ? 'التواصل' : 'Contact'}
            </h2>
            <p className="mt-4">
              {isArabic ? 'للاستفسارات المتعلقة بالخصوصية، راسلنا على' : 'For privacy-related questions, email'}{' '}
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

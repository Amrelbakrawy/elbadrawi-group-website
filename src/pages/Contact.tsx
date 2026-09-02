import { Clock3, Globe2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CTASection } from '../components/ui/CTASection';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { elbadrawiImages } from '../config/elbadrawiImages';
import { getMailtoLink, siteConfig } from '../config/site';
import { commonText, localizePath, useLanguage } from '../i18n';

const inquiryTypes = [
  'General Inquiry',
  'Request a Quote',
  'Private Label',
  'Hospitality Bedding',
  'Wholesale Supply',
  'Product Information',
  'Export Inquiry',
  'Partnership Inquiry',
];

export function Contact() {
  const language = useLanguage();
  const isArabic = language === 'ar';
  const emailLink = getMailtoLink(siteConfig.contactEmail);
  const formLabels = isArabic
    ? ['الاسم الكامل', 'اسم الشركة', 'البريد الإلكتروني', 'رقم الهاتف', 'الدولة']
    : ['Full Name', 'Company Name', 'Email Address', 'Phone Number', 'Country'];
  const inquiryOptions = isArabic
    ? ['استفسار عام', 'طلب عرض سعر', 'علامة تجارية خاصة', 'مفروشات فندقية', 'توريد جملة', 'معلومات عن المنتجات', 'استفسار تصدير', 'استفسار شراكة']
    : inquiryTypes;

  return (
    <>
      <PageHero
        eyebrow={isArabic ? 'تواصل معنا' : 'Contact'}
        title={isArabic ? 'تواصل مع مجموعة البدراوي' : 'Contact Elbadrawi Group'}
        description={isArabic ? 'تواصل مع فريقنا لمناقشة التصنيع، العلامات التجارية الخاصة، مفروشات الضيافة، توريد الجملة، التصدير، أو متطلبات المنتجات المخصصة.' : 'Get in touch with our team to discuss manufacturing, private label, hospitality bedding, wholesale supply, export, or custom product requirements.'}
        image={elbadrawiImages.wholesalePacks}
        imageAlt="Textile samples and production planning materials"
      />

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading
            label={isArabic ? 'بيانات التواصل' : 'Contact information'}
            title={isArabic ? 'بيانات التواصل الرئيسية' : 'Main Contact Information'}
            align="center"
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <a href={emailLink} className="premium-card block">
              <Mail className="h-8 w-8 text-foreground" />
              <h2 className="mt-6 font-heading text-2xl tracking-[-0.04em] text-foreground">{isArabic ? 'راسلنا بالبريد الإلكتروني' : 'Email Us'}</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{siteConfig.contactEmail}</p>
            </a>
            <a href={siteConfig.contactPhoneHref} className="premium-card block">
              <Phone className="h-8 w-8 text-foreground" />
              <h2 className="mt-6 font-heading text-2xl tracking-[-0.04em] text-foreground">{isArabic ? 'اتصل بنا' : 'Call Us'}</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{siteConfig.contactPhoneDisplay}</p>
            </a>
            <a href={siteConfig.whatsappHref} className="premium-card block">
              <MessageCircle className="h-8 w-8 text-foreground" />
              <h2 className="mt-6 font-heading text-2xl tracking-[-0.04em] text-foreground">{isArabic ? 'واتساب للدعم والكتالوج' : 'WhatsApp Support & Catalogue'}</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{siteConfig.whatsappDisplay}</p>
            </a>
            <a href={siteConfig.websiteHref} className="premium-card block">
              <Globe2 className="h-8 w-8 text-foreground" />
              <h2 className="mt-6 font-heading text-2xl tracking-[-0.04em] text-foreground">Website</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{siteConfig.websiteDisplay}</p>
            </a>
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading label={isArabic ? 'موقع المصنع' : 'Factory location'} title={isArabic ? 'مقر المصنع' : 'Factory Headquarters'} />
            <article className="premium-card mt-8">
              <MapPin className="h-8 w-8 text-foreground" />
              <h3 className="mt-6 font-heading text-2xl tracking-[-0.04em] text-foreground">{isArabic ? 'العنوان' : 'Address'}</h3>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{siteConfig.contactLocation}</p>
              <div className="mt-8 flex items-start gap-3">
                <Clock3 className="mt-1 h-5 w-5 text-foreground" />
                <div>
                  <p className="font-semibold text-foreground">{isArabic ? 'مواعيد العمل' : 'Working Hours'}</p>
                  <p className="mt-2 text-base leading-8 text-muted-foreground">
                    Saturday - Thursday: 08:00 - 17:00<br />
                    Friday: Closed
                  </p>
                </div>
              </div>
            </article>
          </div>
          <div className="media-frame min-h-[24rem]">
            <iframe
              title="Elbadrawi Group factory location map"
              className="h-full min-h-[24rem] w-full"
              loading="lazy"
              src="https://www.google.com/maps?q=El%20Obour%201st%20Industrial%20Zone%20Egypt&output=embed"
            />
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading label="Factory outlet" title="Al-Sheikh Zayed Factory Outlet" align="center" />
          <article className="feature-panel mx-auto mt-14 max-w-3xl text-center">
            <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">
              Hyper One Mall, Al Sheikh Zayed
            </h3>
            <p className="mt-4 text-base leading-8 text-muted-foreground">{siteConfig.zayedOutletAddress}</p>
            <a
              href={siteConfig.zayedOutletPhoneHref}
              className="mt-5 inline-flex text-base font-semibold text-foreground"
            >
              {siteConfig.zayedOutletPhoneDisplay}
            </a>
          </article>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            label={isArabic ? 'نموذج التواصل' : 'Contact form'}
            title={isArabic ? 'إرسال استفسار' : 'Send Us a Message'}
            description={isArabic ? 'سواء كنت تبحث عن مصنع مفروشات، شريك علامة خاصة، مورد للضيافة، مصدر إنتاج للجملة، أو شريك تصدير، أرسل لنا استفسارك وسيرد فريقنا بالخطوات المناسبة.' : 'Whether you are looking for a bedding manufacturer, private label partner, hospitality supplier, wholesale production source, or export partner, send us your inquiry and our team will respond with the appropriate next steps.'}
          />
          <form className="premium-card grid gap-5" action={emailLink} method="post" encType="text/plain">
            {formLabels.map((label) => (
              <label key={label} className="grid gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-foreground">{label}</span>
                <input className="form-input" name={label.toLowerCase().replaceAll(' ', '-')} />
              </label>
            ))}
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">{isArabic ? 'نوع الاستفسار' : 'Inquiry Type'}</span>
              <select className="form-input bg-white" name="inquiry-type">
                {inquiryOptions.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-foreground">{isArabic ? 'الرسالة' : 'Message'}</span>
              <textarea className="form-input min-h-36" name="message" />
            </label>
            <button type="submit" className="button-primary justify-center">{isArabic ? 'إرسال استفسار' : 'Send Message'}</button>
          </form>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <div className="feature-panel mx-auto max-w-4xl text-center">
            <p className="eyebrow">Business inquiries welcome</p>
            <h2 className="section-title mt-6">Business Inquiries Welcome</h2>
            <p className="section-copy mx-auto mt-6 max-w-3xl">
              We welcome inquiries from hotels, retailers, distributors, e-commerce brands, private
              label clients, and commercial buyers looking for reliable bedding and home textile
              manufacturing solutions.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        title={isArabic ? 'هل أنت مستعد لمناقشة متطلباتك؟' : 'Ready to Discuss Your Requirements?'}
        description={isArabic ? 'شاركنا متطلبات المنتجات والكميات ونوع النشاط وسنساعدك في تحديد الخطوة التالية.' : 'Share your product requirements, quantities, and business type and we will help define the next step.'}
        primaryLabel={commonText[language].requestQuote}
        primaryTo={localizePath('/request-a-quote', language)}
        secondaryLabel={commonText[language].viewFullProductRange}
        secondaryTo={localizePath('/products', language)}
      />
    </>
  );
}

import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import { useState } from 'react';
import { PageHero } from '../components/ui/PageHero';
import { SectionHeading } from '../components/ui/SectionHeading';
import { buttonClasses } from '../utils/buttonClasses';
import { elbadrawiImages } from '../config/elbadrawiImages';
import {
  AR_BUSINESS_TYPES,
  AR_PRODUCT_CATEGORIES,
  AR_QUANTITY_OPTIONS,
  AR_TARGET_MARKET_OPTIONS,
  BUSINESS_TYPES,
  PRODUCT_CATEGORIES,
  QUANTITY_OPTIONS,
  TARGET_MARKET_OPTIONS,
  TIMELINE_OPTIONS,
} from '../config/quote';
import { siteConfig } from '../config/site';
import { commonText, useLanguage } from '../i18n';
import { submitQuote, type QuoteFieldErrors } from '../utils/quoteApi';

type QuoteFormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  website: string;
  businessType: string;
  productCategory: string;
  quantity: string;
  targetMarket: string;
  materials: string;
  sizes: string;
  branding: string;
  packaging: string;
  timeline: string;
  customization: string;
  message: string;
};

type SubmissionState = {
  emailSent: boolean;
  message: string;
} | null;

const initialFormState: QuoteFormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  website: '',
  businessType: '',
  productCategory: '',
  quantity: '',
  targetMarket: '',
  materials: '',
  sizes: '',
  branding: '',
  packaging: '',
  timeline: '',
  customization: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,40}$/;

export function RequestQuote() {
  const language = useLanguage();
  const isArabic = language === 'ar';
  const businessTypes = isArabic ? AR_BUSINESS_TYPES : BUSINESS_TYPES;
  const productCategories = isArabic ? AR_PRODUCT_CATEGORIES : PRODUCT_CATEGORIES;
  const quantityOptions = isArabic ? AR_QUANTITY_OPTIONS : QUANTITY_OPTIONS;
  const targetMarketOptions = isArabic ? AR_TARGET_MARKET_OPTIONS : TARGET_MARKET_OPTIONS;
  const [formState, setFormState] = useState<QuoteFormState>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<QuoteFieldErrors>({});
  const [submitted, setSubmitted] = useState<SubmissionState>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFieldChange =
    (field: keyof QuoteFormState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setFormState((current) => ({
        ...current,
        [field]: value,
      }));
      setFieldErrors((current) => ({
        ...current,
        [field]: undefined,
        form: undefined,
      }));
      setError(null);
    };

  const handleProductCategoryToggle =
    (category: string) => (event: ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      setFormState((current) => {
        const selectedProducts = current.productCategory
          .split(',')
          .map((product) => product.trim())
          .filter(Boolean);
        const nextProducts = isChecked
          ? [...selectedProducts, category]
          : selectedProducts.filter((product) => product !== category);

        return {
          ...current,
          productCategory: nextProducts.join(', '),
        };
      });

      setFieldErrors((current) => ({
        ...current,
        productCategory: undefined,
        form: undefined,
      }));
      setError(null);
    };

  const selectedProductCategories = formState.productCategory
    .split(',')
    .map((product) => product.trim())
    .filter(Boolean);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const nextFieldErrors = validateQuoteForm(formState);
    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      return;
    }

    setFieldErrors({});
    setIsLoading(true);

    try {
      const formData = new FormData();
      for (const [field, value] of Object.entries(formState)) {
        formData.append(field, value);
      }

      const result = await submitQuote(formData);

      if (result.ok) {
        setSubmitted({
          emailSent: result.emailSent,
          message: result.message,
        });
        setFormState(initialFormState);
        return;
      }

      setFieldErrors(result.fieldErrors || {});
      setError(result.message);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : isArabic ? 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.' : 'An unexpected error occurred. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <section className="section-space bg-gradient-to-b from-slate-50 to-white">
        <div className="site-container">
          <div data-reveal className="glass-strip mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white/80 backdrop-blur px-6 md:px-10 py-12 md:py-16 text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="font-heading text-3xl md:text-4xl tracking-[-0.04em] text-foreground">
              {isArabic ? 'تم إرسال طلب عرض السعر بنجاح' : 'Quote request submitted successfully'}
            </h1>
            <p className="mt-4 md:mt-6 text-base md:text-lg leading-relaxed text-muted-foreground">{submitted.message}</p>
            <p className="mt-3 md:mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
              {submitted.emailSent
                ? isArabic ? 'تم إخطار فريقنا وسنرد خلال 24 إلى 48 ساعة عمل. يرجى متابعة بريدك الإلكتروني.' : 'Our team has been notified and will respond within 24 to 48 business hours. Watch your email for our response.'
                : isArabic ? 'تم حفظ طلبك بنجاح. قد نراجعه يدويًا إذا حدث تأخير في إرسال البريد الإلكتروني.' : 'Your request was saved successfully. We may need to review it manually if email delivery was delayed.'}
            </p>
            <button
              type="button"
              className={`mt-8 ${buttonClasses.primary}`}
              onClick={() => {
                setSubmitted(null);
                setError(null);
              }}
            >
              {isArabic ? 'إرسال طلب آخر' : 'Submit Another Request'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow={isArabic ? 'طلب عرض سعر' : 'Request quote'}
        title={isArabic ? 'طلب عرض سعر' : 'Request a Quote'}
        description={isArabic ? 'شاركنا تفاصيل مشروعك، وسيساعدك فريقنا في بناء الحل المناسب لاحتياجات شركتك.' : 'Tell us more about your project and our team will help you build the right home textile solution for your business.'}
        accent={isArabic ? 'سواء كنت تبحث عن توريد للفنادق أو التجزئة أو الجملة أو التصدير أو العلامات التجارية الخاصة أو الشقق الفندقية، يمكن لمجموعة البدراوي مساعدتك في اختيار المنتجات والمواصفات المناسبة وتقديم تفاصيل عرض السعر.' : 'Whether you are sourcing for hotels, retail, wholesale, export, private label, or serviced apartments, Elbadrawi Group can support you with product options, specifications, and quotation details.'}
        image={elbadrawiImages.cottonLinen}
        imageAlt="Premium white cotton linens prepared for textile sourcing"
      />

      <section className="section-space bg-gradient-to-b from-white to-slate-50">
        <div className="site-container">
          <div className="grid gap-8 lg:gap-14 lg:grid-cols-[1fr_1.3fr]">
            {/* Sidebar Info */}
            <aside data-reveal className="space-y-6 reveal-fade lg:max-w-xs">
              <div className="media-frame aspect-[4/5]">
                <img
                  src={elbadrawiImages.wholesalePacks}
                  alt="Packed wholesale textile goods ready for supply"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start gap-3 mb-3">
                  <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm md:text-base">{isArabic ? 'ما الذي يجب تضمينه' : 'What to include'}</p>
                    <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                      {isArabic ? 'نوع المنتج، المواصفات، الكميات، السوق المستهدف، العلامة التجارية، التغليف، والجدول الزمني.' : 'Product type, specifications, quantities, target market, branding, packaging, and timeline.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start gap-3 mb-3">
                  <Check className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm md:text-base">{isArabic ? 'أخبرنا عن مشروعك' : 'Tell Us About Your Project'}</p>
                    <p className="mt-2 text-sm md:text-base leading-relaxed text-muted-foreground">
                      {isArabic ? 'يراجع فريقنا تفاصيلك ويتواصل معك لمناقشة أنسب حل تصنيعي.' : 'Our team reviews your details and contacts you to discuss the most suitable manufacturing solution.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                <p className="font-semibold text-blue-900 text-sm md:text-base">{isArabic ? 'جاهز للبدء؟' : 'Ready to start?'}</p>
                <p className="mt-2 text-sm md:text-base leading-relaxed text-blue-800">
                  {isArabic ? 'أكمل النموذج وسيراجع فريقنا طلبك ويتواصل معك بالخطوات التالية.' : 'Complete the form and our team will review your request and contact you with next steps.'}
                </p>
              </div>
            </aside>

            {/* Form */}
            <form
              data-reveal
              onSubmit={handleSubmit}
              className="reveal-fade rounded-2xl border border-slate-200 bg-white p-6 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-200"
              noValidate
            >
              <div className="space-y-6 md:space-y-8">
                {/* Error notification */}
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm md:text-base">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900">{isArabic ? 'تعذر إرسال طلبك' : 'We could not submit your request'}</p>
                        <p className="mt-2 leading-relaxed text-red-800">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Information Section */}
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-foreground mb-4">{isArabic ? 'بيانات التواصل' : 'Contact Information'}</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={isArabic ? 'اسم المسؤول' : 'Contact Person'} required error={fieldErrors.name}>
                      <input
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="name"
                        placeholder="John Smith"
                        value={formState.name}
                        onChange={handleFieldChange('name')}
                        maxLength={120}
                        aria-invalid={Boolean(fieldErrors.name)}
                      />
                    </Field>
                    <Field label={isArabic ? 'اسم الشركة' : 'Company Name'} required error={fieldErrors.company}>
                      <input
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="company"
                        placeholder="Acme Corp"
                        value={formState.company}
                        onChange={handleFieldChange('company')}
                        maxLength={160}
                        aria-invalid={Boolean(fieldErrors.company)}
                      />
                    </Field>
                    <Field label={isArabic ? 'البريد الإلكتروني' : 'Business Email'} required error={fieldErrors.email}>
                      <input
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="email"
                        type="email"
                        placeholder="john@acmecorp.com"
                        value={formState.email}
                        onChange={handleFieldChange('email')}
                        maxLength={160}
                        aria-invalid={Boolean(fieldErrors.email)}
                      />
                    </Field>
                    <Field label={isArabic ? 'رقم الهاتف / واتساب' : 'Phone Number'} error={fieldErrors.phone}>
                      <input
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={formState.phone}
                        onChange={handleFieldChange('phone')}
                        maxLength={40}
                        aria-invalid={Boolean(fieldErrors.phone)}
                      />
                    </Field>
                    <Field label={isArabic ? 'الدولة' : 'Country'} error={fieldErrors.country}>
                      <input
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="country"
                        placeholder="Egypt"
                        value={formState.country}
                        onChange={handleFieldChange('country')}
                        maxLength={80}
                        aria-invalid={Boolean(fieldErrors.country)}
                      />
                    </Field>
                    <Field label={isArabic ? 'موقع الشركة' : 'Company Website'} error={fieldErrors.website}>
                      <input
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="website"
                        placeholder="https://company.com"
                        value={formState.website}
                        onChange={handleFieldChange('website')}
                        maxLength={200}
                        aria-invalid={Boolean(fieldErrors.website)}
                      />
                    </Field>
                  </div>
                </div>

                {/* Project Details Section */}
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-sm md:text-base font-semibold text-foreground mb-4">{isArabic ? 'تفاصيل المشروع' : 'Project Details'}</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label={isArabic ? 'نوع النشاط' : 'Business Type'} required error={fieldErrors.businessType}>
                      <select
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="businessType"
                        value={formState.businessType}
                        onChange={handleFieldChange('businessType')}
                        aria-invalid={Boolean(fieldErrors.businessType)}
                      >
                        <option value="">{isArabic ? 'اختر نوع النشاط...' : 'Select business type...'}</option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label={isArabic ? 'المنتجات المطلوبة' : 'Products Interested In'} required error={fieldErrors.productCategory}>
                      <div
                        className="rounded-lg border border-slate-300 bg-white p-4 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
                        aria-invalid={Boolean(fieldErrors.productCategory)}
                      >
                        <input type="hidden" name="productCategory" value={formState.productCategory} />
                        <div className="grid gap-3 sm:grid-cols-2">
                          {productCategories.map((category) => (
                            <label
                              key={category}
                              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-sm font-medium text-foreground transition hover:border-slate-300 hover:bg-white"
                            >
                              <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 accent-slate-900"
                                value={category}
                                checked={selectedProductCategories.includes(category)}
                                onChange={handleProductCategoryToggle(category)}
                              />
                              <span>{category}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </Field>
                    <Field label={isArabic ? 'الكمية المتوقعة' : 'Estimated Quantity'} required error={fieldErrors.quantity}>
                      <select
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="quantity"
                        value={formState.quantity}
                        onChange={handleFieldChange('quantity')}
                        aria-invalid={Boolean(fieldErrors.quantity)}
                      >
                        <option value="">{isArabic ? 'اختر الكمية...' : 'Select range...'}</option>
                        {quantityOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label={isArabic ? 'السوق المستهدف / مستوى السعر' : 'Target Market / Price Level'} error={fieldErrors.targetMarket}>
                      <select
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="targetMarket"
                        value={formState.targetMarket}
                        onChange={handleFieldChange('targetMarket')}
                        aria-invalid={Boolean(fieldErrors.targetMarket)}
                      >
                        <option value="">{isArabic ? 'اختر مستوى السعر...' : 'Select price level...'}</option>
                        {targetMarketOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label={isArabic ? 'موعد التسليم المتوقع' : 'Expected Delivery Timeline'} error={fieldErrors.timeline}>
                      <select
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="timeline"
                        value={formState.timeline}
                        onChange={handleFieldChange('timeline')}
                        aria-invalid={Boolean(fieldErrors.timeline)}
                      >
                        <option value="">{isArabic ? 'اختر الموعد...' : 'Select timeline...'}</option>
                        {TIMELINE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                </div>

                {/* Message Section */}
                <div className="pt-4 border-t border-slate-200">
                  <h3 className="text-sm md:text-base font-semibold text-foreground mb-4">{isArabic ? 'متطلباتك' : 'Your Requirements'}</h3>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Field label={isArabic ? 'الخامات المطلوبة' : 'Preferred Materials'} error={fieldErrors.materials}>
                        <textarea
                          className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base min-h-28 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          name="materials"
                          value={formState.materials}
                          onChange={handleFieldChange('materials')}
                          maxLength={500}
                          aria-invalid={Boolean(fieldErrors.materials)}
                          placeholder={isArabic ? 'قطن، خامات مخلوطة، مستوى الجودة، GSM، عدد الخيوط...' : 'Cotton, blends, quality level, GSM, thread count...'}
                        />
                      </Field>
                      <Field label={isArabic ? 'المقاسات المطلوبة' : 'Required Sizes'} error={fieldErrors.sizes}>
                        <textarea
                          className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base min-h-28 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          name="sizes"
                          value={formState.sizes}
                          onChange={handleFieldChange('sizes')}
                          maxLength={500}
                          aria-invalid={Boolean(fieldErrors.sizes)}
                          placeholder={isArabic ? 'مفرد، كوين، كينج، مقاسات مخصصة...' : 'Single, queen, king, custom measurements...'}
                        />
                      </Field>
                    <Field label={isArabic ? 'هل تحتاج إلى تغليف بعلامتك التجارية؟' : 'Do you need private label packaging?'} error={fieldErrors.branding}>
                        <select
                          className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          name="branding"
                          value={formState.branding}
                          onChange={handleFieldChange('branding')}
                          aria-invalid={Boolean(fieldErrors.branding)}
                        >
                          <option value="">{isArabic ? 'اختر...' : 'Select option...'}</option>
                          <option value="Yes">{isArabic ? 'نعم' : 'Yes'}</option>
                          <option value="No">{isArabic ? 'لا' : 'No'}</option>
                          <option value="Not sure">{isArabic ? 'ربما' : 'Not sure'}</option>
                        </select>
                      </Field>
                      <Field label={isArabic ? 'هل تحتاج إلى تغليف؟' : 'Packaging Needed?'} error={fieldErrors.packaging}>
                        <select
                          className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          name="packaging"
                          value={formState.packaging}
                          onChange={handleFieldChange('packaging')}
                          aria-invalid={Boolean(fieldErrors.packaging)}
                        >
                          <option value="">{isArabic ? 'اختر...' : 'Select option...'}</option>
                          <option value="Yes">{isArabic ? 'نعم' : 'Yes'}</option>
                          <option value="No">{isArabic ? 'لا' : 'No'}</option>
                          <option value="Not sure">{isArabic ? 'ربما' : 'Not sure'}</option>
                        </select>
                      </Field>
                    </div>

                    <Field label={isArabic ? 'تفاصيل المشروع' : 'Message / Project Details'} error={fieldErrors.customization}>
                      <textarea
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base min-h-32 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="customization"
                        value={formState.customization}
                        onChange={handleFieldChange('customization')}
                        maxLength={1500}
                        aria-invalid={Boolean(fieldErrors.customization)}
                        placeholder={isArabic ? 'اكتب المقاسات، الخامات، GSM، عدد الخيوط، الألوان، التغليف، سوق التصدير أو أي متطلبات خاصة.' : 'Tell us about sizes, materials, GSM, thread count, colors, packaging, destination market, or any special requirements.'}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {formState.customization.length} / 1500 characters
                      </p>
                    </Field>

                    <Field label={isArabic ? 'ملاحظات إضافية' : 'Additional Notes'} required error={fieldErrors.message}>
                      <textarea
                        className="form-input rounded-lg border border-slate-300 px-4 py-3 md:py-3 text-base min-h-40 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        name="message"
                        value={formState.message}
                        onChange={handleFieldChange('message')}
                        maxLength={3000}
                        aria-invalid={Boolean(fieldErrors.message)}
                        placeholder={isArabic ? 'شاركنا تفاصيل مشروعك وأي سياق تجاري مهم.' : 'Tell us about your project and any important commercial context.'}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {formState.message.length} / 3000 {isArabic ? 'حرف' : 'characters'} ({isArabic ? 'الحد الأدنى 10' : 'min. 10'})
                      </p>
                    </Field>
                    <Field label={isArabic ? 'رفع ملف مرجعي / ملف مواصفات' : 'Upload Reference File / Specification Sheet'}>
                      <input
                        className="form-input rounded-lg border border-slate-300 bg-white px-4 py-3 text-base md:py-3"
                        name="referenceFile"
                        type="file"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {isArabic ? 'رفع الملف للاسترشاد فقط في نموذج المتصفح.' : 'File upload is for reference only in this browser form.'}
                      </p>
                    </Field>
                  </div>
                </div>

                {/* Form footer */}
                <div className="flex flex-col sm:flex-row gap-4 border-t border-slate-200 pt-6">
                  <p className="text-xs md:text-sm leading-relaxed text-muted-foreground flex-1">
                    {isArabic ? 'هذا النموذج مخصص لاستفسارات الشركات والتوريد التجاري. نرد خلال 24 إلى 48 ساعة عمل خلال أيام الأسبوع.' : 'This form is for commercial and B2B inquiries. We respond within 24-48 business hours during weekdays.'}
                  </p>
                  <div className="flex gap-3 flex-shrink-0">
                    {error ? (
                      <button
                        type="button"
                        className={buttonClasses.secondary}
                        onClick={() => setError(null)}
                      >
                        {isArabic ? 'حاول مرة أخرى' : 'Try Again'}
                      </button>
                    ) : null}
                    <button
                      type="submit"
                      className={`${buttonClasses.primary} disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-opacity-100 ${isLoading ? 'animate-pulse' : ''}`}
                      disabled={isLoading}
                    >
                      {isLoading ? commonText[language].sending : commonText[language].sendQuoteRequest}
                      {!isLoading && <ArrowRight className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="site-container">
          <SectionHeading
            label={isArabic ? 'بعد الإرسال' : 'After submission'}
            title={isArabic ? 'ماذا يحدث بعد إرسال الطلب؟' : 'What to Expect After You Submit'}
            align="center"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              isArabic
                ? ['الخطوة 1: نراجع طلبك', 'يراجع فريقنا المنتجات المختارة والمواصفات والكمية ومتطلبات النشاط.']
                : ['Step 1: We Review Your Request', 'Our team reviews your selected products, specifications, quantity, and business requirements.'],
              isArabic
                ? ['الخطوة 2: نتواصل معك للتوضيح', 'إذا احتجنا إلى تفاصيل إضافية، نتواصل معك لتأكيد الخامات والمقاسات والتغليف أو متطلبات التسليم.']
                : ['Step 2: We Contact You for Clarification', 'If more details are needed, we contact you to confirm materials, sizes, packaging, or delivery expectations.'],
              isArabic
                ? ['الخطوة 3: نجهز مقترحًا مناسبًا', 'بعد وضوح المتطلبات، نجهز عرض سعر أو اتجاه تصنيع مناسب لاحتياجات مشروعك.']
                : ['Step 3: We Prepare a Suitable Proposal', 'Once requirements are clear, we prepare a quotation or manufacturing direction based on your project needs.'],
              isArabic
                ? ['الخطوة 4: يبدأ تخطيط الإنتاج', 'بعد التأكيد، ننسق خطة الإنتاج والجدول الزمني والتغليف وتفاصيل التسليم.']
                : ['Step 4: Production Planning Begins', 'After confirmation, we align the production plan, timeline, packaging, and delivery details.'],
            ].map(([title, copy]) => (
              <article key={title} className="premium-card">
                <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{title}</h3>
                <p className="mt-4 text-base leading-8 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-panel">
        <div className="site-container">
          <div className="feature-panel mx-auto max-w-4xl">
            <p className="eyebrow">{isArabic ? 'تواصل مباشر' : 'Contact alternative'}</p>
            <h2 className="section-title mt-6">{isArabic ? 'هل تحتاج إلى التحدث معنا مباشرة؟' : 'Need to Speak With Us Directly?'}</h2>
            <p className="section-copy mt-6">{isArabic ? 'يمكنك أيضًا التواصل مباشرة مع فريقنا:' : 'You can also contact our team directly:'}</p>
            <div className="mt-8 grid gap-4 text-base leading-8 text-muted-foreground md:grid-cols-3">
              <p><strong className="text-foreground">Email:</strong> {siteConfig.contactEmail}</p>
              <p><strong className="text-foreground">Phone:</strong> {siteConfig.contactPhoneDisplay}</p>
              <p><strong className="text-foreground">WhatsApp Support & Catalogue:</strong> {siteConfig.whatsappDisplay}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function validateQuoteForm(values: QuoteFormState): QuoteFieldErrors {
  const errors: QuoteFieldErrors = {};

  const trimmedValues = Object.fromEntries(
    Object.entries(values).map(([field, value]) => [field, value.trim()]),
  ) as QuoteFormState;

  if (trimmedValues.name.length < 2) {
    errors.name = 'Please enter your full name.';
  }

  if (trimmedValues.company.length < 2) {
    errors.company = 'Please enter your company name.';
  }

  if (!EMAIL_PATTERN.test(trimmedValues.email)) {
    errors.email = 'Enter a valid business email address.';
  }

  if (trimmedValues.phone && !PHONE_PATTERN.test(trimmedValues.phone)) {
    errors.phone = 'Enter a valid phone number.';
  }

  if (trimmedValues.country.length > 80) {
    errors.country = 'Country must be 80 characters or fewer.';
  }

  if (trimmedValues.website.length > 200) {
    errors.website = 'Company website must be 200 characters or fewer.';
  }

  if (!trimmedValues.businessType) {
    errors.businessType = 'Please select your business type.';
  }

  if (!trimmedValues.productCategory) {
    errors.productCategory = 'Please select at least one product option.';
  }

  if (!trimmedValues.quantity) {
    errors.quantity = 'Please select the estimated quantity.';
  }

  if (trimmedValues.targetMarket.length > 120) {
    errors.targetMarket = 'Target market must be 120 characters or fewer.';
  }

  if (trimmedValues.materials.length > 500) {
    errors.materials = 'Preferred materials must be 500 characters or fewer.';
  }

  if (trimmedValues.sizes.length > 500) {
    errors.sizes = 'Required sizes must be 500 characters or fewer.';
  }

  if (trimmedValues.customization.length > 1500) {
    errors.customization = 'Customization details must be 1500 characters or fewer.';
  }

  if (trimmedValues.message.length < 10) {
    errors.message = 'Please tell us more about your project (at least 10 characters).';
  }

  if (trimmedValues.message.length > 3000) {
    errors.message = 'Project message must be 3000 characters or fewer.';
  }

  return errors;
}

type FieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

function Field({ label, required, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-foreground">
        {label}
        {required ? <span className="text-red-600 ml-1">*</span> : ''}
      </span>
      {children}
      {error && (
        <span className="text-xs md:text-sm text-red-600 font-medium">{error}</span>
      )}
    </div>
  );
}

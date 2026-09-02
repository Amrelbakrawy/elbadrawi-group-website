import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { commonText, localizePath, useLanguage } from '../i18n';

export function NotFound() {
  const language = useLanguage();
  const isArabic = language === 'ar';
  const text = commonText[language];

  return (
    <section className="section-space bg-background">
      <div className="site-container">
        <div className="mx-auto max-w-3xl rounded-[36px] border border-border bg-white px-8 py-14 text-center shadow-[0_24px_80px_rgba(70,55,43,0.08)] md:px-12">
          <p className="eyebrow">404</p>
          <h1 className="mt-6 font-heading text-6xl tracking-[-0.05em] text-foreground">
            {isArabic ? 'الصفحة غير موجودة' : 'Page not found'}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {isArabic
              ? 'الصفحة التي تبحث عنها غير متاحة. يمكنك العودة إلى الصفحة الرئيسية أو الانتقال إلى نموذج طلب عرض السعر.'
              : 'The page you were looking for is not available. You can return to the homepage or continue to the quote request form.'}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to={localizePath('/', language)} className="button-primary">
              {isArabic ? 'العودة للرئيسية' : 'Return Home'}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to={localizePath('/request-quote', language)} className="button-secondary">
              {text.requestQuote}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

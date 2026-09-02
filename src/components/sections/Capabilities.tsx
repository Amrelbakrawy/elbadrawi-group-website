import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router';
import { elbadrawiImages } from '../../config/elbadrawiImages';
import { arFullProductSentence, fullProductSentence } from '../../config/products';
import { commonText, homeText, localizePath, useLanguage } from '../../i18n';
import { SectionHeading } from '../ui/SectionHeading';

const capabilities = [
  {
    title: 'Custom Bedding Manufacturing',
    copy: fullProductSentence,
  },
  {
    title: 'Private Label Development',
    copy: 'We help businesses create products under their own brand with support across specifications, branding, and presentation.',
  },
  {
    title: 'Bulk and Wholesale Supply',
    copy: 'Our production model serves wholesale buyers, distributors, and commercial clients who need dependable supply across repeated orders.',
  },
  {
    title: 'Hospitality Bedding Programs',
    copy: 'We support hospitality-focused clients with bedding solutions designed for comfort, durability, and consistency across rooms and properties.',
  },
  {
    title: 'Packaging and Branding Support',
    copy: 'Where required, we can support product presentation through customized branding and packaging approaches aligned with your business model.',
  },
  {
    title: 'Product Specification Development',
    copy: 'We help align sizing, fabric direction, construction details, and commercial requirements before production begins.',
  },
  {
    title: 'Quality Control and Finishing',
    copy: 'Our production approach supports consistent finishing expectations across hospitality, retail, wholesale, and private label projects.',
  },
];

const arCapabilities = [
  {
    title: 'تصنيع مفروشات بمواصفات مخصصة',
    copy: arFullProductSentence,
  },
  {
    title: 'تطوير العلامات التجارية الخاصة',
    copy: 'نساعد الشركات في تطوير منتجات تحمل علامتها التجارية مع دعم المواصفات والهوية وطريقة العرض.',
  },
  {
    title: 'توريد الجملة والكميات الكبيرة',
    copy: 'نخدم المشترين بالجملة والموزعين والعملاء التجاريين الذين يحتاجون إلى توريد مستقر للطلبات المتكررة.',
  },
  {
    title: 'برامج مفروشات الضيافة',
    copy: 'ندعم عملاء الضيافة بحلول مفروشات مصممة للراحة والمتانة والثبات عبر الغرف والمنشآت.',
  },
  {
    title: 'دعم التغليف والعلامة التجارية',
    copy: 'عند الحاجة، ندعم عرض المنتج من خلال حلول تغليف وهوية مخصصة تناسب نموذج عملك.',
  },
  {
    title: 'تطوير مواصفات المنتجات',
    copy: 'نساعد في تحديد المقاسات والخامات وتفاصيل التصنيع والمتطلبات التجارية قبل بدء الإنتاج.',
  },
  {
    title: 'مراقبة الجودة والتشطيب',
    copy: 'يدعم أسلوب الإنتاج لدينا توقعات تشطيب ثابتة عبر مشاريع الضيافة والتجزئة والجملة والعلامات التجارية الخاصة.',
  },
];

export function Capabilities() {
  const language = useLanguage();
  const text = homeText[language];
  const isArabic = language === 'ar';
  const items = isArabic ? arCapabilities : capabilities;

  return (
    <section className="section-space bg-white">
      <div className="site-container grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeading
            label={text.manufacturingLabel}
            title={text.manufacturingTitle}
            description={`${text.manufacturingIntro} ${isArabic ? arFullProductSentence : fullProductSentence}`}
          />
          <div data-reveal className="media-frame mt-10 aspect-[16/11]">
            <img
              src={elbadrawiImages.designStudio}
              alt="Fabric and textile development workspace"
              loading="lazy"
            />
          </div>
        </div>

        <div className="grid gap-5">
          {items.map((item) => (
            <div key={item.title} data-reveal className="premium-card reveal-fade flex items-start gap-4">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black bg-black text-white">
                <Check className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-heading text-2xl tracking-[-0.04em] text-foreground">{item.title}</h3>
                <p className="mt-3 text-base leading-8 text-muted-foreground">{item.copy}</p>
              </div>
            </div>
          ))}
          <Link to={localizePath('/capabilities', language)} className="button-secondary w-fit">
            {commonText[language].exploreCapabilities}
            <ArrowRight className={`h-4 w-4 ${isArabic ? 'rotate-180' : ''}`} />
          </Link>
        </div>
      </div>
    </section>
  );
}

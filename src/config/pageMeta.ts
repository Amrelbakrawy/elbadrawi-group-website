import type { Language } from '../i18n';
import { siteConfig } from './site';

type PageMetaEntry = {
  en: { title: string; description: string };
  ar: { title: string; description: string };
};

const defaultDescription =
  'Elbadrawi Group manufactures premium bedding and bath textiles for hospitality, retail, private label, and export partners in Egypt.';

export const pageMetaByPath: Record<string, PageMetaEntry> = {
  '/': {
    en: {
      title: `${siteConfig.companyName} | Premium Textile Manufacturing`,
      description: defaultDescription,
    },
    ar: {
      title: `${siteConfig.companyName} | تصنيع المنسوجات المنزلية`,
      description:
        'مجموعة البدراوي شركة مصرية متخصصة في تصنيع المفروشات والمنسوجات المنزلية لقطاعات الضيافة والتجزئة والعلامات التجارية الخاصة والتصدير.',
    },
  },
  '/about': {
    en: {
      title: `About Us | ${siteConfig.companyName}`,
      description: 'Learn about Elbadrawi Group — an Egyptian textile manufacturer serving global hospitality, retail, and private label partners since 1976.',
    },
    ar: {
      title: `من نحن | ${siteConfig.companyName}`,
      description: 'تعرف على مجموعة البدراوي — شركة تصنيع منسوجات مصرية تخدم شركاء الضيافة والتجزئة والعلامات التجارية الخاصة منذ 1976.',
    },
  },
  '/capabilities': {
    en: {
      title: `Manufacturing Capabilities | ${siteConfig.companyName}`,
      description: 'Explore our end-to-end textile manufacturing capabilities — from fiber and fabric to cutting, sewing, finishing, and packaging.',
    },
    ar: {
      title: `القدرات التصنيعية | ${siteConfig.companyName}`,
      description: 'اكتشف قدراتنا التصنيعية المتكاملة في المنسوجات المنزلية من الخامات إلى التشطيب والتغليف.',
    },
  },
  '/products': {
    en: {
      title: `Products | ${siteConfig.companyName}`,
      description: 'Browse our full range of bedding and bath textiles — sheets, duvet covers, pillows, towels, bathrobes, and more.',
    },
    ar: {
      title: `المنتجات | ${siteConfig.companyName}`,
      description: 'تصفح مجموعتنا الكاملة من المفروشات ومنسوجات الحمام — شراشف، أغطية لحاف، وسائد، مناشف، وأردية حمام.',
    },
  },
  '/hospitality': {
    en: {
      title: `Hotel & Hospitality Textiles | ${siteConfig.companyName}`,
      description: 'Durable, brand-ready hospitality bedding and bath programs for hotels, resorts, and serviced apartments.',
    },
    ar: {
      title: `منسوجات الفنادق والضيافة | ${siteConfig.companyName}`,
      description: 'برامج مفروشات ومنسوجات حمام متينة وجاهزة للعلامات التجارية للفنادق والمنتجعات.',
    },
  },
  '/private-label': {
    en: {
      title: `Private Label Manufacturing | ${siteConfig.companyName}`,
      description: 'End-to-end private label textile manufacturing — custom specs, branding, packaging, and scalable production.',
    },
    ar: {
      title: `تصنيع بعلامتك التجارية | ${siteConfig.companyName}`,
      description: 'تصنيع منسوجات بعلامتك التجارية — مواصفات مخصصة، علامة تجارية، تغليف، وإنتاج قابل للتوسع.',
    },
  },
  '/export': {
    en: {
      title: `Export & Wholesale | ${siteConfig.companyName}`,
      description: 'Export-ready textile programs with consistent quality, documentation, and reliable lead times for international buyers.',
    },
    ar: {
      title: `التصدير والجملة | ${siteConfig.companyName}`,
      description: 'برامج منسوجات جاهزة للتصدير بجودة ثابتة ووثائق موثوقة ومواعيد تسليم مناسبة للمشترين الدوليين.',
    },
  },
  '/fiber-filling': {
    en: {
      title: `Fiber & Filling Solutions | ${siteConfig.companyName}`,
      description: 'Fiber and filling solutions for pillows, duvets, comforters, and mattress products tailored to your specifications.',
    },
    ar: {
      title: `حلول الفيبر والحشو | ${siteConfig.companyName}`,
      description: 'حلول فيبر وحشو للوسائد والألحفة والمراتب وفق مواصفاتك.',
    },
  },
  '/quality-customization': {
    en: {
      title: `Quality & Customization | ${siteConfig.companyName}`,
      description: 'Rigorous quality control and deep customization for materials, sizing, branding, and packaging requirements.',
    },
    ar: {
      title: `الجودة والتخصيص | ${siteConfig.companyName}`,
      description: 'رقابة جودة صارمة وتخصيص شامل للخامات والمقاسات والعلامة التجارية والتغليف.',
    },
  },
  '/request-quote': {
    en: {
      title: `Request a Quote | ${siteConfig.companyName}`,
      description: 'Submit your textile manufacturing requirements and our team will respond with pricing, lead times, and next steps.',
    },
    ar: {
      title: `طلب عرض سعر | ${siteConfig.companyName}`,
      description: 'أرسل متطلبات التصنيع الخاصة بك وسيرد فريقنا بالتسعير ومواعيد التسليم والخطوات التالية.',
    },
  },
  '/request-a-quote': {
    en: {
      title: `Request a Quote | ${siteConfig.companyName}`,
      description: 'Submit your textile manufacturing requirements and our team will respond with pricing, lead times, and next steps.',
    },
    ar: {
      title: `طلب عرض سعر | ${siteConfig.companyName}`,
      description: 'أرسل متطلبات التصنيع الخاصة بك وسيرد فريقنا بالتسعير ومواعيد التسليم والخطوات التالية.',
    },
  },
  '/contact': {
    en: {
      title: `Contact Us | ${siteConfig.companyName}`,
      description: `Contact Elbadrawi Group for manufacturing, private label, hospitality, wholesale, and export inquiries. Email ${siteConfig.contactEmail}.`,
    },
    ar: {
      title: `تواصل معنا | ${siteConfig.companyName}`,
      description: `تواصل مع مجموعة البدراوي للاستفسارات حول التصنيع والعلامات التجارية الخاصة والضيافة والجملة والتصدير.`,
    },
  },
  '/privacy-policy': {
    en: {
      title: `Privacy Policy | ${siteConfig.companyName}`,
      description: 'How Elbadrawi Group collects, uses, and protects information submitted through this website.',
    },
    ar: {
      title: `سياسة الخصوصية | ${siteConfig.companyName}`,
      description: 'كيف تجمع مجموعة البدراوي المعلومات المقدمة عبر هذا الموقع وتستخدمها وتحميها.',
    },
  },
  '/terms-of-service': {
    en: {
      title: `Terms of Service | ${siteConfig.companyName}`,
      description: 'Terms governing use of the Elbadrawi Group website and submission of business inquiries.',
    },
    ar: {
      title: `شروط الخدمة | ${siteConfig.companyName}`,
      description: 'الشروط التي تحكم استخدام موقع مجموعة البدراوي وإرسال الاستفسارات التجارية.',
    },
  },
};

export function getPageMeta(pathname: string, language: Language) {
  const normalizedPath =
    pathname === '/ar' ? '/' : pathname.startsWith('/ar/') ? pathname.slice(3) || '/' : pathname;

  const entry = pageMetaByPath[normalizedPath] ?? pageMetaByPath['/'];
  const meta = entry[language];

  return {
    title: meta.title,
    description: meta.description,
    canonical: language === 'ar' ? `/ar${normalizedPath === '/' ? '' : normalizedPath}` : normalizedPath,
  };
}

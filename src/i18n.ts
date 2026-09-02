import { useLocation } from 'react-router';

export type Language = 'en' | 'ar';

export function getLanguageFromPath(pathname: string): Language {
  return pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';
}

export function stripLanguagePrefix(pathname: string) {
  if (pathname === '/ar') {
    return '/';
  }

  return pathname.startsWith('/ar/') ? pathname.slice(3) || '/' : pathname;
}

export function localizePath(path: string, language: Language) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const cleanPath = stripLanguagePrefix(normalizedPath);

  if (language === 'ar') {
    return cleanPath === '/' ? '/ar' : `/ar${cleanPath}`;
  }

  return cleanPath;
}

export function useLanguage() {
  const location = useLocation();
  return getLanguageFromPath(location.pathname);
}

export function useLocalizedPath() {
  const language = useLanguage();
  return (path: string) => localizePath(path, language);
}

export function getAlternateLanguagePath(pathname: string) {
  const language = getLanguageFromPath(pathname);
  return localizePath(pathname, language === 'ar' ? 'en' : 'ar');
}

export const commonText = {
  en: {
    languageName: 'English',
    requestQuote: 'Request a Quote',
    exploreCapabilities: 'Explore Capabilities',
    viewFullProductRange: 'View Full Product Range',
    sendQuoteRequest: 'Send Quote Request',
    sending: 'Submitting...',
    contactUs: 'Contact Us',
    trustedBy: 'Trusted by Leading Brands',
    openMenu: 'Open navigation menu',
    closeMenu: 'Close navigation menu',
  },
  ar: {
    languageName: 'العربية',
    requestQuote: 'طلب عرض سعر',
    exploreCapabilities: 'اكتشف قدراتنا التصنيعية',
    viewFullProductRange: 'عرض جميع المنتجات',
    sendQuoteRequest: 'إرسال طلب عرض السعر',
    sending: 'جاري الإرسال...',
    contactUs: 'تواصل معنا',
    trustedBy: 'موثوق به من علامات تجارية رائدة',
    openMenu: 'فتح قائمة التنقل',
    closeMenu: 'إغلاق قائمة التنقل',
  },
} as const;

export const navigationText = {
  en: [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Capabilities', path: '/capabilities' },
    { label: 'Products', path: '/products', hasProducts: true },
    { label: 'Hospitality', path: '/hospitality' },
    { label: 'Private Label', path: '/private-label' },
    { label: 'Export', path: '/export' },
  ],
  ar: [
    { label: 'الرئيسية', path: '/' },
    { label: 'من نحن', path: '/about' },
    { label: 'قدراتنا التصنيعية', path: '/capabilities' },
    { label: 'المنتجات', path: '/products', hasProducts: true },
    { label: 'الفنادق والضيافة', path: '/hospitality' },
    { label: 'تصنيع بعلامتك التجارية', path: '/private-label' },
    { label: 'التصدير', path: '/export' },
  ],
} as const;

export const homeText = {
  en: {
    heroBadge: 'Established 1970 - Global Home Textile Manufacturing',
    heroTitle: 'Global Home Textile Manufacturing Partner Since 1970',
    heroSubtitle:
      'Elbadrawi Group is an Egyptian home textile manufacturer for hotels, retailers, distributors, private label brands, and export partners.',
    trustBar: [
      '50+ Years Textile Experience',
      'Hotel & Private Label Solutions',
      'Made in Egypt',
      'Local & International Markets',
      'Bulk Production Capabilities',
    ],
    whoLabel: 'Who we serve',
    whoTitle: 'Who We Serve',
    whoIntro:
      'We support businesses that need reliable home textile manufacturing, consistent quality, flexible specifications, and long-term supply partnerships.',
    manufacturingLabel: 'Manufacturing capabilities',
    manufacturingTitle: 'Manufacturing Capabilities Built for Business Needs',
    manufacturingIntro:
      'From material selection to final production, Elbadrawi Group supports clients with manufacturing solutions designed around quality, consistency, and commercial practicality.',
    productsLabel: 'Product range',
    productsTitle: 'Products We Manufacture',
    productsIntro:
      'Our manufacturing range covers bedding, bath textiles, filled products, mattress protection, mattresses, decorative home textiles, and complete private label collections.',
    whyLabel: 'Why Elbadrawi Group',
    whyTitle: 'Why Businesses Choose Elbadrawi Group',
    ctaTitle: "Let's Build Your Next Project",
    ctaText:
      'If you are looking for a manufacturing partner for hospitality bedding, wholesale supply, export, or private label development, our team is ready to understand your requirements and prepare a tailored quotation.',
  },
  ar: {
    heroBadge: 'تأسست عام 1970 - تصنيع منسوجات منزلية عالمي',
    heroTitle: 'شريكك في تصنيع المفروشات والمنسوجات المنزلية منذ عام 1970',
    heroSubtitle:
      'تُعد مجموعة البدراوي شركة مصرية متخصصة في تصنيع المفروشات والمنسوجات المنزلية، حيث تنتج الملايات، أغطية الألحفة، أكياس المخدات، المخدات، المراتب، الألحفة، الكومفورترات، أغطية الحماية، المناشف، البشاكير، والمزيد من المنتجات لعملاء الفنادق، التجزئة، الجملة، التصدير، والعلامات التجارية الخاصة.',
    trustBar: [
      'أكثر من 50 عامًا من الخبرة في المنسوجات',
      'حلول للفنادق والعلامات التجارية الخاصة',
      'صناعة مصرية',
      'أسواق محلية ودولية',
      'قدرات إنتاج بكميات كبيرة',
    ],
    whoLabel: 'القطاعات',
    whoTitle: 'القطاعات التي نخدمها',
    whoIntro:
      'نخدم الشركات التي تبحث عن تصنيع موثوق للمنسوجات المنزلية، بجودة ثابتة، ومواصفات مرنة، وشراكات توريد طويلة الأجل.',
    manufacturingLabel: 'قدرات التصنيع',
    manufacturingTitle: 'قدرات متكاملة في تصنيع المنسوجات المنزلية',
    manufacturingIntro:
      'من اختيار الخامات وتطوير المنتجات إلى حلول الحشو والتعبئة والإنتاج بكميات كبيرة، تقدم مجموعة البدراوي قدرات تصنيع واسعة لعملاء الـ B2B.',
    productsLabel: 'نطاق المنتجات',
    productsTitle: 'المنتجات التي نصنعها',
    productsIntro:
      'يشمل نطاق تصنيعنا المفروشات، منسوجات الحمام، المنتجات المحشوة، المراتب، منتجات الحماية، المنسوجات الديكورية، ومجموعات العلامات التجارية الخاصة.',
    whyLabel: 'لماذا مجموعة البدراوي',
    whyTitle: 'لماذا تختار الشركات مجموعة البدراوي؟',
    ctaTitle: 'هل تبحث عن شريك موثوق لتصنيع المنسوجات المنزلية؟',
    ctaText:
      'شاركنا تفاصيل مشروعك، وسيساعدك فريقنا في بناء الحل المناسب لاحتياجات شركتك، سواء كنت تعمل في الفنادق، التجزئة، الجملة، العلامات التجارية الخاصة، أو التصدير.',
  },
} as const;

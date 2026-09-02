import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Link } from 'react-router';
import { productRange } from '../../config/products';
import { getMailtoLink, siteConfig } from '../../config/site';
import { localizePath, useLanguage } from '../../i18n';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  const language = useLanguage();
  const isArabic = language === 'ar';
  const footerGroups = [
    {
      title: isArabic ? 'الشركة' : 'Company',
      links: [
        [isArabic ? 'من نحن' : 'About', '/about'],
        [isArabic ? 'قدراتنا التصنيعية' : 'Manufacturing Capabilities', '/capabilities'],
        [isArabic ? 'المنتجات' : 'Products', '/products'],
        [isArabic ? 'الجودة والتخصيص' : 'Quality & Customization', '/quality-customization'],
        [isArabic ? 'تواصل معنا' : 'Contact', '/contact'],
      ],
    },
    {
      title: isArabic ? 'الحلول' : 'Solutions',
      links: [
        [isArabic ? 'الفنادق والضيافة' : 'Hotel & Hospitality', '/hospitality'],
        [isArabic ? 'تصنيع بعلامتك التجارية' : 'Private Label Manufacturing', '/private-label'],
        [isArabic ? 'التصدير والجملة' : 'Export & Wholesale', '/export'],
        [isArabic ? 'حلول الفيبر والحشو' : 'Fiber & Filling Solutions', '/fiber-filling'],
        [isArabic ? 'طلب عرض سعر' : 'Request a Quote', '/request-a-quote'],
      ],
    },
    {
      title: isArabic ? 'المنتجات' : 'Products',
      links: productRange.map((product) => [isArabic ? product.arName : product.name, '/products']),
    },
    {
      title: isArabic ? 'تواصل' : 'Contact',
      links: [
        [`Email: ${siteConfig.contactEmail}`, '/contact'],
        [`Phone: ${siteConfig.contactPhoneDisplay}`, '/contact'],
        [`WhatsApp: ${siteConfig.whatsappDisplay}`, '/contact'],
        [`Factory: ${siteConfig.contactLocation}`, '/contact'],
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="site-container py-16 md:py-24">
        {/* Main footer content */}
        <div className="grid gap-12 md:gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          {/* Brand section */}
          <div data-reveal className="max-w-sm">
            <BrandLogo
              className="inline-flex"
              imageClassName="h-auto w-[200px] sm:w-[240px]"
              invertOnDark
            />
            <p className="mt-5 text-sm md:text-base leading-relaxed text-slate-300">
              {isArabic
                ? 'مجموعة البدراوي هي شركة مصرية متخصصة في تصنيع المفروشات والمنسوجات المنزلية لعملاء الفنادق، التجزئة، الجملة، العلامات التجارية الخاصة، الموزعين، وعملاء التصدير.'
                : 'Elbadrawi Group is an Egyptian home textile manufacturer serving hospitality groups, retailers, wholesalers, private label brands, distributors, and export clients. We manufacture fitted sheets, flat sheets, duvet covers, pillowcases, pillows, cushions, duvets, comforters, quilts, mattresses, mattress toppers, mattress protectors, pillow protectors, towels, bathmats, bathrobes, throws, blankets, bedspreads, and bed skirts.'}
            </p>
            <Link to={localizePath('/request-a-quote', language)} className="button-light mt-8 inline-flex">
              {isArabic ? 'هل تبحث عن شريك تصنيع؟ طلب عرض سعر' : 'Need a manufacturing partner? Request a Quote'}
            </Link>

            {/* Contact info */}
            <div className="mt-8 space-y-3 text-sm">
              <a
                href={getMailtoLink(siteConfig.contactEmail)}
                className="inline-flex items-center gap-3 text-slate-300 hover:text-white transition-colors duration-200"
              >
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                {siteConfig.contactEmail}
              </a>
              
              {siteConfig.contactPhoneDisplay && (
                <div className="flex items-center gap-3 text-slate-300">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                  {siteConfig.contactPhoneDisplay}
                </div>
              )}
              <div className="flex items-center gap-3 text-slate-300">
                <MessageCircle className="h-4 w-4 text-blue-400 shrink-0" />
                {siteConfig.whatsappDisplay}
              </div>
              
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{siteConfig.contactLocation}</span>
              </div>
            </div>
          </div>

          {/* Footer links groups */}
          {footerGroups.map((group) => (
            <div key={group.title} data-reveal>
              <h3 className="text-xs md:text-sm font-semibold uppercase tracking-widest text-white mb-5">
                {group.title}
              </h3>
              <ul className={group.title === 'Products' ? 'grid grid-cols-2 gap-x-4 gap-y-3' : 'space-y-3'}>
                {group.links.map(([label, path]) => (
                  <li key={`${group.title}-${label}`}>
                    <Link
                      to={localizePath(path, language)}
                      className="text-sm text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800" />

        {/* Bottom section */}
        <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs md:text-sm text-slate-500">
            Copyright © {new Date().getFullYear()} Elbadrawi Group. All Rights Reserved.
          </p>
          <div className="flex flex-col gap-2 md:gap-4 md:flex-row md:items-center md:justify-end text-xs md:text-sm text-slate-500">
            <Link to={localizePath('/privacy-policy', language)} className="hover:text-slate-300 transition-colors duration-200">
              {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <span className="hidden md:block">·</span>
            <Link to={localizePath('/terms-of-service', language)} className="hover:text-slate-300 transition-colors duration-200">
              {isArabic ? 'شروط الخدمة' : 'Terms of Service'}
            </Link>
            <span className="hidden md:block">·</span>
            <span>{isArabic ? 'تصنيع المفروشات والمنسوجات المنزلية' : 'Bedding & Home Textile Manufacturing'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

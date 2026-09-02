const fallbackContactEmail = 'info@elbadrawigroup.net';

export const siteConfig = {
  companyName: 'Elbadrawi Group',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://www.elbadrawigroup.com',
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || fallbackContactEmail,
  contactPhoneDisplay: import.meta.env.VITE_CONTACT_PHONE_DISPLAY || '+20 122 000 9093',
  contactPhoneHref: import.meta.env.VITE_CONTACT_PHONE_LINK || 'tel:+201220009093',
  whatsappDisplay: import.meta.env.VITE_WHATSAPP_DISPLAY || '+20 122 212 0109',
  whatsappHref: import.meta.env.VITE_WHATSAPP_LINK || 'https://wa.me/201222120109',
  websiteDisplay: 'www.elbadrawigroup.com',
  websiteHref: 'https://www.elbadrawigroup.com',
  contactLocation:
    import.meta.env.VITE_CONTACT_LOCATION ||
    '13041, Block 13, 1st Industrial Zone, El-Obour, Cairo, Egypt',
  factoryShortLocation: '1st Industrial Zone, El-Obour, Egypt',
  zayedOutletAddress: 'Hyper One Mall, Al Sheikh Zayed, 6th of October City, Cairo, Egypt',
  zayedOutletPhoneDisplay: '+20 123 450 7997',
  zayedOutletPhoneHref: 'tel:+201234507997',
  linkedInUrl: 'https://www.linkedin.com/company/elbadrawi-group',
  foundedYear: 1976,
} as const;

export function getMailtoLink(email: string) {
  return `mailto:${email}`;
}

export function getAbsoluteUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.siteUrl.replace(/\/$/, '')}${normalizedPath}`;
}

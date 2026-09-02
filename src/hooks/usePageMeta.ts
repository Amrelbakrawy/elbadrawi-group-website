import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getPageMeta } from '../config/pageMeta';
import { siteConfig } from '../config/site';
import { getLanguageFromPath } from '../i18n';

function upsertMetaTag(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertLinkTag(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

export function usePageMeta() {
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);
  const meta = getPageMeta(location.pathname, language);
  const canonicalUrl = `${siteConfig.siteUrl.replace(/\/$/, '')}${meta.canonical}`;

  useEffect(() => {
    document.title = meta.title;
    upsertMetaTag('name', 'description', meta.description);
    upsertMetaTag('property', 'og:title', meta.title);
    upsertMetaTag('property', 'og:description', meta.description);
    upsertMetaTag('property', 'og:url', canonicalUrl);
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:site_name', siteConfig.companyName);
    upsertMetaTag('property', 'og:locale', language === 'ar' ? 'ar_EG' : 'en_US');
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:title', meta.title);
    upsertMetaTag('name', 'twitter:description', meta.description);
    upsertLinkTag('canonical', canonicalUrl);
  }, [canonicalUrl, language, meta.description, meta.title]);
}

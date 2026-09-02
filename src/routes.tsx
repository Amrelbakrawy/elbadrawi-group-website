import type { ComponentType } from 'react';
import { createBrowserRouter } from 'react-router';
import { PageShell } from './components/layout/PageShell';

function lazyRoute<
  TModule extends Record<string, ComponentType>,
  TKey extends keyof TModule,
>(importer: () => Promise<TModule>, exportName: TKey) {
  return async () => {
    const module = await importer();
    return { Component: module[exportName] };
  };
}

const loadHome = lazyRoute(() => import('./pages/Home'), 'Home');
const loadAbout = lazyRoute(() => import('./pages/About'), 'About');
const loadCapabilities = lazyRoute(() => import('./pages/Capabilities'), 'CapabilitiesPage');
const loadProducts = lazyRoute(() => import('./pages/Products'), 'Products');
const loadIndustries = lazyRoute(() => import('./pages/Industries'), 'Industries');
const loadIndustryDetail = lazyRoute(() => import('./pages/IndustryDetail'), 'IndustryDetail');
const loadPrivateLabel = lazyRoute(() => import('./pages/PrivateLabel'), 'PrivateLabel');
const loadHospitality = lazyRoute(() => import('./pages/Hospitality'), 'Hospitality');
const loadWholesale = lazyRoute(() => import('./pages/Wholesale'), 'Wholesale');
const loadManufacturing = lazyRoute(() => import('./pages/Manufacturing'), 'Manufacturing');
const loadExport = lazyRoute(() => import('./pages/Export'), 'Export');
const loadFiberFilling = lazyRoute(() => import('./pages/FiberFilling'), 'FiberFilling');
const loadQualityCustomization = lazyRoute(
  () => import('./pages/QualityCustomization'),
  'QualityCustomization',
);
const loadRequestQuote = lazyRoute(() => import('./pages/RequestQuote'), 'RequestQuote');
const loadAdminLogin = lazyRoute(() => import('./pages/AdminLogin'), 'AdminLogin');
const loadContact = lazyRoute(() => import('./pages/Contact'), 'Contact');
const loadPrivacyPolicy = lazyRoute(() => import('./pages/PrivacyPolicy'), 'PrivacyPolicy');
const loadTermsOfService = lazyRoute(() => import('./pages/TermsOfService'), 'TermsOfService');
const loadNotFound = lazyRoute(() => import('./pages/NotFound'), 'NotFound');

async function loadAdminSubmissions() {
  const [{ AdminRoute }, { AdminSubmissions }] = await Promise.all([
    import('./components/auth/AdminRoute'),
    import('./pages/AdminSubmissions'),
  ]);

  return {
    Component: () => (
      <AdminRoute>
        <AdminSubmissions />
      </AdminRoute>
    ),
  };
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: PageShell,
    children: [
      { index: true, lazy: loadHome },
      { path: 'about', lazy: loadAbout },
      { path: 'capabilities', lazy: loadCapabilities },
      { path: 'products', lazy: loadProducts },
      { path: 'industries', lazy: loadIndustries },
      { path: 'industries/:slug', lazy: loadIndustryDetail },
      { path: 'private-label', lazy: loadPrivateLabel },
      { path: 'hospitality', lazy: loadHospitality },
      { path: 'wholesale', lazy: loadWholesale },
      { path: 'manufacturing', lazy: loadManufacturing },
      { path: 'export', lazy: loadExport },
      { path: 'fiber-filling', lazy: loadFiberFilling },
      { path: 'quality-customization', lazy: loadQualityCustomization },
      { path: 'request-quote', lazy: loadRequestQuote },
      { path: 'request-a-quote', lazy: loadRequestQuote },
      { path: 'admin/submissions', lazy: loadAdminSubmissions },
      { path: 'admin/login', lazy: loadAdminLogin },
      { path: 'contact', lazy: loadContact },
      { path: 'privacy-policy', lazy: loadPrivacyPolicy },
      { path: 'terms-of-service', lazy: loadTermsOfService },
      { path: 'ar', lazy: loadHome },
      { path: 'ar/about', lazy: loadAbout },
      { path: 'ar/capabilities', lazy: loadCapabilities },
      { path: 'ar/products', lazy: loadProducts },
      { path: 'ar/hospitality', lazy: loadHospitality },
      { path: 'ar/private-label', lazy: loadPrivateLabel },
      { path: 'ar/export', lazy: loadExport },
      { path: 'ar/fiber-filling', lazy: loadFiberFilling },
      { path: 'ar/quality-customization', lazy: loadQualityCustomization },
      { path: 'ar/request-quote', lazy: loadRequestQuote },
      { path: 'ar/request-a-quote', lazy: loadRequestQuote },
      { path: 'ar/contact', lazy: loadContact },
      { path: 'ar/privacy-policy', lazy: loadPrivacyPolicy },
      { path: 'ar/terms-of-service', lazy: loadTermsOfService },
      { path: '*', lazy: loadNotFound },
    ],
  },
]);

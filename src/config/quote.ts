import { arProductNames, productNames } from './products';

export const BUSINESS_TYPES = [
  'Hotel / Resort',
  'Retailer',
  'Distributor / Wholesaler',
  'Private Label Brand',
  'Airbnb / Serviced Apartments',
  'Importer',
  'E-commerce Brand',
  'Other',
];

export const PRODUCT_CATEGORIES = [...productNames, 'Full Collection'];
export const AR_PRODUCT_CATEGORIES = [...arProductNames, 'مجموعة كاملة'];

export const QUANTITY_OPTIONS = [
  { value: 'small-trial-order', label: 'Small trial order' },
  { value: 'medium-quantity', label: 'Medium quantity' },
  { value: 'bulk-order', label: 'Bulk order' },
  { value: 'ongoing-supply', label: 'Ongoing supply' },
  { value: 'not-sure-yet', label: 'Not sure yet' },
];

export const AR_BUSINESS_TYPES = [
  'فندق / منتجع',
  'تاجر تجزئة',
  'موزع / تاجر جملة',
  'علامة تجارية خاصة',
  'شقق فندقية / إيجارات قصيرة الأجل',
  'مستورد',
  'علامة تجارة إلكترونية',
  'أخرى',
];

export const AR_QUANTITY_OPTIONS = [
  { value: 'small-trial-order', label: 'طلب تجريبي صغير' },
  { value: 'medium-quantity', label: 'كمية متوسطة' },
  { value: 'bulk-order', label: 'طلب كبير' },
  { value: 'ongoing-supply', label: 'توريد مستمر' },
  { value: 'not-sure-yet', label: 'غير محدد بعد' },
];

export const TARGET_MARKET_OPTIONS = [
  { value: 'premium', label: 'Premium' },
  { value: 'mid-range', label: 'Mid-range' },
  { value: 'cost-effective', label: 'Cost-effective' },
  { value: 'hospitality-commercial', label: 'Hospitality / Commercial' },
  { value: 'not-sure-yet', label: 'Not sure yet' },
];

export const AR_TARGET_MARKET_OPTIONS = [
  { value: 'premium', label: 'فاخر' },
  { value: 'mid-range', label: 'متوسط' },
  { value: 'cost-effective', label: 'اقتصادي' },
  { value: 'hospitality-commercial', label: 'فندقي / تجاري' },
  { value: 'not-sure-yet', label: 'غير محدد بعد' },
];

export const TIMELINE_OPTIONS = [
  { value: 'within-1-month', label: 'Within 1 month' },
  { value: '1-3-months', label: '1 to 3 months' },
  { value: '3-plus-months', label: '3+ months' },
  { value: 'exploring', label: 'Exploring options' },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[0-9+()\-\s]{7,40}$/;

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

export const PRODUCT_CATEGORIES = [
  'Fitted Sheets',
  'Flat Sheets',
  'Duvet Covers',
  'Pillowcases',
  'Pillows & Cushions',
  'Duvets',
  'Comforters',
  'Quilts',
  'Mattresses',
  'Mattress Toppers',
  'Mattress Protectors',
  'Pillow Protectors',
  'Towels',
  'Bathmats',
  'Bathrobes',
  'Throws',
  'Blankets',
  'Bedspreads',
  'Bed Skirts',
  'Full Collection',
];

export const QUANTITY_OPTIONS = [
  'small-trial-order',
  'medium-quantity',
  'bulk-order',
  'ongoing-supply',
  'not-sure-yet',
];
export const TIMELINE_OPTIONS = ['within-1-month', '1-3-months', '3-plus-months', 'exploring'];

export function createValidationError(fieldErrors, message = 'Validation failed') {
  const error = new Error(message);
  error.name = 'ValidationError';
  error.fieldErrors = fieldErrors;
  return error;
}

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function normalizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeOptionalString(value) {
  const normalized = normalizeString(value);
  return normalized || undefined;
}

function addError(fieldErrors, field, message) {
  if (!fieldErrors[field]) {
    fieldErrors[field] = message;
  }
}

function validateRequiredString(fieldErrors, field, value, { minLength = 1, maxLength }) {
  if (!value) {
    addError(fieldErrors, field, 'This field is required.');
    return;
  }

  if (value.length < minLength) {
    addError(fieldErrors, field, `Must be at least ${minLength} characters.`);
  }

  if (maxLength && value.length > maxLength) {
    addError(fieldErrors, field, `Must be ${maxLength} characters or fewer.`);
  }
}

function validateOptionalString(fieldErrors, field, value, { maxLength }) {
  if (!value) {
    return;
  }

  if (maxLength && value.length > maxLength) {
    addError(fieldErrors, field, `Must be ${maxLength} characters or fewer.`);
  }
}

function validateEnum(fieldErrors, field, value, allowedValues) {
  if (!value) {
    return;
  }

  if (!allowedValues.includes(value)) {
    addError(fieldErrors, field, 'Select a valid option.');
  }
}

function validateProductSelection(fieldErrors, field, value) {
  if (!value) {
    return;
  }

  const selectedProducts = value
    .split(',')
    .map((product) => product.trim())
    .filter(Boolean);

  if (selectedProducts.length === 0 || selectedProducts.some((product) => !PRODUCT_CATEGORIES.includes(product))) {
    addError(fieldErrors, field, 'Select valid product options.');
  }
}

export function validateQuotePayload(payload) {
  if (!isPlainObject(payload)) {
    throw createValidationError({ form: 'Request body must be a JSON object.' }, 'Invalid request body');
  }

  const normalized = {
    name: normalizeString(payload.name),
    company: normalizeString(payload.company),
    email: normalizeString(payload.email),
    phone: normalizeOptionalString(payload.phone),
    country: normalizeOptionalString(payload.country),
    website: normalizeOptionalString(payload.website),
    businessType: normalizeString(payload.businessType),
    productCategory: normalizeString(payload.productCategory),
    quantity: normalizeString(payload.quantity),
    targetMarket: normalizeOptionalString(payload.targetMarket),
    materials: normalizeOptionalString(payload.materials),
    sizes: normalizeOptionalString(payload.sizes),
    branding: normalizeOptionalString(payload.branding),
    packaging: normalizeOptionalString(payload.packaging),
    timeline: normalizeOptionalString(payload.timeline),
    customization: normalizeOptionalString(payload.customization),
    message: normalizeString(payload.message),
  };

  const fieldErrors = {};

  validateRequiredString(fieldErrors, 'name', normalized.name, { minLength: 2, maxLength: 120 });
  validateRequiredString(fieldErrors, 'company', normalized.company, {
    minLength: 2,
    maxLength: 160,
  });
  validateRequiredString(fieldErrors, 'email', normalized.email, { minLength: 6, maxLength: 160 });
  validateRequiredString(fieldErrors, 'businessType', normalized.businessType, {
    minLength: 2,
    maxLength: 80,
  });
  validateRequiredString(fieldErrors, 'productCategory', normalized.productCategory, {
    minLength: 2,
    maxLength: 500,
  });
  validateRequiredString(fieldErrors, 'quantity', normalized.quantity, {
    minLength: 2,
    maxLength: 40,
  });
  validateRequiredString(fieldErrors, 'message', normalized.message, {
    minLength: 10,
    maxLength: 3000,
  });

  validateOptionalString(fieldErrors, 'phone', normalized.phone, { maxLength: 40 });
  validateOptionalString(fieldErrors, 'country', normalized.country, { maxLength: 80 });
  validateOptionalString(fieldErrors, 'website', normalized.website, { maxLength: 200 });
  validateOptionalString(fieldErrors, 'timeline', normalized.timeline, { maxLength: 40 });
  validateOptionalString(fieldErrors, 'targetMarket', normalized.targetMarket, { maxLength: 120 });
  validateOptionalString(fieldErrors, 'materials', normalized.materials, { maxLength: 500 });
  validateOptionalString(fieldErrors, 'sizes', normalized.sizes, { maxLength: 500 });
  validateOptionalString(fieldErrors, 'branding', normalized.branding, { maxLength: 20 });
  validateOptionalString(fieldErrors, 'packaging', normalized.packaging, { maxLength: 20 });
  validateOptionalString(fieldErrors, 'customization', normalized.customization, {
    maxLength: 1500,
  });

  if (normalized.email && !EMAIL_PATTERN.test(normalized.email)) {
    addError(fieldErrors, 'email', 'Enter a valid email address.');
  }

  if (normalized.phone && !PHONE_PATTERN.test(normalized.phone)) {
    addError(fieldErrors, 'phone', 'Enter a valid phone number.');
  }

  validateEnum(fieldErrors, 'businessType', normalized.businessType, BUSINESS_TYPES);
  validateProductSelection(fieldErrors, 'productCategory', normalized.productCategory);
  validateEnum(fieldErrors, 'quantity', normalized.quantity, QUANTITY_OPTIONS);
  validateEnum(fieldErrors, 'timeline', normalized.timeline, TIMELINE_OPTIONS);

  if (Object.keys(fieldErrors).length > 0) {
    throw createValidationError(fieldErrors);
  }

  return normalized;
}

export function validateAdminLoginPayload(payload) {
  if (!isPlainObject(payload)) {
    throw createValidationError({ form: 'Request body must be a JSON object.' }, 'Invalid request body');
  }

  const normalized = {
    username: normalizeString(payload.username),
    password: normalizeString(payload.password),
  };
  const fieldErrors = {};

  validateRequiredString(fieldErrors, 'username', normalized.username, {
    minLength: 3,
    maxLength: 80,
  });
  validateRequiredString(fieldErrors, 'password', normalized.password, {
    minLength: 8,
    maxLength: 200,
  });

  if (Object.keys(fieldErrors).length > 0) {
    throw createValidationError(fieldErrors);
  }

  return normalized;
}

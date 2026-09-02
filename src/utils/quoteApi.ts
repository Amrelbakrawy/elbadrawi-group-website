import { clearAdminSessionToken, getAdminSessionToken } from './adminSession';

export interface QuoteSubmission {
  id?: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  country?: string;
  website?: string;
  businessType: string;
  productCategory: string;
  quantity: string;
  targetMarket?: string;
  materials?: string;
  sizes?: string;
  branding?: string;
  packaging?: string;
  timeline?: string;
  customization?: string;
  message: string;
  submittedAt: string;
}

export interface QuoteFieldErrors {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  country?: string;
  website?: string;
  businessType?: string;
  productCategory?: string;
  quantity?: string;
  targetMarket?: string;
  materials?: string;
  sizes?: string;
  branding?: string;
  packaging?: string;
  timeline?: string;
  customization?: string;
  message?: string;
  form?: string;
}

export interface QuoteSubmitResult {
  ok: boolean;
  saved: boolean;
  emailSent: boolean;
  message: string;
  status: number;
  fieldErrors?: QuoteFieldErrors;
}

export class QuoteApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'QuoteApiError';
    this.status = status;
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

async function parseResponse(response: Response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function submitQuote(formData: FormData): Promise<QuoteSubmitResult> {
  try {
    const submission: QuoteSubmission = {
      name: normalizeRequiredValue(formData.get('name')),
      company: normalizeRequiredValue(formData.get('company')),
      email: normalizeRequiredValue(formData.get('email')),
      phone: normalizeOptionalValue(formData.get('phone')),
      country: normalizeOptionalValue(formData.get('country')),
      website: normalizeOptionalValue(formData.get('website')),
      businessType: normalizeRequiredValue(formData.get('businessType')),
      productCategory: normalizeRequiredValue(formData.get('productCategory')),
      quantity: normalizeRequiredValue(formData.get('quantity')),
      targetMarket: normalizeOptionalValue(formData.get('targetMarket')),
      materials: normalizeOptionalValue(formData.get('materials')),
      sizes: normalizeOptionalValue(formData.get('sizes')),
      branding: normalizeOptionalValue(formData.get('branding')),
      packaging: normalizeOptionalValue(formData.get('packaging')),
      timeline: normalizeOptionalValue(formData.get('timeline')),
      customization: normalizeOptionalValue(formData.get('customization')),
      message: normalizeRequiredValue(formData.get('message')),
      submittedAt: new Date().toISOString(),
    };

    const response = await fetch(`${API_BASE_URL}/api/quotes/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission),
    });

    const result = await parseResponse(response);

    if (!response.ok) {
      return {
        ok: false,
        saved: false,
        emailSent: false,
        message: result?.error || 'Failed to submit quote. Please try again.',
        status: response.status,
        fieldErrors: result?.fieldErrors,
      };
    }

    saveSubmissionLocally(result.submission ?? submission);

    return {
      ok: true,
      saved: true,
      emailSent: Boolean(result?.emailSent),
      message:
        result?.message ||
        (result?.emailSent
          ? 'Quote submitted successfully.'
          : 'Quote submitted and saved successfully.'),
      status: response.status,
    };
  } catch (error) {
    console.error('Quote submission error:', error);
    return {
      ok: false,
      saved: false,
      emailSent: false,
      message: 'We could not reach our server. Please check your connection and try again.',
      status: 0,
    };
  }
}

export async function getSubmissions(): Promise<QuoteSubmission[]> {
  try {
    const token = getAdminSessionToken();
    const responseWithAuth = await fetch(`${API_BASE_URL}/api/quotes/submissions`, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const result = await parseResponse(responseWithAuth);

    if (!responseWithAuth.ok) {
      if (responseWithAuth.status === 401) {
        clearAdminSessionToken();
      }
      throw new QuoteApiError(result?.error || 'Failed to load submissions', responseWithAuth.status);
    }

    const submissions = Array.isArray(result.submissions) ? result.submissions : [];
    localStorage.setItem('quoteSubmissions', JSON.stringify(submissions));
    return submissions;
  } catch (error) {
    if (error instanceof QuoteApiError && error.status === 401) {
      throw error;
    }
    console.error('Failed to load submissions from API:', error);
    return getLocalSubmissions();
  }
}

export async function deleteSubmission(submissionId: string): Promise<boolean> {
  try {
    const token = getAdminSessionToken();
    const response = await fetch(`${API_BASE_URL}/api/quotes/submissions/${submissionId}`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const result = await parseResponse(response);

    if (!response.ok) {
      if (response.status === 401) {
        clearAdminSessionToken();
      }
      throw new QuoteApiError(result?.error || 'Failed to delete submission', response.status);
    }

    return true;
  } catch (error) {
    if (error instanceof QuoteApiError && error.status === 401) {
      throw error;
    }
    console.error('Failed to delete submission:', error);
    return false;
  }
}

export async function clearSubmissions(): Promise<boolean> {
  try {
    const token = getAdminSessionToken();
    const response = await fetch(`${API_BASE_URL}/api/quotes/submissions`, {
      method: 'DELETE',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
    const result = await parseResponse(response);

    if (!response.ok) {
      if (response.status === 401) {
        clearAdminSessionToken();
      }
      throw new QuoteApiError(result?.error || 'Failed to clear submissions', response.status);
    }

    localStorage.removeItem('quoteSubmissions');
    return true;
  } catch (error) {
    if (error instanceof QuoteApiError && error.status === 401) {
      throw error;
    }
    console.error('Failed to clear submissions:', error);
    return false;
  }
}

function saveSubmissionLocally(submission: QuoteSubmission): void {
  try {
    const submissions = JSON.parse(localStorage.getItem('quoteSubmissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('quoteSubmissions', JSON.stringify(submissions));
  } catch (error) {
    console.error('Failed to save submission locally:', error);
  }
}

function getLocalSubmissions(): QuoteSubmission[] {
  try {
    return JSON.parse(localStorage.getItem('quoteSubmissions') || '[]');
  } catch {
    return [];
  }
}

function normalizeRequiredValue(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeOptionalValue(value: FormDataEntryValue | null): string | undefined {
  const normalized = typeof value === 'string' ? value.trim() : '';
  return normalized || undefined;
}

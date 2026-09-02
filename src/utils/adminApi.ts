import { clearAdminSessionToken, getAdminSessionToken, setAdminSessionToken } from './adminSession';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'AdminApiError';
    this.status = status;
  }
}

function getAuthHeaders() {
  const token = getAdminSessionToken();

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

async function parseJsonResponse(response: Response) {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function loginAdmin(username: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await parseJsonResponse(response);

  if (!response.ok) {
    throw new AdminApiError(result?.error || 'Login failed', response.status);
  }

  if (typeof result?.token !== 'string') {
    throw new AdminApiError('Login token was not returned', 500);
  }

  setAdminSessionToken(result.token);
  return result;
}

export async function getAdminSession() {
  const response = await fetch(`${API_BASE_URL}/api/admin/session`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  const result = await parseJsonResponse(response);

  if (!response.ok) {
    if (response.status === 401) {
      clearAdminSessionToken();
    }
    throw new AdminApiError(result?.error || 'Failed to validate admin session', response.status);
  }

  return result;
}

export function logoutAdmin() {
  clearAdminSessionToken();
}

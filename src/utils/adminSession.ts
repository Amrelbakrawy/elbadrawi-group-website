const ADMIN_TOKEN_STORAGE_KEY = 'adminSessionToken';

export function getAdminSessionToken() {
  return sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
}

export function setAdminSessionToken(token: string) {
  sessionStorage.setItem(ADMIN_TOKEN_STORAGE_KEY, token);
}

export function clearAdminSessionToken() {
  sessionStorage.removeItem(ADMIN_TOKEN_STORAGE_KEY);
}

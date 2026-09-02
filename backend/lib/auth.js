import { createHmac, timingSafeEqual } from 'crypto';

function encodeBase64Url(value) {
  return Buffer.from(value).toString('base64url');
}

function decodeBase64Url(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function getAdminAuthConfig() {
  return {
    username: process.env.ADMIN_USERNAME || '',
    password: process.env.ADMIN_PASSWORD || '',
    sessionSecret: process.env.ADMIN_SESSION_SECRET || '',
    tokenTtlMs: Number(process.env.ADMIN_TOKEN_TTL_HOURS || 12) * 60 * 60 * 1000,
  };
}

export function isAdminAuthConfigured() {
  const config = getAdminAuthConfig();
  return Boolean(config.username && config.password && config.sessionSecret);
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function signPayload(encodedPayload, sessionSecret) {
  return createHmac('sha256', sessionSecret).update(encodedPayload).digest('base64url');
}

export function createAdminSessionToken() {
  const config = getAdminAuthConfig();
  const payload = {
    sub: config.username,
    role: 'admin',
    exp: Date.now() + config.tokenTtlMs,
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload, config.sessionSecret);

  return {
    token: `${encodedPayload}.${signature}`,
    expiresAt: payload.exp,
  };
}

export function verifyAdminSessionToken(token) {
  if (!token || typeof token !== 'string') {
    return null;
  }

  const config = getAdminAuthConfig();
  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature || !config.sessionSecret) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload, config.sessionSecret);
  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload));
    if (!payload?.exp || Date.now() > payload.exp || payload.role !== 'admin') {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function authenticateAdminCredentials(username, password) {
  const config = getAdminAuthConfig();

  return safeEqual(username, config.username) && safeEqual(password, config.password);
}

export function extractAdminTokenFromRequest(req) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return null;
  }

  return header.slice('Bearer '.length).trim();
}

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { Resend } from 'resend';
import { fileURLToPath, pathToFileURL } from 'url';
import { randomUUID } from 'crypto';
import {
  authenticateAdminCredentials,
  createAdminSessionToken,
  extractAdminTokenFromRequest,
  isAdminAuthConfigured,
  verifyAdminSessionToken,
} from './lib/auth.js';
import { logError, logInfo, logWarn } from './lib/logger.js';
import { createRateLimiter } from './lib/rate-limit.js';
import {
  createValidationError,
  validateAdminLoginPayload,
  validateQuotePayload,
} from './lib/validation.js';
import { createSubmissionStore } from './storage/submission-store.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

export const app = express();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
let emailClient = resend;
let submissionsStore = createSubmissionStore();
const allowedOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const quoteSubmissionRateLimiter = createRateLimiter({
  windowMs: Number(process.env.QUOTE_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  maxRequests: Number(process.env.QUOTE_RATE_LIMIT_MAX_REQUESTS || 5),
  keyPrefix: 'quote-submit',
  message: 'Too many quote requests. Please wait and try again.',
});
const adminLoginRateLimiter = createRateLimiter({
  windowMs: Number(process.env.ADMIN_LOGIN_RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
  maxRequests: Number(process.env.ADMIN_LOGIN_RATE_LIMIT_MAX_REQUESTS || 10),
  keyPrefix: 'admin-login',
  message: 'Too many login attempts. Please wait and try again.',
});

app.disable('x-powered-by');
app.set('trust proxy', process.env.TRUST_PROXY === 'true' ? 1 : 0);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Origin not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
  }),
);
app.use(express.json({ limit: process.env.JSON_BODY_LIMIT || '24kb' }));

function requireJsonContent(req, res, next) {
  if (!req.is('application/json')) {
    return res.status(415).json({
      success: false,
      error: 'Content-Type must be application/json',
    });
  }

  next();
}

function requireAdminAuth(req, res, next) {
  if (!isAdminAuthConfigured()) {
    return res.status(503).json({
      success: false,
      error: 'Admin authentication is not configured',
    });
  }

  const token = extractAdminTokenFromRequest(req);
  const session = verifyAdminSessionToken(token);

  if (!session) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
    });
  }

  req.adminSession = session;
  next();
}

function methodNotAllowed(allowedMethods) {
  return (_req, res) => {
    res.setHeader('Allow', allowedMethods.join(', '));
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
    });
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.post('/api/admin/login', requireJsonContent, adminLoginRateLimiter, async (req, res) => {
  try {
    if (!isAdminAuthConfigured()) {
      return res.status(503).json({
        success: false,
        error: 'Admin authentication is not configured',
      });
    }

    const credentials = validateAdminLoginPayload(req.body);
    const isAuthenticated = authenticateAdminCredentials(
      credentials.username,
      credentials.password,
    );

    if (!isAuthenticated) {
      return res.status(401).json({
        success: false,
        error: 'Invalid username or password',
      });
    }

    const session = createAdminSessionToken();

    return res.json({
      success: true,
      token: session.token,
      expiresAt: session.expiresAt,
    });
  } catch (error) {
    if (error?.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message,
        fieldErrors: error.fieldErrors,
      });
    }

    logError('admin.login_failed', { message: error instanceof Error ? error.message : 'Unknown error' });
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

app.get('/api/admin/session', requireAdminAuth, (req, res) => {
  return res.json({
    success: true,
    user: {
      username: req.adminSession.sub,
      role: req.adminSession.role,
      expiresAt: req.adminSession.exp,
    },
  });
});

app.get('/api/quotes/submissions', requireAdminAuth, async (_req, res) => {
  try {
    const submissions = await submissionsStore.list();
    return res.json({ success: true, submissions });
  } catch (error) {
    logError('quotes.list_failed', { message: error instanceof Error ? error.message : 'Unknown error' });
    return res.status(500).json({ success: false, error: 'Failed to load submissions' });
  }
});

app.post('/api/quotes/submit', requireJsonContent, quoteSubmissionRateLimiter, async (req, res) => {
  try {
    const result = await processQuoteSubmission(req.body);
    return res.json({
      success: true,
      message: result.emailSent
        ? 'Quote submitted successfully'
        : 'Quote submitted and saved successfully',
      emailSent: result.emailSent,
      submission: result.submission,
    });
  } catch (error) {
    if (error?.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: error.message,
        fieldErrors: error.fieldErrors,
      });
    }
    logError('quotes.submit_failed', { message: error instanceof Error ? error.message : 'Unknown error' });
    return res.status(500).json({
      success: false,
      error: 'Server error',
    });
  }
});

app.delete('/api/quotes/submissions/:id', requireAdminAuth, async (req, res) => {
  try {
    const deleted = await submissionsStore.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Submission not found' });
    }

    return res.json({ success: true });
  } catch (error) {
    logError('quotes.delete_failed', {
      submissionId: req.params.id,
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return res.status(500).json({ success: false, error: 'Failed to delete submission' });
  }
});

app.delete('/api/quotes/submissions', requireAdminAuth, async (_req, res) => {
  try {
    await submissionsStore.clear();
    return res.json({ success: true });
  } catch (error) {
    logError('quotes.clear_failed', { message: error instanceof Error ? error.message : 'Unknown error' });
    return res.status(500).json({ success: false, error: 'Failed to clear submissions' });
  }
});

app.all('/api/admin/login', methodNotAllowed(['POST']));
app.all('/api/admin/session', methodNotAllowed(['GET']));
app.all('/api/quotes/submit', methodNotAllowed(['POST']));
app.all('/api/quotes/submissions', methodNotAllowed(['GET', 'DELETE']));
app.all('/api/quotes/submissions/:id', methodNotAllowed(['DELETE']));

export async function processQuoteSubmission(payload) {
  const validatedPayload = validateQuotePayload(payload);
  const submission = {
    id: randomUUID(),
    ...validatedPayload,
    submittedAt: new Date().toISOString(),
  };

  await submissionsStore.create(submission);

  let emailSent = false;
  let emailError = null;

  if (emailClient && process.env.ADMIN_EMAIL) {
    try {
      const emailHTML = generateEmailHTML(submission);
      const result = await emailClient.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        to: process.env.ADMIN_EMAIL,
        subject: `New Quote Request from ${submission.name}`,
        html: emailHTML,
      });

      if (result.error) {
        emailError = result.error.message || 'Email delivery failed';
        logError('quotes.email_failed', {
          submissionId: submission.id,
          message: emailError,
        });
      } else {
        emailSent = true;
        logInfo('quotes.email_sent', {
          submissionId: submission.id,
          emailId: result.data?.id,
        });
      }
    } catch (error) {
      emailError = error instanceof Error ? error.message : 'Email delivery failed';
      logError('quotes.email_failed', {
        submissionId: submission.id,
        message: emailError,
      });
    }
  } else {
    emailError = 'Email delivery is not configured';
    logWarn('quotes.email_not_configured', {
      submissionId: submission.id,
    });
  }

  return {
    submission,
    emailSent,
    emailError,
  };
}

export async function getStoredSubmissions() {
  return submissionsStore.list();
}

export async function deleteStoredSubmission(submissionId) {
  return submissionsStore.delete(submissionId);
}

export async function clearStoredSubmissions() {
  await submissionsStore.clear();
}

export function setEmailClientForTesting(client) {
  emailClient = client;
}

export function setSubmissionStoreForTesting(store) {
  submissionsStore = store;
}

function generateEmailHTML(submission) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Quote Request Received</h2>

      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(submission.company)}</p>
      <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
      ${submission.phone ? `<p><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>` : ''}
      ${submission.country ? `<p><strong>Country:</strong> ${escapeHtml(submission.country)}</p>` : ''}
      ${submission.website ? `<p><strong>Company Website:</strong> ${escapeHtml(submission.website)}</p>` : ''}

      <h3>Project Details</h3>
      <p><strong>Business Type:</strong> ${escapeHtml(submission.businessType)}</p>
      <p><strong>Products Interested In:</strong> ${escapeHtml(submission.productCategory)}</p>
      <p><strong>Estimated Quantity:</strong> ${escapeHtml(submission.quantity)}</p>
      ${submission.targetMarket ? `<p><strong>Target Market:</strong> ${escapeHtml(submission.targetMarket)}</p>` : ''}
      ${submission.materials ? `<p><strong>Preferred Materials:</strong> ${escapeHtml(submission.materials)}</p>` : ''}
      ${submission.sizes ? `<p><strong>Required Sizes:</strong> ${escapeHtml(submission.sizes)}</p>` : ''}
      ${submission.branding ? `<p><strong>Branding Needed:</strong> ${escapeHtml(submission.branding)}</p>` : ''}
      ${submission.packaging ? `<p><strong>Packaging Needed:</strong> ${escapeHtml(submission.packaging)}</p>` : ''}
      ${submission.timeline ? `<p><strong>Timeline:</strong> ${escapeHtml(submission.timeline)}</p>` : ''}

      <h3>Project Message</h3>
      <p>${escapeHtml(submission.message).replace(/\n/g, '<br>')}</p>

      ${
        submission.customization
          ? `
      <h3>Customization Requirements</h3>
      <p>${escapeHtml(submission.customization).replace(/\n/g, '<br>')}</p>
      `
          : ''
      }

      <p style="color: #666; font-size: 12px; margin-top: 20px;">
        Submitted on: ${new Date(submission.submittedAt).toLocaleString()}
      </p>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const staticDir = process.env.STATIC_DIR || path.join(__dirname, '..', 'dist');

app.use(express.static(staticDir));

app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      error: 'API route not found',
    });
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return next();
  }

  return res.sendFile(path.join(staticDir, 'index.html'), (error) => {
    if (error) {
      next(error);
    }
  });
});

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Malformed JSON request body',
    });
  }

  if (err?.message === 'Origin not allowed by CORS') {
    return res.status(403).json({
      success: false,
      error: 'Origin not allowed',
    });
  }

  if (err?.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: err.message,
      fieldErrors: err.fieldErrors,
    });
  }

  logError('server.unhandled_error', {
    message: err instanceof Error ? err.message : 'Unknown error',
  });
  res.status(500).json({
    success: false,
    error: 'Internal server error',
  });
});

const PORT = process.env.PORT || 3000;

export async function startServer() {
  await submissionsStore.ensureStorage();
  return app.listen(PORT, () => {
    logInfo('server.started', {
      port: PORT,
      allowedOrigins,
      adminEmail: process.env.ADMIN_EMAIL || null,
      quotesStorageDriver: process.env.QUOTES_STORAGE_DRIVER || 'file',
      quotesStoragePath: process.env.QUOTES_STORAGE_PATH || path.join(__dirname, 'runtime', 'quotes.json'),
    });
    if (!process.env.RESEND_API_KEY) {
      logWarn('quotes.email_not_configured_global', {
        message: 'RESEND_API_KEY is not set. Submissions will still be saved, but email notifications are disabled.',
      });
    }

    if (!isAdminAuthConfigured()) {
      logWarn('admin.auth_not_configured', {
        message: 'ADMIN_USERNAME, ADMIN_PASSWORD, or ADMIN_SESSION_SECRET is missing.',
      });
    }
  });
}

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isDirectRun) {
  startServer().catch((error) => {
    console.error('Failed to initialize storage:', error);
    process.exit(1);
  });
}

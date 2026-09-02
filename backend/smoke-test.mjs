import { promises as fs } from 'fs';
import path from 'path';
import { tmpdir } from 'os';

process.env.RESEND_API_KEY = '';
process.env.ADMIN_EMAIL = '';
process.env.PORT = process.env.PORT || '3000';
process.env.ADMIN_USERNAME = 'admin';
process.env.ADMIN_PASSWORD = 'strong-password';
process.env.ADMIN_SESSION_SECRET = 'smoke-test-secret';
process.env.QUOTES_STORAGE_PATH = path.join(tmpdir(), 'elbadrawi-quotes-smoke-test.json');

const quotesPath = process.env.QUOTES_STORAGE_PATH;
const originalQuotes = await fs.readFile(quotesPath, 'utf8').catch(() => '[]');

const {
  clearStoredSubmissions,
  deleteStoredSubmission,
  getStoredSubmissions,
  processQuoteSubmission,
  setEmailClientForTesting,
  setSubmissionStoreForTesting,
} = await import('./server.js');
const {
  authenticateAdminCredentials,
  createAdminSessionToken,
  verifyAdminSessionToken,
} = await import('./lib/auth.js');
const { createSubmissionStore } = await import('./storage/submission-store.js');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

try {
  const initialList = await getStoredSubmissions();
  assert(Array.isArray(initialList), 'Stored submissions should be an array');
  assert(initialList.length === 0, 'Smoke test should start with an empty stored submissions list');

  assert(
    authenticateAdminCredentials('admin', 'strong-password') === true,
    'Admin credentials should validate',
  );
  assert(
    authenticateAdminCredentials('admin', 'wrong-password') === false,
    'Invalid admin credentials should fail',
  );

  const session = createAdminSessionToken();
  assert(typeof session.token === 'string', 'Admin session token should be created');
  assert(Boolean(verifyAdminSessionToken(session.token)), 'Admin session token should verify');

  const submitValid = await processQuoteSubmission({
      name: '  Smoke Test Buyer  ',
      company: '  Example Hospitality  ',
      email: '  buyer@example.com  ',
      phone: '  123456789  ',
      businessType: 'Hotel / Resort',
      productCategory: 'Fitted Sheets',
      quantity: 'bulk-order',
      timeline: '1-3-months',
      customization: '  Custom packaging  ',
      message: '  Need a quote for rollout.  ',
  });
  assert(submitValid.emailSent === false, 'Smoke test should skip live email sending');
  assert(submitValid.submission.name === 'Smoke Test Buyer', 'Name should be trimmed');
  assert(submitValid.submission.company === 'Example Hospitality', 'Company should be trimmed');
  assert(submitValid.submission.message === 'Need a quote for rollout.', 'Message should be trimmed');

  const createdId = submitValid.submission.id;
  assert(typeof createdId === 'string' && createdId.length > 0, 'Created submission should have an id');

  process.env.ADMIN_EMAIL = 'ops@example.com';
  setEmailClientForTesting({
    emails: {
      async send() {
        throw new Error('Simulated email transport failure');
      },
    },
  });
  const submitWithEmailFailure = await processQuoteSubmission({
    name: 'Email Failure Test',
    company: 'Example Hospitality',
    email: 'email-failure@example.com',
    businessType: 'Hotel / Resort',
    productCategory: 'Fitted Sheets',
    quantity: 'small-trial-order',
    message: 'Ensure submission survives an email transport exception.',
  });
  assert(
    submitWithEmailFailure.emailSent === false,
    'Email transport failure should not mark the email as sent',
  );
  assert(
    submitWithEmailFailure.emailError === 'Simulated email transport failure',
    'Thrown email errors should be captured in the result',
  );
  const listAfterEmailFailure = await getStoredSubmissions();
  assert(
    listAfterEmailFailure.length === 2,
    'Submission should still be stored when email delivery throws',
  );
  setEmailClientForTesting(null);
  process.env.ADMIN_EMAIL = '';

  const listAfterCreate = await getStoredSubmissions();
  assert(listAfterCreate.length === 2, 'Listing after create should contain both stored submissions');
  assert(
    listAfterCreate.some((submission) => submission.id === createdId),
    'Stored submissions should include the originally created submission',
  );

  const deleteMissing = await deleteStoredSubmission('not-a-real-id');
  assert(deleteMissing === false, 'Deleting a missing submission should return false');

  const deleteCreated = await deleteStoredSubmission(createdId);
  assert(deleteCreated === true, 'Deleting the created submission should succeed');

  let missingRequiredError = null;
  try {
    await processQuoteSubmission({ company: 'Only Company' });
  } catch (error) {
    missingRequiredError = error;
  }
  assert(missingRequiredError instanceof Error, 'Missing required fields should throw an error');
  assert(
    missingRequiredError?.fieldErrors?.name === 'This field is required.',
    'Missing required fields should report field-level validation errors',
  );

  let invalidEmailError = null;
  try {
    await processQuoteSubmission({
      name: 'Buyer',
      company: 'Example Co',
      email: 'not-an-email',
      businessType: 'Distributor / Wholesaler',
      productCategory: 'Duvet Covers',
      quantity: 'small-trial-order',
      message: 'Need pricing for a trial order.',
    });
  } catch (error) {
    invalidEmailError = error;
  }
  assert(invalidEmailError instanceof Error, 'Invalid email should throw an error');
  assert(
    invalidEmailError?.fieldErrors?.email === 'Enter a valid email address.',
    'Invalid email should report the expected field error',
  );

  const originalStoreEntries = await getStoredSubmissions();
  let storageFailure = null;
  setSubmissionStoreForTesting({
    async list() {
      return originalStoreEntries;
    },
    async create() {
      throw new Error('Simulated storage failure');
    },
    async delete() {
      return false;
    },
    async clear() {},
    async ensureStorage() {},
  });
  try {
    await processQuoteSubmission({
      name: 'Storage Failure Test',
      company: 'Example Co',
      email: 'storage@example.com',
      businessType: 'Distributor / Wholesaler',
      productCategory: 'Duvet Covers',
      quantity: 'small-trial-order',
      message: 'This should fail before persisting.',
    });
  } catch (error) {
    storageFailure = error;
  }
  assert(storageFailure instanceof Error, 'Storage failures should surface as errors');
  assert(
    storageFailure?.message === 'Simulated storage failure',
    'Storage failure should preserve a safe internal error message for server handling',
  );

  setSubmissionStoreForTesting(createSubmissionStore());

  const recreateForClear = await processQuoteSubmission({
      name: 'Clear Test',
      company: 'Example Co',
      email: 'clear@example.com',
      businessType: 'Distributor / Wholesaler',
      productCategory: 'Duvet Covers',
      quantity: 'small-trial-order',
      message: 'Clear all test',
    });
  assert(recreateForClear.submission.id, 'Recreate before clear should create a submission');

  await clearStoredSubmissions();
  const listAfterClear = await getStoredSubmissions();
  assert(listAfterClear.length === 0, 'Listing after clear should be empty');

  console.log('Backend smoke test passed');
} finally {
  await fs.writeFile(quotesPath, originalQuotes, 'utf8');
}

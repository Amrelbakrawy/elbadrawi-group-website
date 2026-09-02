import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { logWarn } from '../lib/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getFileStoragePath() {
  return process.env.QUOTES_STORAGE_PATH || path.join(__dirname, '..', 'runtime', 'quotes.json');
}

function getStorageDriver() {
  return process.env.QUOTES_STORAGE_DRIVER || 'file';
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [];
}

class FileSubmissionStore {
  constructor(filePath) {
    this.filePath = filePath;
    this.directory = path.dirname(filePath);
  }

  async ensureStorage() {
    await fs.mkdir(this.directory, { recursive: true });
    try {
      await fs.access(this.filePath);
    } catch {
      await fs.writeFile(this.filePath, '[]', 'utf8');
    }
  }

  async list() {
    await this.ensureStorage();
    const raw = await fs.readFile(this.filePath, 'utf8');
    if (!raw.trim()) {
      return [];
    }

    return ensureArray(JSON.parse(raw));
  }

  async create(submission) {
    const submissions = await this.list();
    submissions.unshift(submission);
    await this.write(submissions);
    return submission;
  }

  async delete(submissionId) {
    const submissions = await this.list();
    const nextSubmissions = submissions.filter((submission) => submission.id !== submissionId);

    if (nextSubmissions.length === submissions.length) {
      return false;
    }

    await this.write(nextSubmissions);
    return true;
  }

  async clear() {
    await this.write([]);
  }

  async write(submissions) {
    await this.ensureStorage();
    await fs.writeFile(this.filePath, JSON.stringify(submissions, null, 2), 'utf8');
  }
}

export function createSubmissionStore() {
  const driver = getStorageDriver();

  if (driver !== 'file') {
    throw new Error(`Unsupported QUOTES_STORAGE_DRIVER "${driver}"`);
  }

  logWarn('quotes.storage_driver_file', {
    path: getFileStoragePath(),
    note: 'File storage is an interim solution. Use a managed database for multi-instance production.',
  });

  return new FileSubmissionStore(getFileStoragePath());
}

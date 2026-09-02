# Quote Submission Operations

## Storage

The current backend uses the file-backed submission store configured through:

- `QUOTES_STORAGE_DRIVER`
- `QUOTES_STORAGE_PATH`

For local development, a file store is acceptable. For production, the preferred next step is a managed database or persistent external storage with:

- access control
- encrypted backups
- retention policy
- multi-instance safety

## Backups

If file storage is used temporarily in production, back up the configured `QUOTES_STORAGE_PATH` regularly and keep it outside version control.

## Retention

Define a retention policy for quote submissions based on your legal and operational requirements. At minimum:

- define how long submissions are stored
- define who can export/delete them
- define who reviews deletion requests

## Admin Access

Production requires secure values for:

- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Do not reuse development credentials in production.

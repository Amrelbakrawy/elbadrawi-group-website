import { useEffect, useMemo, useState } from 'react';
import { Download, LogOut, Search, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { logoutAdmin } from '../utils/adminApi';
import {
  clearSubmissions,
  deleteSubmission,
  getSubmissions,
  QuoteApiError,
  type QuoteSubmission,
} from '../utils/quoteApi';

type PendingAction =
  | { type: 'delete'; submission: QuoteSubmission }
  | { type: 'clear-all' }
  | null;

export function AdminSubmissions() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<QuoteSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [businessTypeFilter, setBusinessTypeFilter] = useState('all');
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);

  useEffect(() => {
    void loadSubmissions();
  }, []);

  const businessTypeOptions = useMemo(() => {
    return ['all', ...new Set(submissions.map((submission) => submission.businessType))];
  }, [submissions]);

  const filteredSubmissions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return submissions.filter((submission) => {
      const matchesFilter =
        businessTypeFilter === 'all' || submission.businessType === businessTypeFilter;
      const matchesQuery =
        !normalizedQuery ||
        [
          submission.name,
          submission.company,
          submission.email,
          submission.message,
          submission.productCategory,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [businessTypeFilter, searchQuery, submissions]);

  const loadSubmissions = async () => {
    setIsLoading(true);
    setStatusMessage(null);

    try {
      setSubmissions(await getSubmissions());
    } catch (error) {
      if (error instanceof QuoteApiError && error.status === 401) {
        logoutAdmin();
        navigate('/admin/login', { replace: true, state: { from: '/admin/submissions' } });
        return;
      }

      setStatusMessage(error instanceof Error ? error.message : 'Failed to load submissions.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login', { replace: true });
  };

  const handleDelete = async (submission: QuoteSubmission) => {
    setIsSubmittingAction(true);

    try {
      const deleted = submission.id ? await deleteSubmission(submission.id) : false;

      if (!deleted) {
        setStatusMessage('We could not delete that submission. Please try again.');
        return;
      }

      setSubmissions((current) => current.filter((item) => item.id !== submission.id));
      setStatusMessage('Submission deleted successfully.');
    } catch (error) {
      if (error instanceof QuoteApiError && error.status === 401) {
        handleLogout();
        return;
      }

      setStatusMessage('We could not delete that submission. Please try again.');
    } finally {
      setIsSubmittingAction(false);
      setPendingAction(null);
    }
  };

  const handleClearAll = async () => {
    setIsSubmittingAction(true);

    try {
      const cleared = await clearSubmissions();

      if (!cleared) {
        setStatusMessage('We could not clear the submissions. Please try again.');
        return;
      }

      setSubmissions([]);
      setStatusMessage('All submissions were cleared.');
    } catch (error) {
      if (error instanceof QuoteApiError && error.status === 401) {
        handleLogout();
        return;
      }

      setStatusMessage('We could not clear the submissions. Please try again.');
    } finally {
      setIsSubmittingAction(false);
      setPendingAction(null);
    }
  };

  const handleDownloadCSV = () => {
    if (filteredSubmissions.length === 0) {
      setStatusMessage('There are no submissions in the current view to export.');
      return;
    }

    const headers = [
      'Date',
      'Name',
      'Company',
      'Email',
      'Phone',
      'Business Type',
      'Products Interested In',
      'Quantity',
      'Timeline',
      'Message',
      'Customization',
    ];

    const escapeCsvCell = (value: string) => {
      const sanitizedValue = /^[=+\-@]/.test(value) ? `'${value}` : value;
      return `"${sanitizedValue.replace(/"/g, '""')}"`;
    };

    const rows = filteredSubmissions.map((submission) => [
      new Date(submission.submittedAt).toLocaleString(),
      escapeCsvCell(submission.name),
      escapeCsvCell(submission.company),
      escapeCsvCell(submission.email),
      escapeCsvCell(submission.phone || ''),
      escapeCsvCell(submission.businessType),
      escapeCsvCell(submission.productCategory),
      escapeCsvCell(submission.quantity),
      escapeCsvCell(submission.timeline || ''),
      escapeCsvCell(submission.message),
      escapeCsvCell(submission.customization || ''),
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `quote-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    setStatusMessage('CSV export downloaded.');
  };

  if (isLoading) {
    return (
      <section className="section-space bg-background">
        <div className="site-container">
          <p className="text-center text-muted-foreground">Loading submissions…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-space bg-background">
      <div className="site-container">
        <div data-reveal className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="mb-2 font-heading text-4xl tracking-[-0.05em] text-foreground">
              Quote Submissions
            </h1>
            <p className="text-muted-foreground">
              Total: {filteredSubmissions.length} submission
              {filteredSubmissions.length !== 1 ? 's' : ''}
              {businessTypeFilter !== 'all' || searchQuery ? ' in the current view' : ''}
            </p>
          </div>
          <button type="button" className="button-secondary" onClick={handleLogout}>
            Sign Out
            <LogOut className="h-4 w-4" />
          </button>
        </div>

        {statusMessage ? (
          <div data-reveal className="glass-strip mb-6 rounded-2xl border border-border bg-white/82 px-4 py-3 text-sm text-muted-foreground">
            {statusMessage}
          </div>
        ) : null}

        <div data-reveal className="glass-strip mb-6 grid gap-4 rounded-[32px] border border-border bg-panel/80 p-5 lg:grid-cols-[1.2fr_0.8fr_auto]">
          <label className="flex items-center gap-3 rounded-2xl border border-border bg-background/80 px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              className="w-full bg-transparent outline-none"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by name, company, email, or message"
            />
          </label>

          <select
            className="form-input"
            value={businessTypeFilter}
            onChange={(event) => setBusinessTypeFilter(event.target.value)}
          >
            {businessTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'all' ? 'All business types' : option}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleDownloadCSV}
              className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-2 text-background transition hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => setPendingAction({ type: 'clear-all' })}
              className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-2 text-black transition hover:bg-black hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
              Clear All
            </button>
          </div>
        </div>

        {filteredSubmissions.length === 0 ? (
          <div data-reveal className="glass-strip rounded-[36px] border border-border bg-white/80 px-8 py-14 text-center">
            <p className="text-lg text-muted-foreground">No submissions match the current filters.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                data-reveal
                className="premium-card rounded-[24px] p-6"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="font-heading text-xl text-foreground">{submission.name}</h3>
                      <span className="text-sm text-muted-foreground">{submission.company}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(submission.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPendingAction({ type: 'delete', submission })}
                    className="rounded-full border border-border p-2 text-foreground transition hover:bg-black hover:text-white"
                    title="Delete submission"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <div className="mb-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Email</p>
                    <p className="break-all text-foreground">{submission.email}</p>
                  </div>
                  {submission.phone ? (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Phone</p>
                      <p className="text-foreground">{submission.phone}</p>
                    </div>
                  ) : null}
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Business Type</p>
                    <p className="text-foreground">{submission.businessType}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Products Interested In</p>
                    <p className="text-foreground">{submission.productCategory}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-muted-foreground">Quantity</p>
                    <p className="text-foreground">{submission.quantity}</p>
                  </div>
                  {submission.timeline ? (
                    <div>
                      <p className="text-sm font-semibold text-muted-foreground">Timeline</p>
                      <p className="text-foreground">{submission.timeline}</p>
                    </div>
                  ) : null}
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-muted-foreground">Project Message</p>
                  <p className="whitespace-pre-wrap text-sm text-foreground">{submission.message}</p>
                </div>

                {submission.customization ? (
                  <div className="mt-4 border-t border-border pt-4">
                    <p className="mb-2 text-sm font-semibold text-muted-foreground">
                      Customization Requirements
                    </p>
                    <p className="whitespace-pre-wrap text-sm text-foreground">
                      {submission.customization}
                    </p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>

      <AlertDialog open={Boolean(pendingAction)} onOpenChange={(open) => (!open ? setPendingAction(null) : null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pendingAction?.type === 'clear-all'
                ? 'Clear all quote submissions?'
                : 'Delete this quote submission?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pendingAction?.type === 'clear-all'
                ? 'This will permanently remove every stored quote submission. This action cannot be undone.'
                : 'This will permanently remove the selected quote submission from the admin list.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmittingAction}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                if (pendingAction?.type === 'clear-all') {
                  void handleClearAll();
                  return;
                }

                if (pendingAction?.type === 'delete') {
                  void handleDelete(pendingAction.submission);
                }
              }}
              disabled={isSubmittingAction}
            >
              {isSubmittingAction ? 'Working…' : 'Confirm'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}

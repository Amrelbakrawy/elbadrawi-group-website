import { type FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { PageHero } from '../components/ui/PageHero';
import { loginAdmin } from '../utils/adminApi';

type LoginFormState = {
  username: string;
  password: string;
};

export function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formState, setFormState] = useState<LoginFormState>({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof LoginFormState, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await loginAdmin(formState.username.trim(), formState.password);
      const nextPath = (location.state as { from?: string } | null)?.from || '/admin/submissions';
      navigate(nextPath, { replace: true });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Secure access for quote submission management."
        description="Only authorized Elbadrawi Group team members should access this area."
        accent="Use your admin credentials to view, export, and manage quote submissions."
      />

      <section className="section-space bg-white">
        <div className="site-container">
          <form
            data-reveal
            onSubmit={handleSubmit}
            className="glass-strip mx-auto max-w-xl rounded-[40px] border border-border bg-panel/80 px-6 py-8 md:px-10 md:py-12"
          >
            <div className="grid gap-6">
              {error ? (
                <div className="rounded-[24px] border border-border bg-white px-4 py-4 text-sm text-foreground">
                  {error}
                </div>
              ) : null}

              <label className="flex flex-col gap-3">
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">Username</span>
                <input
                  className="form-input"
                  name="username"
                  autoComplete="username"
                  value={formState.username}
                  onChange={(event) => handleChange('username', event.target.value)}
                  required
                />
              </label>

              <label className="flex flex-col gap-3">
                <span className="text-[0.75rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">Password</span>
                <input
                  className="form-input"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formState.password}
                  onChange={(event) => handleChange('password', event.target.value)}
                  required
                />
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="button-primary disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In…' : 'Sign In'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

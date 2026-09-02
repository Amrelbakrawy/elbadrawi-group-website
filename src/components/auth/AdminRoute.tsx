import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { getAdminSession } from '../../utils/adminApi';
import { getAdminSessionToken } from '../../utils/adminSession';

type AdminRouteProps = {
  children: ReactNode;
};

export function AdminRoute({ children }: AdminRouteProps) {
  const location = useLocation();
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    let isMounted = true;

    const verify = async () => {
      const token = getAdminSessionToken();
      if (!token) {
        if (isMounted) {
          setStatus('unauthenticated');
        }
        return;
      }

      try {
        await getAdminSession();
        if (isMounted) {
          setStatus('authenticated');
        }
      } catch {
        if (isMounted) {
          setStatus('unauthenticated');
        }
      }
    };

    void verify();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === 'loading') {
    return (
      <section className="section-space bg-background">
        <div className="site-container">
          <div className="mx-auto max-w-2xl rounded-[36px] border border-border bg-white px-8 py-14 text-center shadow-[0_24px_80px_rgba(70,55,43,0.08)] md:px-12">
            <p className="eyebrow">Admin access</p>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">Checking your session…</p>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}

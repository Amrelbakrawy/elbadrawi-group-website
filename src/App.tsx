import { Suspense } from 'react';
import { RouterProvider } from 'react-router';
import { PageLoader } from './components/ui/PageLoader';
import { OrganizationSchema } from './utils/seoSchema';
import { router } from './routes';

export default function App() {
  return (
    <>
      <OrganizationSchema />
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
}

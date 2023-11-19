import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Spinner from '~/components/Spinner';
import { useAuthContext } from '~/contexts/AuthContext';

const PublicRoutes = lazy(() => import('./public.routes'));
const PrivateRoutes = lazy(() => import('./private.routes'));

function Router() {
  const { user } = useAuthContext();

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        {user === null ? <PublicRoutes /> : <PrivateRoutes />}
      </Suspense>
    </BrowserRouter>
  );
}

export default Router;

import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    Component: lazy(() => import('../App'))
  }
]);

export default router;

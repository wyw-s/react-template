import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import routes from './routes';
import WithLoadingCom from '@/components/WithLoadingCom';
import generateRouter from '@/utils/generateRouter';

const router = createBrowserRouter([
  {
    path: '/',
    element: WithLoadingCom(lazy(() => import('@/layout'))),
    children: generateRouter(routes)
  },
  // {
  //   path: '/login',
  //   element: WithLoadingCom(lazy(() => import('@/pages/Login')))
  // }
  {
    path: '*',
    element: WithLoadingCom(lazy(() => import('@/pages/Error/NotFound')))
  }
]);

export default router;

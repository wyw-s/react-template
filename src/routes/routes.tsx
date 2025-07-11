import { lazy } from 'react';
import { RouteItem } from '@/utils/generateRouter';

const routes: RouteItem[] = [
  {
    index: true,
    redirect: 'home'
  },
  {
    path: 'home',
    name: '首页',
    // icon: <SvgRender name="organ" />,
    component: lazy(() => import('@/layout'))
  }
];

export default routes;

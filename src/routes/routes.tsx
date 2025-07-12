import { lazy } from 'react';
import { RouteItem } from '@/utils/generateRouter';
import SvgRender from '@/components/SvgRender';

const routes: RouteItem[] = [
  {
    index: true,
    redirect: 'home'
  },
  {
    path: 'home',
    name: '首页',
    icon: <SvgRender name="home" />,
    component: lazy(() => import('@/pages/Home'))
  }
];

export default routes;

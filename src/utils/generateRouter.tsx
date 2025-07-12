import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import WithLoadingCom from '@/components/WithLoadingCom';

export interface RouteItem {
  component?: React.ComponentType;
  index?: true;
  redirect?: string;
  children?: RouteItem[];
  path?: string;
  name?: string;
  icon?: React.ReactNode;
}

const generateRouter = (routeList: RouteItem[]): RouteObject[] => {
  const loop = (data: RouteItem[]) => {
    const _routes: RouteObject[] = [];
    data.forEach((router) => {
      const routeItem: RouteObject = {
        index: !!router.index,
        path: router.path,
        element: router.component && WithLoadingCom(router.component)
      };

      if (router.index && router.redirect) {
        routeItem.element = <Navigate to={router.redirect} replace />;
      }

      if (router.children) {
        const children = loop(router.children);
        if (children.length) {
          routeItem.children = children;
        }
      }
      _routes.push(routeItem);
    });

    return _routes;
  };

  return loop(routeList);
};

export default generateRouter;

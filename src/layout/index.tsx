import { useState } from 'react';
import type { ProSettings, BasicLayoutProps } from '@ant-design/pro-layout';
import { ProLayout, ProBreadcrumb } from '@ant-design/pro-layout';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import RightContent from './RightContent';
import defaultSettings from '@/defaultSettings';
import routes from '@/routes/routes';
import structureMenuTree from '@/utils/structureMenuTree';

export default () => {
  const [settings] = useState<Partial<ProSettings>>(defaultSettings);
  const navigate = useNavigate();
  const location = useLocation();

  const proLayoutConfig: BasicLayoutProps = {
    ...settings,
    menuProps: {
      onSelect: (selectMenu: any) => {
        if (Array.isArray(selectMenu)) return;
        const { key } = selectMenu;
        navigate(key);
      }
    },
    menu: {
      request: () => Promise.resolve(structureMenuTree(routes))
    },
    logo: false,
    disableContentMargin: true,
    collapsedButtonRender: false,
    disableMobile: true,
    onMenuHeaderClick: () => navigate('/'),
    rightContentRender: () => <RightContent />,
    location: { pathname: location.pathname },
    itemRender: (route: any) => {
      return <span>{route?.breadcrumbName}</span>;
    },
    breadcrumbProps: { minLength: 1 },
    headerContentRender: () => <ProBreadcrumb />
  };

  return (
    <ProLayout {...proLayoutConfig}>
      <Outlet />
    </ProLayout>
  );
};

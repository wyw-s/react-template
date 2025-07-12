import { MenuDataItem } from '@ant-design/pro-layout';

const menuTree = (menuData: MenuDataItem[]) => {
  const loop = (data: MenuDataItem[]): MenuDataItem[] => {
    const arr: MenuDataItem[] = [];
    data.forEach((item) => {
      if (!item.path) return;

      const menuItem: MenuDataItem = {
        path: item.path,
        name: item.name,
        icon: item.icon,
        hideInMenu: item.hideInMenu
      };

      if (item.children) {
        const getSubMenus = loop(item.children);
        if (getSubMenus.length) {
          menuItem.children = getSubMenus;
        }
      }

      arr.push(menuItem);
    });

    return arr;
  };

  return loop(menuData);
};

export default menuTree;

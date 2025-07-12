import React from 'react';
import { Avatar } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { MenuClickEventHandler } from 'rc-menu/lib/interface';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.module.less';
import avatar from '@/assets/img/avatar.png';
import { UserInfo } from '@/constant/common';
import jsonParse from '@/utils/jsonParse';

const AvatarDropdown = () => {
  const navigate = useNavigate();
  const userInfo = jsonParse(window.sessionStorage.getItem(UserInfo) || '') || {};
  const onMenuClick: MenuClickEventHandler = (event) => {
    const { key } = event;
    if (key === 'logout') {
      sessionStorage.clear();
      navigate('/login');
    }
  };

  const items = [{ label: '退出登录', key: 'logout', icon: <LogoutOutlined /> }];

  return (
    <HeaderDropdown menu={{ items, onClick: onMenuClick }}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={avatar} alt="avatar" />
        <span className={`${styles.name} anticon`}>{userInfo.userName}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { Token } from '@/constant/common';

const Authed: React.FC<any> = (props) => {
  const { children } = props;
  const isLogin = window.sessionStorage.getItem(Token);

  if (isLogin || window.location.pathname === '/login') {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default Authed;

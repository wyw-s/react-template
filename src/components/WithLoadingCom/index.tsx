import React, { Suspense } from 'react';
import { Spin } from 'antd';
import './index.less';

const WithLoadingCom = (Comp: React.ComponentType) => {
  return (
    <Suspense
      fallback={
        <div className="fallbackLoading">
          <Spin tip="Loading..." />
        </div>
      }
    >
      <Comp />
    </Suspense>
  );
};

export default WithLoadingCom;

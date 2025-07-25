import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'normalize.css/normalize.css';
import 'antd/dist/antd.variable.less';
import './index.less';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import router from './routes';
import reportWebVitals from './reportWebVitals';
import GlobalWrapper from '@/components/GlobalWrapper';
import EasyModal from '@/components/EasyModal';
import 'moment/locale/zh-cn';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <GlobalWrapper>
      <DndProvider backend={HTML5Backend} key="HTML5Backend">
        <ConfigProvider locale={zhCN} componentSize="middle">
          <EasyModal.Provider>
            <RouterProvider router={router} />
          </EasyModal.Provider>
        </ConfigProvider>
      </DndProvider>
    </GlobalWrapper>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

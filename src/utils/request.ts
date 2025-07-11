import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
// import { message } from 'antd';
// import debounce from 'lodash/debounce';
// import { Token } from '@/constant/common';

const { NODE_ENV } = process.env;

const service = axios.create({
  baseURL: NODE_ENV === 'development' ? '/' : '/'
});

// const redirectLogin = debounce(() => {
//   message.error('你未登录，即将跳转登录页面...');
//   window.setTimeout(() => {
//     window.location.replace('/login');
//   }, 1500);
// }, 300);

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 判断token是否存在
    // if (window.sessionStorage.getItem(Token) && !/\/user\/login/.test(config?.url as string)) {
    //   // 添加认证信息
    //   config.headers['authorization'] = window.sessionStorage.getItem(Token);
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // if (!res.success) {
    //   if (res.code == '001000') {
    //     redirectLogin();
    //     return;
    //   } else {
    //     message.warning(res.message || '服务错误！');
    //   }
    // }

    return res;
  },
  (error) => {
    // const res = error.response.data;
    // if (!res?.success && res?.code === 403) {
    //   redirectLogin();
    //   return Promise.reject(error);
    // }
    // message.warning(res?.message || '服务错误！');
    return Promise.reject(error);
  }
);

const request = (config: AxiosRequestConfig) => {
  return new Promise<{
    success: boolean;
    data?: any;
  }>((resolve) => {
    service<any, { success: boolean; data?: any }>(config)
      .then((res) => {
        resolve(res);
      })
      .catch(() => {
        resolve({ success: false });
      });
  });
};

export default request;

import request from '@/utils/request';

/**
 * 文件上传
 */
export const uploadFile = (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  return request({
    url: '/oss/uploadFile',
    method: 'post',
    data: formData
  });
};

export const login = (body: any) => {
  return Promise.resolve({
    data: {
      name: 'admin',
      ...body
    },
    success: true
  });
};

export const getUserInfo = () => {
  return Promise.resolve({
    data: {
      name: 'admin'
    },
    success: true
  });
};

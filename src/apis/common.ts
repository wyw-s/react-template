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

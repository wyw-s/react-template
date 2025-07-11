import request from '@/utils/request';

// 同时获取字典和字典项
export const getDictByDictKey = (body: any) => {
  return request({
    url: '/dict/list',
    method: 'post',
    data: body
  });
};

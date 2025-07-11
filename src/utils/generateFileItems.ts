/**
 * 组装Upload组件的文件对象
 * @param url
 */
const generateFileItems = (url: string | string[]) => {
  if (!url) return [];

  if (Array.isArray(url)) {
    return url.map((src) => ({
      uid: `-${new Date().getTime()}`,
      url: src,
      name: '',
      status: 'done',
      type: ''
    }));
  }

  return [
    {
      uid: `-${new Date().getTime()}`,
      url,
      name: '',
      status: 'done',
      type: ''
    }
  ];
};

export default generateFileItems;

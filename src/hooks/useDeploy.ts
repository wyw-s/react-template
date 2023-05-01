/**
 * @Author wangyw26123
 * @Description 控制台输入部署信息
 * @Date Created in 2023-05-01 09:21:48
 * @Modifed By 2023-05-01 09:21:48
 */
import { useEffect } from 'react';

const css = 'color: #ffffff;font-size: 14px';
const prevStyle = `${css};background: #606060;border-radius: 4px 0 0 4px`;
const secondStyle = `${css};background: #1475b2;border-radius: 0 4px 4px 0`;

const useDeploy = () => {
  useEffect(() => {
    if (DEPLOY instanceof Object) {
      let str = '';
      Object.keys(DEPLOY).forEach((key) => {
        str += `console.log('%c ${key} %c ${DEPLOY[key]} ', '${prevStyle}', '${secondStyle}');`;
      });
      // eslint-disable-next-line no-console
      console.clear();
      (function () {
        // eslint-disable-next-line no-eval
        eval(str);
      })();
    }
  }, []);

  return null;
};

export default useDeploy;

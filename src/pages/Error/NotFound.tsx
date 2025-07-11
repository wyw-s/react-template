/**
 * @Author wangyw26123
 * @Description 404
 * @Date Created in 2023-05-03 08:06:49
 * @Modifed By 2023-05-03 08:06:49
 */
import React from 'react';
import { Result } from 'antd';

const NotFound: React.FC = () => <Result status="404" title="404" subTitle="抱歉, 你当前访问的页面不存在." />;

export default NotFound;

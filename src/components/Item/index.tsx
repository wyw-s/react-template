import React from 'react';
import classNames from 'classnames';
import { Space } from 'antd';
import Highlight from '@/components/HighLight';
import getCePrefixCls from '@/utils/getCePrefixCls';
import './index.less';

export interface ItemProps {
  /**
   * 左侧标题
   */
  title?: React.ReactNode;
  /**
   * 这里的操作按钮只能传入数组
   *
   * @template
   * operateRender={[<Button key="del">删除</Button>]}
   */
  operateRender?: React.ReactNode;
  /**
   * 统计：一般用于树列表需要统计显示子项的数量
   */
  count?: number;
  /**
   * 需要高亮的文本；注意：需要配合 title 使用；自定义title不支持文本高亮
   */
  highlightText?: string;
  /**
   * 标题的点击事件
   */
  onClick?: () => void;
  /**
   * 自定义类样式
   */
  className?: string;
  /**
   * 自定义行内样式
   */
  style?: React.CSSProperties;
}

const Item = (props: React.PropsWithChildren<ItemProps>) => {
  const { title, operateRender, count, highlightText = '', onClick, className, style, children } = props;
  const prefixCls = getCePrefixCls('item');

  const renderLeft = () => {
    if (typeof title === 'string') {
      return <Highlight sourceText={title} highlightText={highlightText} />;
    }

    return children;
  };

  return (
    <div className={classNames(prefixCls, className)} style={style}>
      <div className={`${prefixCls}-left`} onClick={onClick}>
        {renderLeft()}
      </div>
      <div className={`${prefixCls}-right`}>
        <span>{count}</span>
        {operateRender && (
          <div className={`${prefixCls}-right-operator`}>
            <Space>{operateRender}</Space>
          </div>
        )}
      </div>
    </div>
  );
};

export default Item;

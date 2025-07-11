/**
 * @Author wangyw26123
 * @Description form表单项-响应式
 * @Date Created in 2023-06-04 13:52:00
 * @Modifed By 2023-06-04 13:52:00
 */
import React, { useMemo } from 'react';
import { Col, Form } from 'antd';
import type { FormItemProps as antFormItemProps } from 'antd';
import { formResponsive } from '@/constant/common';

interface FormItemProps extends antFormItemProps {
  span?: 24;
  offset?: 1;
}

const FormItem: React.FC<FormItemProps> = (props) => {
  const { span, style, offset, ...rest } = props;
  const commonStyle = { width: '100%', ...style };
  const colProps = useMemo(() => {
    if (span) {
      return { span };
    }

    if (offset) {
      return formResponsive.offset;
    }

    return formResponsive.col;
  }, [span, offset]);

  return (
    <Col {...colProps}>
      <Form.Item {...rest} style={commonStyle} />
    </Col>
  );
};

export default FormItem;

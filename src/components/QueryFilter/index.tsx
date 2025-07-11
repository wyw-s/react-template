/**
 * @Author wangyw26123
 * @Description 查询组件
 * @Date Created in 2023-05-03 14:52:51
 * @Modifed By 2023-05-03 14:52:51
 */
import * as React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import moment from 'moment';
import { Row, Col, Button, DatePicker, Form, Input, Tabs, Checkbox, Tooltip, Space } from 'antd';
import { EnumQueryFilterItemType, SearchItem, QueryFilterProps, QueryFilterState } from './declare';
import Dict from '@/components/Dict';
import getCePrefixCls from '@/utils/getCePrefixCls';
import './index.less';

export * from './declare';

const { TabPane } = Tabs;
const FormItem = Form.Item;
const prefix = getCePrefixCls('query-filter');

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

class QueryFilter extends React.Component<QueryFilterProps, QueryFilterState> {
  constructor(props: QueryFilterProps | Readonly<QueryFilterProps>) {
    super(props);
    this.state = {
      toggle: false,
      tooltipData: {}
    };
  }

  callback = (value: any) => {
    const { selectValue } = this.props;
    selectValue?.({ tab: value });
  };

  levelSearch = () => {
    const { toggle } = this.state;
    this.setState({
      toggle: !toggle
    });
  };

  getFormValue = () => {
    const { handleSearch } = this.props;
    handleSearch?.();
  };

  rest = () => {
    const { form, handleReset, handleSearch } = this.props;
    if (handleReset) {
      handleReset();
    } else {
      form.resetFields();
      this.setState({ tooltipData: {} });
      handleSearch?.();
    }
  };

  handleQueryFormKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      this.getFormValue();
    }
  };

  switchItemType = (item: SearchItem, fn?: any) => {
    const { placeholderWithoutPrefix = true } = this.props;
    item.props = item.props || {};
    const { width, style = {} } = item.props;

    const onChange = (...args: any[]) => {
      if (item.props.onChange) {
        item.props.onChange(...args);
      }

      fn?.(...args);
    };

    switch (item.type) {
      case EnumQueryFilterItemType.dictSelect:
        return (
          <Dict.Select
            allowClear
            placeholder={placeholderWithoutPrefix ? item.placeholder : `请选择${item.placeholder}`}
            showSearch
            dictkey={item.dictkey}
            mode={item.mode}
            filterkeys={item.filterkeys}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.props?.children[1] && option?.props?.children[1].includes(input && input.trim())
            }
            onKeyDown={this.handleQueryFormKeyDown}
            {...item.props}
            onChange={onChange}
            style={{ width: width || '100%', ...style }}
          />
        );
      case EnumQueryFilterItemType.input:
        return (
          <Input
            placeholder={placeholderWithoutPrefix ? item.placeholder : `请输入${item.placeholder}`}
            allowClear
            onKeyDown={this.handleQueryFormKeyDown}
            {...item.props}
            onChange={onChange}
            style={{ ...(width ? { width } : {}), ...style }}
          />
        );
      case EnumQueryFilterItemType.datePicker:
        return (
          <DatePicker
            allowClear
            placeholder={placeholderWithoutPrefix ? item.placeholder : `请选择${item.placeholder}`}
            onKeyDown={this.handleQueryFormKeyDown}
            {...item.props}
            onChange={onChange}
            style={{ width: width || '100%', ...style }}
          />
        );
      case EnumQueryFilterItemType.rangePicker:
        return (
          <DatePicker.RangePicker
            allowClear
            placeholder={item.rangePickerPlaceholder ? item.rangePickerPlaceholder : ['开始日期', '结束日期']}
            ranges={{
              今日: [moment().startOf('day'), moment().endOf('day')],
              本周: [moment().startOf('week'), moment().endOf('week')],
              本月: [moment().startOf('month'), moment().endOf('month')],
              清空: []
            }}
            showTime={!!item.showTime}
            onKeyDown={this.handleQueryFormKeyDown}
            {...item.props}
            onChange={onChange}
            style={{ width: width || '100%', ...style }}
          />
        );

      case EnumQueryFilterItemType.component:
        return item.component;
      default:
        return (
          <Input
            placeholder={placeholderWithoutPrefix ? item.placeholder : `请输入${item.placeholder}`}
            onKeyDown={this.handleQueryFormKeyDown}
            {...item.props}
            onChange={onChange}
            style={{ width: width || '100%', ...style }}
          />
        );
    }
  };

  formatValue = (value: any, item: SearchItem) => {
    if (value) {
      switch (item.type) {
        case EnumQueryFilterItemType.rangePicker: {
          const startDate = moment(value[0]).format('YYYY-MM-DD');
          const endDate = moment(value[1]).format('YYYY-MM-DD');
          return `${value.length ? `${startDate} 至 ${endDate} ` : ''}`;
        }
        case EnumQueryFilterItemType.datePicker:
          return moment(value).format('YYYY-MM-DD');
        case EnumQueryFilterItemType.dictSelect:
          return value;
        default:
          return value.target.value;
      }
    }
  };

  getTooltipTitle = (item: SearchItem) => {
    const { placeholderWithoutPrefix } = this.props;
    if (item.props?.placeholder) {
      return item.props.placeholder;
    }

    switch (item.type) {
      case EnumQueryFilterItemType.pcaSelect:
      case EnumQueryFilterItemType.dictSelect:
      case EnumQueryFilterItemType.datePicker:
        return placeholderWithoutPrefix ? item.placeholder : `请选择${item.placeholder}`;
      case EnumQueryFilterItemType.input:
        return placeholderWithoutPrefix ? item.placeholder : `请输入${item.placeholder}`;
      case EnumQueryFilterItemType.rangePicker:
        return item.rangePickerPlaceholder ? item.rangePickerPlaceholder : ['开始日期', '结束日期'];
      case EnumQueryFilterItemType.component:
        return '';
      default:
        return placeholderWithoutPrefix ? item.placeholder : `请输入${item.placeholder}`;
    }
  };

  render() {
    const {
      searchItems,
      form,
      extFormItemList,
      extAction,
      hideButton,
      deduplication = false,
      deduplicationQuery,
      showLabel = false,
      formProps = {}
    } = this.props;

    const { toggle, tooltipData } = this.state;
    const tabsList = searchItems?.filter((item) => item.position === 'tab');
    const showList = searchItems?.filter((item) => item.position === 'show');
    const hiddenList = searchItems?.filter((item) => item.position === 'hidden');

    return (
      <div className={prefix}>
        <Form form={form} {...formProps} labelWrap>
          <Row justify="space-between" align="top">
            <Col span={extAction ? 20 : 24}>
              <Space>
                {tabsList && tabsList.length > 0 ? (
                  <Tabs
                    defaultActiveKey={tabsList[0].key}
                    // className={`${prefix}-tabs-cover`}
                    onChange={this.callback}
                  >
                    {tabsList.map((item) => (
                      <TabPane tab={item.placeholder} key={item.key} />
                    ))}
                  </Tabs>
                ) : null}
                {showList && showList.length > 0
                  ? showList.map((item, index) => {
                    const onChange = (_value: any) => {
                      const value = this.formatValue(_value, item);
                      this.setState({
                        tooltipData: {
                          ...tooltipData,
                          [item.key]: value
                        }
                      });
                    };

                    /**
                       * 1. 注意：Tooltip 组件不能直接包裹表单组件(例：<Tooltip><Input /></
                       *    Tooltip>)，因为form无法触发onChange事件； 导致无法无法使用
                       *    form.validateFields().then((values)) 获取到表单值；
                       * 2. 自定义组件暂时不使用 tooltip 进行提示
                       */
                    const formCom = (
                      <FormItem
                        name={item.key}
                        {...(showLabel
                          ? {
                            label: item.label ? item.label : item.placeholder,
                            labelCol: {
                              xs: { span: 3 },
                              sm: { span: 8 }
                            },
                            wrapperCol: {
                              xs: { span: 21 },
                              sm: { span: 16 }
                            }
                          }
                          : {})}
                        initialValue={item.initialValue}
                        rules={item.rules}
                        {...item.decoratorProps}
                      >
                        {this.switchItemType(item, onChange)}
                      </FormItem>
                    );

                    if (item.type === EnumQueryFilterItemType.component) {
                      return (
                        <Col key={item.key} style={{ width: item.width || 220 }}>
                          {formCom}
                        </Col>
                      );
                    }

                    return (
                      <Col key={item.key} style={{ width: item.width || 220 }}>
                        <Tooltip
                          key={`tip-${item.key}-${index}`}
                          title={
                              tooltipData[item.key]
                                ? `${item.placeholder}：${tooltipData[item.key]}`
                                : this.getTooltipTitle(item)
                            }
                        >
                          {formCom}
                        </Tooltip>
                      </Col>
                    );
                  })
                  : null}
                {extFormItemList}
                <Space>
                  {hiddenList && hiddenList.length > 0 ? (
                    <Button icon={<SearchOutlined type="search" />} onClick={this.levelSearch}>
                      更多
                    </Button>
                  ) : null}
                  {hideButton ? null : (
                    <>
                      <Button type="primary" onClick={this.getFormValue}>
                        查询
                      </Button>
                      <Button onClick={this.rest}>重置</Button>
                    </>
                  )}
                  {deduplication && <Checkbox onChange={deduplicationQuery}>去重查询</Checkbox>}
                </Space>
              </Space>
            </Col>
            {extAction && (
              <Col span={4} className={`${prefix}-extAction`}>
                {extAction || ''}
              </Col>
            )}
          </Row>
          <div
            className={classNames(`${prefix}-more`, {
              [`${prefix}-level-search`]: toggle,
              [`${prefix}-hide`]: !toggle
            })}
          >
            <Row gutter={[12, 12]}>
              {hiddenList && hiddenList.length > 0
                ? hiddenList.map((item) => {
                  const onChange = (_value: any) => {
                    const value = this.formatValue(_value, item);
                    this.setState({
                      tooltipData: {
                        ...tooltipData,
                        [item.key]: value
                      }
                    });
                  };

                  // 自定义组件(需要考虑值的转化)暂时不使用 tooltip 进行提示
                  const formCom = (
                    <FormItem
                      name={item.key}
                      label={item.label ? item.label : item.placeholder}
                      {...formItemLayout}
                      initialValue={item.initialValue}
                      rules={item.rules}
                      {...item.decoratorProps}
                    >
                      {this.switchItemType(item, onChange)}
                    </FormItem>
                  );

                  if (item.type === EnumQueryFilterItemType.component) {
                    return (
                      <Col
                        key={item.key}
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 24 }}
                        lg={{ span: 12 }}
                        xl={{ span: 12 }}
                        xxl={{ span: 8 }}
                      >
                        {formCom}
                      </Col>
                    );
                  }

                  return (
                    <Col
                      key={item.key}
                      xs={{ span: 24 }}
                      sm={{ span: 24 }}
                      md={{ span: 24 }}
                      lg={{ span: 12 }}
                      xl={{ span: 12 }}
                      xxl={{ span: 8 }}
                    >
                      <Tooltip
                        key={`tip-${item.key}`}
                        title={
                            tooltipData[item.key]
                              ? `${item.placeholder}：${tooltipData[item.key]}`
                              : this.getTooltipTitle(item)
                          }
                        visible={!!item.hidden}
                      >
                        {formCom}
                      </Tooltip>
                    </Col>
                  );
                })
                : ''}
            </Row>
          </div>
        </Form>
      </div>
    );
  }
}
export default QueryFilter;

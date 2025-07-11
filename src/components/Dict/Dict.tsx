import * as React from 'react';
import DictSelect from './DictSelect';
import DictCheckboxGroup from './DictCheckboxGroup';
import DictRadioGroup from './DictRadioGroup';
import DictText from './DictText';

export default class Dict extends React.Component<any> {
  // 数据字典展示类型
  static Select: typeof DictSelect;

  static CheckboxGroup: typeof DictCheckboxGroup;

  static RadioGroup: typeof DictRadioGroup;

  static Text: typeof DictText;
}

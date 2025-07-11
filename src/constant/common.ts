/**
 * @Author wangyw26123
 * @Description 全局规则
 * @Date Created in 2023-05-03 16:08:07
 * @Modifed By 2023-05-03 16:08:07
 */
/**
 * 枚举状态
 */
enum EnumStatus {
  success = 'success',
  processing = 'processing',
  default = 'default',
  error = 'error',
  warning = 'warning'
}

/**
 * 日期格式
 */
enum EnumDateFormat {
  date = 'YYYY-MM-DD',
  time = 'YYYY-MM-DD HH:mm:ss'
}

enum ModalSize {
  small = 500,
  middle = 800,
  large = 1200
}

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 }
};

const Token = 'CE-TOKEN';
const UserInfo = 'CE-USER-INFO';

// input 输入框允许输入的最大值
const InputMax = 999999;

export { EnumDateFormat, InputMax, formItemLayout, Token, UserInfo, ModalSize, EnumStatus };

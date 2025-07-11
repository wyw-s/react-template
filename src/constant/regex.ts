// 匹配手机号
export const phoneNumberRegex = /^1[3-9]\d{9}$/;

// 字母、数字和符号两种及以上的组合，8-20个字符
export const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=~!]{8,20}$/;

// 支持中文、英文、数字、'-'、'_'的组合
export const loginAccount = /^[A-Za-z0-9]{8,16}$/;

// 只支持数字
export const onlyNumber = /^\d+$/;

// 只能输入英文字母和下划线
export const inputEnUnderline = /^[a-zA-Z_]+$/;

// 只能输入数字，并且最多包含两位小数
export const twoDecimalPlaces = /^\d+(\.\d{1,2})?$/;

// 最多输入三位正整数
export const threePositiveIntegers = /^[1-9]\d{0,2}$/;

const { getESLintConfig } = require('@iceworks/spec');

// getESLintConfig(rule: 'common'|'rax'|'react'|'vue', customConfig?);
module.exports = getESLintConfig('react-ts', {
  rules: {
    // 对象属性尾部禁止加逗号。避免参数是jsx时，导致尾部自动加上逗号（此规则需要和prettierr一致）
    'comma-dangle': ['error', 'never'],
    // 禁止console
    'no-console': 'error',
    // 强制分号结尾
    semi: ['error', 'always'],
    // 取消对文件扩展名的验证
    'import/extensions': 'off',
    // 箭头函数，不管参数数量如何始终带上括号
    'arrow-parens': ['error', 'always'],
    // 不强制使用 https
    '@iceworks/best-practices/no-http-url': 'off',
    // 允许在ts项目中使用js文件
    '@iceworks/best-practices/no-js-in-ts-project': 'off',
    // 不建议使用小写来命名组件
    '@iceworks/best-practices/no-lowercase-component-name': 'error',
    // 推荐使用函数组件
    '@iceworks/best-practices/recommend-functional-component': 'off',
    // 每个文件强制执行最多行数
    'max-lines': 'off'
  }
});

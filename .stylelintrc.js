const { getStylelintConfig } = require('@iceworks/spec');

// getStylelintConfig(rule: 'common'|'rax'|'react'|'vue', customConfig?);
module.exports = getStylelintConfig('react', {
  plugins: ['stylelint-less'],
  rules: {
    'selector-max-id': 1
  }
});

const { getPrettierConfig } = require('@iceworks/spec');

// getPrettierConfig(rule: 'common'|'rax'|'react'|'vue', customConfig?);
module.exports = getPrettierConfig('react', {
  trailingComma: 'none'
});

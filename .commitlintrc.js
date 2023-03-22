const { getCommitlintConfig } = require('@iceworks/spec');

// getCommitlintConfig(rule: 'common'|'rax'|'react'|'vue', customConfig?);
module.exports = getCommitlintConfig('react', {
  rules: {
    'scope-case': [2, 'always', ['lower-case', 'upper-case', 'camel-case', 'pascal-case']]
  }
});

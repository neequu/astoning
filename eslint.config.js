import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  rules: {
    'import/prefer-default-export': 'off',
    'no-unused-expressions': 'error',
    'ts/no-explicit-any': 'warn',
    'react-hooks/exhaustive-deps': 'off',
  },
})

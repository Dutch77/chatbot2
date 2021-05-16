module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['putout', '@typescript-eslint'],
  env: {
    browser: true,
    node: true,
  },
  extends: [
    require.resolve('eslint-config-google'),
    'eslint:recommended',
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off', // because no one writes it anyway
    'no-invalid-this': 'off', // broken in legit cases
    'new-cap': [
      'error', {
        'capIsNew': false,
      },
    ], // because factories..
    'max-len': ['error', 120], // because long function names and ternary in arrow functions
    'newline-per-chained-call': [
      'error', {
        'ignoreChainWithDepth': 2,
      },
    ],
    'indent': [
      'error', 2, {
        'MemberExpression': 1,
        'flatTernaryExpressions': true,
      },
    ],
    'spaced-comment': [
      'error', 'always', {
        'markers': ['/'], /// <reference.. <- typescript triple slash compiler hints
      },
    ],
    'no-multi-spaces': [
      'error', {
        ignoreEOLComments: true,
      },
    ],
    'space-unary-ops': 'error',
    'no-spaced-func': 'error',
    'space-infix-ops': 'error',
    '@typescript-eslint/type-annotation-spacing': [
      'error', {
        'before': false,
        'after': true,
      },
    ],
    'object-property-newline': ['error', {'allowAllPropertiesOnSameLine': true}],
    'object-curly-newline': ['error', {'consistent': true}],
    'putout/multiple-properties-destructuring': [
      'error', {
        minProperties: 3,
      },
    ],
    // 'object-curly-spacing': [ 2, 'always' ], // todo: discuss this
    'array-bracket-newline': ['error', {multiline: true}],
    'array-element-newline': ['error', 'consistent'],
    // 'array-bracket-spacing': [ 'error', 'always' ], // todo: discuss this
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-unused-vars': 'off',
      },
    },
  ],
  globals: {},
};

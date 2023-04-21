module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: [
        'react',
        '@typescript-eslint'
      ],
      settings: {
        react: {
          pragma: 'React',
          version: 'detect',
        },
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:react/recommended'
      ],
      parserOptions: {
        project: ['./tsconfig.json'],
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      rules: {
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        'react/no-unknown-property': [
          2,
          {
            'ignore': [
              'jsx',
              'global'
            ]
          }
        ]
      }
    }
  ],
}

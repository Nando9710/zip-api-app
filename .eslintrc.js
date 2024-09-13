module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'test/', '**/*.example*'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^[A-Z]',
          match: true,
        },
      },
      {
        selector: ['variable'],
        format: ['camelCase', 'UPPER_CASE'],
        leadingUnderscore: 'allow',
      },
      {
        selector: ['property', 'parameter'],
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      //TODO: forzar camelCAse en strings !?
      // {
      //   selector: 'variable',
      //   types: ["string"],
      //   format: ['camelCase'],
      //   filter: {
      //     regex: "^\"[A-Za-z]*\"$",
      //     match: true
      //   }
      // }
      // {
      //   selector: ['memberLike'],
      //   format: ['camelCase'],
      //   leadingUnderscore: 'allow',
      // },
      // {
      //   selector: "memberLike",
      //   modifiers: ["private"],
      //   format: ["camelCase"],
      //   leadingUnderscore: "require"
      // }
      //TODO: Enforce that boolean variables are prefixed with an allowed verb
      // {
      //   selector: "variable",
      //   types: ["boolean"],
      //   format: ["camelCase"],
      //   prefix: ["is", "should", "has", "can", "did", "will"]
      // }
      // {
      //   "selector": "variable",
      //   "modifiers": ["const", 'export'],
      //   "format": ["UPPER_CASE"]
      // },
      //TODO: Enforce that type parameters (generics) are prefixed with T
      // {
      //   "selector": "typeParameter",
      //   "format": ["PascalCase"],
      //   "prefix": ["T"]
      // },
      //TODO: Enforce that interface names do not begin with an I
      // {
      //   "selector": "interface",
      //   "format": ["PascalCase"],
      //   "custom": {
      //     "regex": "^I[A-Z]",
      //     "match": false
      //   },
      // },
    ],
  },
}

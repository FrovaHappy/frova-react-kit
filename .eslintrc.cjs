module.exports = {
  overrides: [
    {
      parser: "@typescript-eslint/parser",
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
      plugins: ["@typescript-eslint"],
      files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
      env: {
        browser: true,
        es2021: true,
      },
      rules: {
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-floating-promises": "off",
        "@typescript-eslint/space-before-function-paren": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/prefer-promise-reject-errors": "off",
        "@typescript-eslint/triple-slash-reference": "off",
        "@typescript-eslint/no-confusing-void-expression": [
          "error",
          { ignoreArrowShorthand: true },
        ],
        "@typescript-eslint/no-misused-promises": [
          "error",
          {
            checksVoidReturn: false,
          },
        ],
      },
      parserOptions: {},
    },
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json", "./**/tsconfig.json"],
  },
};

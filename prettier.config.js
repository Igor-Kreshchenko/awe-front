module.exports = {
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'always',
  printWidth: 120,
  overrides: [
    {
      files: '*.scss',
      options: {
        singleQuote: false
      }
    }
  ],
  quoteProps: 'preserve',
  trailingComma: 'none'
};

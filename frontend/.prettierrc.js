module.exports = {
  printWidth: 140,
  tabWidth: 2,
  singleQuote: false,
  semi: true,
  trailingComma: "none",
  arrowParens: "always",
  overrides: [
    {
      files: "*.{js,jsx,tsx,ts,scss,json,html}",
      options: {
        tabWidth: 2
      }
    }
  ]
};

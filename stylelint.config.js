module.exports = {
  customSyntax: 'postcss-html',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-vue',
    'stylelint-config-prettier',
    'stylelint-config-sass-guidelines',
  ],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  plugins: ['stylelint-scss', 'stylelint-order'],
  rules: {
    'max-nesting-depth': 12,
    'unicode-bom': 'never',
    'selector-max-compound-selectors': null,
    'selector-no-qualifying-type': null,
    'selector-class-pattern': null,
    'selector-max-id': null,
    'color-named': null,
    'scss/selector-no-redundant-nesting-selector': null,
    'function-parentheses-space-inside': null,
    'no-descending-specificity': null,
    'property-no-vendor-prefix': null,
    'value-no-vendor-prefix': null,
    'order/properties-alphabetical-order': null,
    'font-family-no-missing-generic-family-keyword': null,
    'declaration-block-trailing-semicolon': null,
    'declaration-block-semicolon-newline-after': null,
    'no-invalid-position-at-import-rule': null,
  },
  ignoreFiles: ['static/**/*.css'],
}

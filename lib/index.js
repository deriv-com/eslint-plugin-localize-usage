"use strict";

const noInvalidIdentifierInPropValue = require("./rules/no-invalid-identifier-in-prop-value");
const onlyStringLiteralArgument = require("./rules/only-string-literal-argument");

module.exports = {
  rules: {
    "only-string-literal-argument": onlyStringLiteralArgument,
    "no-invalid-identifier-in-prop-value": noInvalidIdentifierInPropValue
  },
  configs: {
    recommended: {
      plugins: ["@deriv/localize-usage"],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      rules: {
        "@deriv/localize-usage/only-string-literal-argument": "error",
        "@deriv/localize-usage/no-invalid-identifier-in-prop-value": "error",
      },
    },
  },
};

"use strict";

const { findAndValidateLocalizeFunction } = require("../utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        "Enforce using static strings as keys for localize functions which we use for translation",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      onlyStringLiteralAsFirstArgument:
        "first argument must be a string literal",
      onlyObjectExpressionAsSecondArgument: "second argument must be an object",
      onlyAcceptsTwoArguments: "this function only accepts 2 arguments",
      passCorrectProperties:
        "object must have these properties ({{ identifiers }})",
      avoidExtraProperties:
        "{{ property }}, this extra property is not present in the string literal",
      provideValues: "provide value for ({{ identifiers }}) on second argument",
    },
    fixable: null,
  },

  create(context) {
    return {
      Identifier: (node) => findAndValidateLocalizeFunction(node, context),
    };
  },
};

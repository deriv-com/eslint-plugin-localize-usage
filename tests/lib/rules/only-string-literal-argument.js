//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/only-string-literal-argument");

const parsers = require("../../helpers/parsers");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ERROR_MESSAGE = "first argument must be a string literal";
const ERROR_MESSAGE_SECOND_ARGUMENT = "second argument must be an object";
const ERROR_MESSAGE_EXTRA_PROPERTIES =
  "mock_value, this extra property is not present in the string literal";
const ERROR_MESSAGE_MISSING_PROPERTIES =
  "object must have these properties (placeholder)";
const ERROR_MESSSAGE_PROVIDE_VALUE =
  "provide value for (placeholder) on second argument";
const ERROR_MESSAGE_TWO_ARGUMENTS = "this function only accepts 2 arguments";

const ruleTester = new RuleTester({ parser: parsers.BABEL_ESLINT });
ruleTester.run("only-string-literal-argument", rule, {
  valid: [
    {
      code: "localize('this is my translation key')",
    },
    {
      code: "localize(some_variable)",
    },
    {
      code: "localize('this is some {{placeholder}} text {{placeholder}}', { placeholder: 'some text here' })",
    },
  ],

  invalid: [
    {
      code: "localize(`this is my translation key with template literals`)",
      errors: [
        {
          message: ERROR_MESSAGE,
          line: 1,
          column: 10,
          type: "TemplateLiteral",
        },
      ],
    },
    {
      code: "localize('invalid use', some_variable)",
      errors: [
        {
          message: ERROR_MESSAGE_SECOND_ARGUMENT,
          line: 1,
          column: 25,
          type: "Identifier",
        },
      ],
    },
    {
      code: "localize('some test string', { mock_value })",
      errors: [
        {
          message: ERROR_MESSAGE_EXTRA_PROPERTIES,
          line: 1,
          column: 32,
          type: "Property",
        },
      ],
    },
    {
      code: "localize('invalid use' + some_variable)",
      errors: [
        {
          message: ERROR_MESSAGE,
          line: 1,
          column: 26,
          type: "Identifier",
        },
      ],
    },
    {
      code: "localize(some_new_variable + 'invalid use')",
      errors: [
        {
          message: ERROR_MESSAGE,
          line: 1,
          column: 10,
          type: "Identifier",
        },
      ],
    },
    {
      code: "localize(some_new_variable + 'invalid use' + some_variable)",
      errors: [
        {
          message: ERROR_MESSAGE,
          line: 1,
          column: 46,
          type: "Identifier",
        },
      ],
    },
    {
      code: "localize(`invalid use : ${some_variable}`)",
      errors: [
        {
          message: ERROR_MESSAGE,
          line: 1,
          column: 10,
          type: "TemplateLiteral",
        },
      ],
    },
    {
      code: "localize('this is some text {{placeholder}}', { mock_value: 'this is not usable' })",
      errors: [
        {
          message: ERROR_MESSAGE_MISSING_PROPERTIES,
          line: 1,
          column: 47,
          type: "ObjectExpression",
        },
        {
          message: ERROR_MESSAGE_EXTRA_PROPERTIES,
          line: 1,
          column: 49,
          type: "Property",
        },
      ],
    },
    {
      code: "localize('this is some text {{ placeholder }}')",
      errors: [
        {
          message: ERROR_MESSSAGE_PROVIDE_VALUE,
          line: 1,
          column: 10,
          type: "Literal",
        },
      ],
    },
    {
      code: "localize('this is some text {{placeholder}}', 'second argument')",
      errors: [
        {
          message: ERROR_MESSAGE_SECOND_ARGUMENT,
          line: 1,
          column: 47,
          type: "Literal",
        },
      ],
    },
    {
      code: "localize('this is some text {{placeholder}}', 'second argument', 'this is third')",
      errors: [
        {
          message: ERROR_MESSAGE_SECOND_ARGUMENT,
          line: 1,
          column: 47,
          type: "Literal",
        },
        {
          message: ERROR_MESSAGE_TWO_ARGUMENTS,
          line: 1,
          column: 66,
          type: "Literal",
        },
      ],
    },
  ],
});

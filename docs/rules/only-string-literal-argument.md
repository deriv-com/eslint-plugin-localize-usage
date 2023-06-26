# only-string-literal-argument

Enforce using static strings as keys for localize functions which we use for translation

## Rule Details

Examples of **incorrect** code for this rule:

```js
localize(key);

localize(`some translation literal : ${key}`);

localize(some_new_variable + 'invalid use')

localize(some_new_variable + 'invalid use' + some_variable)

localize(`this is not allowed`);

localize('this is some text {{placeholder}}', {
  placeholder: 'some text here',
  extra_arg: 'this is not usable'
});

localize('this is some text {{ placeholder }}')

localize('this is some text {{placeholder}}', {
  irrelavant_prop: 'this is not usable'
})

localize('this is some text {{placeholder}}', 'second argument')

localize('this is some text {{placeholder}}', 'second argument', 'this is third')
```

Examples of **correct** code for this rule:

```js
localize("key");

localize(also_a_valid_use);

localize('this is some {{placeholder}} text {{placeholder}}', {
  placeholder: 'some text here'
})

```

### Options

```
...
```

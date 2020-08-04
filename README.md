# JSON Lisp

JSON Lisp is a Lisp like language that uses JSON arrays to mimic Lisp S-Expressions. This repository is a reference resource to support my article on the topic.

Check out the [JSON Lisp article](https://merrickchristensen.com/articles/json-lisp/) where we implement this langauge together.

## Examples

### Math

```jsx
["+", 2, 2]; // 4
```

### `if`

```jsx
["if", true, ["+", 1, 1] // 2
```

### `cond` Branching

```jsx
["cond", [false, 1], [false, 0], [true, 3]]; // 3
```

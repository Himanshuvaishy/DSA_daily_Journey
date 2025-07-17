
# Valid Parentheses – Full Summary

## 🧠 Problem Statement
Given a string `s` containing only `'('`, `')'`, `'{'`, `'}'`, `'['`, `']'`, determine if the input string is valid.

A string is valid if:
- Every opening bracket has a corresponding closing bracket of the same type.
- Brackets are closed in the correct order.

---

## ✅ Approach 1: Using Object (Opening → Closing)

```js
const isValid = (s) => {
  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  };

  for (let char of s) {
    if (map[char]) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (map[top] !== char) return false;
    }
  }

  return stack.length === 0;
};
```

### ✅ Logic
- Push when it's an opening bracket.
- On closing, pop from stack and verify if it matches the expected closing from the object.

---

## ✅ Approach 2: Using Object (Closing → Opening)

```js
const isValid = (s) => {
  const stack = [];
  const map = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  for (let char of s) {
    if (!map[char]) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (top !== map[char]) return false;
    }
  }

  return stack.length === 0;
};
```

### ✅ Logic
- Push only opening brackets.
- When closing bracket is found, pop and check if it matches the expected opening bracket.

---

## ✅ Approach 3: Using Map (Opening → Closing)

```js
const isValid = (s) => {
  const stack = [];
  const map = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}']
  ]);

  for (let char of s) {
    if (map.has(char)) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (map.get(top) !== char) return false;
    }
  }

  return stack.length === 0;
};
```

---

## ✅ Approach 4: Using Map (Closing → Opening)

```js
const isValid = (s) => {
  const stack = [];
  const map = new Map([
    [')', '('],
    [']', '['],
    ['}', '{']
  ]);

  for (let char of s) {
    if (!map.has(char)) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (top !== map.get(char)) return false;
    }
  }

  return stack.length === 0;
};
```

---

## ⚙️ Final Notes

| Version         | Map/Object | Direction         | Comparison         |
|----------------|------------|-------------------|--------------------|
| Approach 1      | Object     | Opening → Closing | `map[top] !== char` |
| Approach 2      | Object     | Closing → Opening | `top !== map[char]` |
| Approach 3      | Map        | Opening → Closing | `map.get(top) !== char` |
| Approach 4      | Map        | Closing → Opening | `top !== map.get(char)` |

---

## 📦 Space & Time Complexity

- **Time:** O(n), where n = length of string
- **Space:** O(n), for the stack

---

## ✅ Sample Input/Output

| Input      | Output |
|------------|--------|
| `()[]{} `  | true   |
| `([)]`     | false  |
| `{[()]}`   | true   |
| `((`       | false  |

---

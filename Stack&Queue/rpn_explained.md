
# Reverse Polish Notation (RPN) Evaluation

## Stack-Based Approach

```javascript
var evalRPN = function(tokens) {
    let s = [];

    for (let i = 0; i < tokens.length; i++) {
        if (!['+', '-', '*', '/'].includes(tokens[i])) {
            s.push(tokens[i]);
        } else {
            let b = Number(s.pop());  // Second operand
            let a = Number(s.pop());  // First operand
            let res;

            if (tokens[i] === '+') res = a + b;
            else if (tokens[i] === '-') res = a - b;
            else if (tokens[i] === '*') res = a * b;
            else if (tokens[i] === '/') res = Math.trunc(a / b); // Truncate toward zero

            s.push(res);
        }
    }

    return s.pop();
};
```

### ✅ Why `Math.trunc` instead of `Math.floor`?

- `Math.floor(-7 / 2)` gives `-4` (rounds down to more negative).
- `Math.trunc(-7 / 2)` gives `-3` (removes the decimal part and moves toward zero).

In most RPN problems (like LeetCode), division truncates toward zero.

### ✅ Why `!['+', '-', '*', '/'].includes(tokens[i])`?
- We're checking if the token is **not an operator**, meaning it's an operand.
- Using `.includes()` is a concise way to check membership.
- `!` negates the condition so that only numbers are pushed.

---

## Array-Based Approach (Mimicking Stack Without `pop()`)

```javascript
var evalRPN = function(tokens) {
    let temp = [];

    for (let i = 0; i < tokens.length; i++) {
        if (!['+', '-', '*', '/'].includes(tokens[i])) {
            temp.push(tokens[i]);
        } else {
            let len = temp.length;
            let a = Number(temp[len - 2]);
            let b = Number(temp[len - 1]);
            let res;

            if (tokens[i] === '+') res = a + b;
            else if (tokens[i] === '-') res = a - b;
            else if (tokens[i] === '*') res = a * b;
            else if (tokens[i] === '/') res = Math.trunc(a / b);

            temp.splice(len - 2, 2); // Remove last two elements
            temp.push(res);
        }
    }

    return Number(temp[0]);
};
```

### ✅ Explanation of `splice(len - 2, 2)`
- `len - 2` points to the **second last element**.
- We're removing 2 elements: the last two operands used.
- Then, we push the computed result back into the array.

This approach avoids using `pop()` but behaves like a stack.

✅ Approach 4: Using a Map of Operators
Clean and more extensible using a map (object) to store operator logic:

javascript
Copy
Edit
var evalRPN = function(tokens) {
    const ops = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b),
    };

    const stack = [];

    for (let token of tokens) {
        if (ops[token]) {
            const b = stack.pop();
            const a = stack.pop();
            stack.push(ops[token](a, b));
        } else {
            stack.push(Number(token));
        }
    }

    return stack.pop();
};
🔍 Why Use This?
Clean, readable, scalable.

Easy to extend (e.g., add new operators like %, ^, etc.).

Avoids long chains of if/else.

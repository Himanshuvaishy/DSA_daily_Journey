
# Reverse Polish Notation (RPN) Evaluation

## Stack-Based Approach (Standard)

### Code:
```javascript
var evalRPN = function(tokens) {
    let s = [];

    for (let i = 0; i < tokens.length; i++) {
        if (!['+', '-', '*', '/'].includes(tokens[i])) {
            s.push(tokens[i]);
        } else {
            let b = Number(s.pop());  // b is second operand
            let a = Number(s.pop());  // a is first operand
            let res;

            if (tokens[i] === '+') res = a + b;
            else if (tokens[i] === '-') res = a - b;
            else if (tokens[i] === '*') res = a * b;
            else if (tokens[i] === '/') res = Math.trunc(a / b); // truncates toward zero

            s.push(res);
        }
    }

    return s.pop();
};
```

### Explanation:
- We push numbers to the stack.
- On encountering an operator, pop last two numbers and apply the operation.
- `Math.trunc` is used instead of `Math.floor` to mimic integer division like in languages such as C++/Java.

### Difference: `Math.floor` vs `Math.trunc`
- `Math.floor(-3.5)` gives `-4` (rounds **downward** to the nearest integer)
- `Math.trunc(-3.5)` gives `-3` (simply removes the decimal part)

We use `Math.trunc` because we want to discard the decimal part and not always round toward `-∞`.

---

## Array-Based Approach (Mimicking Stack)

### Code:
```javascript
var evalRPN = function(tokens) {
    let temp = [];

    for (let token of tokens) {
        if (!['+', '-', '*', '/'].includes(token)) {
            temp.push(token);
        } else {
            let len = temp.length;
            let a = Number(temp[len - 2]);
            let b = Number(temp[len - 1]);
            let res = 0;

            if (token === '+') res = a + b;
            else if (token === '-') res = a - b;
            else if (token === '*') res = a * b;
            else if (token === '/') res = Math.trunc(a / b);

            temp.splice(len - 2, 2); // remove last two elements
            temp.push(res);          // push result back
        }
    }

    return Number(temp[0]);
};
```

### Explanation:
- We directly access the last two elements using indices instead of `pop()`.
- `splice(len - 2, 2)` removes the last two elements (second last and last).
- Then we push the result back to simulate stack behavior.

---

## Polish Notation (Prefix Evaluation)

### Code:
```javascript
var evalPolish = function(tokens) {
    let i = tokens.length - 1;

    function helper() {
        let token = tokens[i--];
        if (!['+', '-', '*', '/'].includes(token)) return Number(token);

        let a = helper();
        let b = helper();

        if (token === '+') return a + b;
        if (token === '-') return a - b;
        if (token === '*') return a * b;
        if (token === '/') return Math.trunc(a / b);
    }

    return helper();
};
```

### Explanation:
- We traverse from right to left (since Polish Notation is prefix).
- If token is number, return it.
- If token is operator, evaluate next two recursive calls.

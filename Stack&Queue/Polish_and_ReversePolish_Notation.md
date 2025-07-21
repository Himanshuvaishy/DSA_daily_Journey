
# Polish and Reverse Polish Notation (RPN) - Evaluation Approaches

## 🔄 Reverse Polish Notation (Postfix)

### Problem Statement:
Evaluate an arithmetic expression in Reverse Polish Notation. Valid operators are +, -, *, /. Each operand may be an integer or another expression.

Example:  
Input: `["2", "1", "+", "3", "*"]`  
Output: `9`  
Explanation: (2 + 1) * 3 = 9

---

### ✅ Stack-Based Approach

#### Code:
```javascript
var evalRPN = function(tokens) {
    let s = [];

    for (let i = 0; i < tokens.length; i++) {
        if (!['+', '-', '*', '/'].includes(tokens[i])) {
            s.push(tokens[i]);
        } else {
            let b = Number(s.pop());  // second operand
            let a = Number(s.pop());  // first operand
            let res;

            if (tokens[i] === '+') res = a + b;
            else if (tokens[i] === '-') res = a - b;
            else if (tokens[i] === '*') res = a * b;
            else if (tokens[i] === '/') res = Math.trunc(a / b); // truncate toward 0

            s.push(res);
        }
    }

    return s.pop();
};
```

#### ✅ Explanation:
- We use a stack to store operands.
- When an operator is found, we pop last two operands, apply the operation and push result back.
- Use `Math.trunc()` instead of `Math.floor()`:
  - `Math.trunc()` truncates toward 0.
  - `Math.floor()` always rounds down, which causes incorrect results for negative division.

---

### 🧠 Alternate Array Approach (Mimicking Stack)

#### Code:
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

            temp.splice(len - 2, 2); // remove last two elements
            temp.push(res);
        }
    }

    return Number(temp[0]);
};
```

#### ✅ Explanation:
- Uses a normal array like stack.
- Instead of popping, we directly use indices and splice out last two elements.
- `splice(len - 2, 2)` removes last two numbers.
- Same operator logic and truncation.

---

## 📌 Polish Notation (Prefix)

### Problem Statement:
Evaluate an expression in Polish Notation (prefix).

Example:  
Input: `["*", "+", "2", "1", "3"]`  
Output: `9`  
Explanation: * ( + 2 1 ) 3 = 9

---

### ✅ Recursive Approach

#### Code:
```javascript
function evalPolish(tokens) {
    let i = 0;

    function helper() {
        const token = tokens[i++];
        if (!['+', '-', '*', '/'].includes(token)) return Number(token);

        const a = helper();  // First operand
        const b = helper();  // Second operand

        if (token === '+') return a + b;
        if (token === '-') return a - b;
        if (token === '*') return a * b;
        if (token === '/') return Math.trunc(a / b);
    }

    return helper();
}
```

#### ✅ Explanation:
- Uses recursion to evaluate the expression from left to right.
- When operator is encountered, recursively evaluate next two operands.
- The order of evaluation matters (`a op b`).
- Use `Math.trunc()` for correct division behavior.

---

### 💡 Summary

| Feature | Reverse Polish Notation | Polish Notation |
|--------|--------------------------|------------------|
| Order | Operands then operator | Operator then operands |
| Common Use | Stack (LIFO) | Recursion or reversed stack |
| Edge Handling | Use `Math.trunc()` to truncate toward 0 | Same |
| Operator Handling | Check using `includes()` | Same |

---

✅ Both approaches require understanding operator precedence and operand ordering.  
✅ Prefer `Math.trunc()` over `Math.floor()` to ensure truncation **toward zero**, especially with **negative numbers**.

🧮 Time and Space Complexity
RPN (Reverse Polish Notation)
Time Complexity: O(n)
Iterate through all n tokens once.

Space Complexity: O(n)
In the worst case, all tokens are operands and stored in the stack.

Polish Notation (Prefix)
Time Complexity: O(n)
Same as RPN — single pass, just from right to left.

Space Complexity: O(n)
Stack stores operands and intermediate results.

✅ Notes
Use Math.trunc() to truncate division results toward zero (as required by most online judge problems).

Use splice() if mimicking stack behavior with arrays.

Avoid Math.floor() since it always rounds down, which is incorrect for negative results.

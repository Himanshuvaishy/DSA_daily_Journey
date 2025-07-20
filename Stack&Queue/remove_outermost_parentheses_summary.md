
# 🧠 Explanation of `Remove Outermost Parentheses` Problem

## 🎯 Goal

To remove the **outermost parentheses** from every **primitive** valid parentheses substring.

A **primitive** is a non-empty valid parentheses string that **cannot** be split into two non-empty valid parentheses substrings.

---

## ✅ Approach 1: Using Balance Counter (Efficient)

### 🔁 Core Logic

We iterate over the string while maintaining a `balance` counter:
- `balance++` when we see `'('`
- `balance--` when we see `')'`

When `balance === 0`, it means we have reached the end of a **complete primitive**.

### 📌 Code Snippet

```javascript
let result = "";
let balance = 0, start = 0;

for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') balance++;
    else balance--;

    if (balance === 0) {
        result += s.substring(start + 1, i);  // remove outer ()
        start = i + 1;
    }
}
```

### 🧪 Dry Run Example

For input: `s = "(()())(())"`

- First primitive: `"(()())"` → `"()()"`
- Second primitive: `"(())"` → `"()"`

✅ Final Output: `"()()()"`

---

## 🔁 Approach 2: Using Stack

### 👇 Logic

Use a stack to track parentheses. Append only if the stack depth is **not zero** (i.e., not outermost).

### 📌 Code Snippet

```javascript
let stack = [];
let ans = "";

for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
        if (stack.length > 0) ans += s[i];
        stack.push('(');
    } else {
        stack.pop();
        if (stack.length > 0) ans += s[i];
    }
}
```

✅ Only non-outer parentheses are included.

---

## 🔁 Approach 3: Level Counter (Same as Stack but More Space Efficient)

### 👇 Logic

Maintain a `level` variable instead of using a stack.

### 📌 Code Snippet

```javascript
let ans = "";
let level = 0;

for (let char of s) {
    if (char === '(') {
        if (level > 0) ans += char;
        level++;
    } else {
        level--;
        if (level > 0) ans += char;
    }
}
```

✅ This approach mimics stack logic but uses a counter for space optimization.

---

## 🧠 Final Thought

All three methods work effectively, but:

- ✅ **Balance counter**: Best for detecting full primitives.
- ✅ **Stack**: Intuitive and clean logic.
- ✅ **Level**: Optimized and clean for interview use.

---

🧾 Keep practicing! Each pattern builds your stack mastery. 💪

# 📌 Length of Last Word Problem (JavaScript)

## ❓ Problem Statement
Given a string `s` consisting of words and spaces, return the **length of the last word**.  
A word is defined as a sequence of **non-space characters**.

### Example
```js
Input: "Hello World"
Output: 5
```

---

## ✅ Approach 1: Using `trim()` + `split()`

### Code:
```js
function lengthOfLastWord(s) {
  let words = s.trim().split(" "); // remove extra spaces & split
  return words[words.length - 1].length;
}
```

### Dry Run:
`s = "   fly me   to   the moon  "`  
1. `s.trim()` → `"fly me   to   the moon"`  
2. `split(" ")` → `["fly", "me", "", "", "to", "", "", "the", "moon"]`  
3. Last word = `"moon"` → length = `4`  

✅ Output → `4`

---

## ✅ Approach 2: Traverse from End (Efficient, O(n))

### Code:
```js
function lengthOfLastWord(s) {
  let i = s.length - 1;
  let length = 0;

  // skip trailing spaces
  while (i >= 0 && s[i] === " ") i--;

  // count last word characters
  while (i >= 0 && s[i] !== " ") {
    length++;
    i--;
  }

  return length;
}
```

### Dry Run:
`s = "Hello World  "`  
1. Start from end → `i = 12` (last char is space).  
2. Skip spaces → stop at index `10` (`d`).  
3. Count chars backwards: `"World"` → `length = 5`.  
4. Stop when hit space at index `5`.  

✅ Output → `5`

---

## 🔄 Approach 2 (One Loop Variant)
We can solve it in **one loop** without separate skipping.

### Code:
```js
function lengthOfLastWord(s) {
  let length = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] !== " ") {
      length++;
    } else if (length > 0) {
      break;
    }
  }
  return length;
}
```

### Dry Run:
`s = "   fly me   to   the moon  "`  
1. Start from last index.  
2. Skip trailing spaces until `"n"` in `"moon"`.  
3. Count → `"moon"` → length = 4.  
4. When space found before `"moon"`, loop breaks.  

✅ Output → `4`

---

## ✅ Approach 3: Using `lastIndexOf` + `trim()`

### Code:
```js
function lengthOfLastWord(s) {
  s = s.trim();
  let lastSpace = s.lastIndexOf(" ");
  return s.length - lastSpace - 1;
}
```

### Dry Run:
`s = "Hello World"`  
1. `trim()` → `"Hello World"`  
2. `lastIndexOf(" ")` → `5`  
3. `s.length - lastSpace - 1 = 11 - 5 - 1 = 5`  

✅ Output → `5`

---

# ⚡ Summary
- **Approach 1 (split)** → Easy but uses extra memory.  
- **Approach 2 (two loops)** → Most optimal & efficient.  
- **Approach 2 (one loop)** → Same optimal but cleaner.  
- **Approach 3 (lastIndexOf)** → Short and neat.

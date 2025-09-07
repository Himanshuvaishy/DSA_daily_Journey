# 📘 Find Words Containing Character – Problem Solutions

## 🔹 Problem Statement  
You are given an array of words and a character `x`.  
Return all the **indices** of words that contain the character `x`.

### Example  
```js
words = ["leet","code"], x = "e"
Output: [0,1]
```
Because both `"leet"` and `"code"` contain `'e'`.

---

## ✅ Approach 1: Brute Force (Character by Character)

### Logic:
1. Iterate over each word.
2. For each word, iterate over every character.
3. If character matches `x`, push the index into result.
4. Break loop for that word since we only need index once.

### Code:
```js
function findWordsBruteForce(words, x) {
  let result = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      if (words[i][j] === x) {
        result.push(i);
        break;
      }
    }
  }
  return result;
}

console.log(findWordsBruteForce(["leet","code","apple","hi"], "e"));
// Output: [0,1,2]
```

### Dry Run:
- Input: `["leet","code","apple","hi"], x = "e"`  
- `i=0` → word = `"leet"`, check chars: `l, e` → found → push 0  
- `i=1` → word = `"code"`, chars: `c, o, d, e` → found → push 1  
- `i=2` → word = `"apple"`, chars: `a, p, p, l, e` → found → push 2  
- `i=3` → word = `"hi"`, chars: `h, i` → not found  
✅ Result = `[0,1,2]`

---

## ✅ Approach 2: Using `includes()`

### Logic:
- For each word, directly check if it contains `x` using `includes()`.

### Code:
```js
function findWordsIncludes(words, x) {
  let result = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].includes(x)) {
      result.push(i);
    }
  }
  return result;
}

console.log(findWordsIncludes(["leet","code","apple","hi"], "e"));
// Output: [0,1,2]
```

### Dry Run:
- `"leet".includes("e")` → true → push 0  
- `"code".includes("e")` → true → push 1  
- `"apple".includes("e")` → true → push 2  
- `"hi".includes("e")` → false  
✅ Result = `[0,1,2]`

---

## ✅ Approach 3: Functional Style (map + filter)

### Logic:
1. Use `map` to assign index if word includes `x`, else `-1`.
2. Use `filter` to remove `-1`.

### Code:
```js
function findWordsFunctional(words, x) {
  return words
    .map((word, index) => (word.includes(x) ? index : -1))
    .filter(index => index !== -1);
}

console.log(findWordsFunctional(["leet","code","apple","hi"], "e"));
// Output: [0,1,2]
```

### Dry Run:
- Map → `[0,1,2,-1]`  
- Filter removes `-1` → `[0,1,2]`

---

## ✅ Approach 4: One-Liner with `reduce`

### Logic:
- Use `reduce` to accumulate indices if word includes `x`.

### Code:
```js
function findWordsReduce(words, x) {
  return words.reduce((acc, word, idx) => {
    if (word.includes(x)) acc.push(idx);
    return acc;
  }, []);
}

console.log(findWordsReduce(["leet","code","apple","hi"], "e"));
// Output: [0,1,2]
```

### Dry Run:
- Start with `[]`  
- Word `"leet"` → contains `"e"` → `[0]`  
- Word `"code"` → contains `"e"` → `[0,1]`  
- Word `"apple"` → contains `"e"` → `[0,1,2]`  
- Word `"hi"` → no → `[0,1,2]`  

✅ Result = `[0,1,2]`

---

## ⚡ Time Complexity Analysis:
- **Brute Force**: O(n * m) (n = number of words, m = avg length of word).  
- **includes()**: O(n * m), but cleaner.  
- **map/filter/reduce**: Also O(n * m), but more functional style.  

👉 In interviews: Start with brute force → then optimize with `includes()`.  

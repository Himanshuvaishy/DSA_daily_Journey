# 📘 Jewels and Stones – Problem Solutions

## 🔹 Problem Statement  
You are given two strings:  
- `jewels`: characters representing the types of jewels  
- `stones`: characters representing the stones you have  

Return the number of stones that are also jewels.  

### Example  
```js
Input: jewels = "aA", stones = "aAAbbbb"
Output: 3
```

Explanation:  
- Jewels = {a, A}  
- Stones = "a", "A", "A", "b", "b", "b", "b"  
- Matches = 3  

---

## ✅ Approach 1: Brute Force (Nested Loops)

### Logic:
- For each stone, compare with every jewel.  

### Code:
```js
function numJewelsInStonesBrute(jewels, stones) {
  let count = 0;
  for (let i = 0; i < stones.length; i++) {
    for (let j = 0; j < jewels.length; j++) {
      if (stones[i] === jewels[j]) {
        count++;
        break;
      }
    }
  }
  return count;
}

console.log(numJewelsInStonesBrute("aA", "aAAbbbb")); // 3
```

### Dry Run:
- Stones = "a A A b b b b"  
- Check each stone against jewels "a A"  
- Count = 3  

⏱ Time Complexity → O(n * m)  

---

## ✅ Approach 2: Using `includes()`

### Logic:
- For each stone, check directly with `jewels.includes(ch)`  

### Code:
```js
function numJewelsInStonesIncludes(jewels, stones) {
  let count = 0;
  for (let ch of stones) {
    if (jewels.includes(ch)) count++;
  }
  return count;
}

console.log(numJewelsInStonesIncludes("aA", "aAAbbbb")); // 3
```

### Dry Run:
- "a" in "aA"? → yes → +1  
- "A" in "aA"? → yes → +1  
- "A" in "aA"? → yes → +1  
- "b" in "aA"? → no  
✅ Result = 3  

⏱ Time Complexity → O(n * m)  

---

## ✅ Approach 3: Using `Set` (Optimal)

### Logic:
- Convert jewels to a `Set` for O(1) lookup.  
- Count how many stones are in the set.  

### Code:
```js
function numJewelsInStonesSet(jewels, stones) {
  let jewelSet = new Set(jewels);
  let count = 0;
  for (let ch of stones) {
    if (jewelSet.has(ch)) count++;
  }
  return count;
}

console.log(numJewelsInStonesSet("aA", "aAAbbbb")); // 3
```

### Dry Run:
- jewelSet = {a, A}  
- Stones = "a A A b b b b"  
- Match = a, A, A → 3  

⏱ Time Complexity → O(n + m)  

---

## ✅ Approach 4: Reversed Set (Jewels in Stones)

### Logic:
- Store all **stones** in a Set.  
- Check jewels against it.  
⚠️ Only works for **unique jewel types**, not total count.  

### Code:
```js
function numJewelsTypes(jewels, stones) {
  let stoneSet = new Set(stones);
  let count = 0;
  for (let j of jewels) {
    if (stoneSet.has(j)) count++;
  }
  return count;
}

console.log(numJewelsTypes("aA", "aAAbbbb")); // 2 (not 3)
```

### Explanation:
- stoneSet = {a, A, b}  
- Jewels = {a, A} → both found → count = 2  
❌ Wrong if we want total jewels, but correct if problem was about **types**.

---

## ✅ Approach 5: Using `Map` for Frequency

### Logic:
- Count frequency of each stone using a `Map`.  
- Add frequencies for jewels.  

### Code:
```js
function numJewelsInStonesMap(jewels, stones) {
  let stoneMap = new Map();
  for (let ch of stones) {
    stoneMap.set(ch, (stoneMap.get(ch) || 0) + 1);
  }

  let count = 0;
  for (let j of jewels) {
    if (stoneMap.has(j)) count += stoneMap.get(j);
  }
  return count;
}

console.log(numJewelsInStonesMap("aA", "aAAbbbb")); // 3
```

### Dry Run:
- stoneMap = {a:1, A:2, b:4}  
- Jewels = a (1) + A (2) = 3  

⏱ Time Complexity → O(n + m)  

---

## ✅ Approach 6: Using Plain Object for Frequency

```js
function numJewelsInStonesObj(jewels, stones) {
  let freq = {};
  for (let ch of stones) {
    freq[ch] = (freq[ch] || 0) + 1;
  }

  let count = 0;
  for (let j of jewels) {
    if (freq[j]) count += freq[j];
  }
  return count;
}

console.log(numJewelsInStonesObj("aA", "aAAbbbb")); // 3
```

---

## ✅ Approach 7: One-Liner with `filter`

```js
function numJewelsInStonesFilter(jewels, stones) {
  let jewelSet = new Set(jewels);
  return [...stones].filter(ch => jewelSet.has(ch)).length;
}

console.log(numJewelsInStonesFilter("aA", "aAAbbbb")); // 3
```

---

# ⚡ Final Notes

| Approach | Use Case | Time | Space |
|----------|----------|------|-------|
| Brute Force | Easy but slow | O(n*m) | O(1) |
| includes() | Cleaner, still O(n*m) | O(n*m) | O(1) |
| Set | Best for existence | O(n+m) | O(m) |
| Reversed Set | Counts jewel types | O(n+m) | O(n) |
| Map / Object | Best for frequencies | O(n+m) | O(m) |
| filter | Concise one-liner | O(n+m) | O(m) |

👉 In interviews, explain Brute Force first, then optimize with `Set` or `Map`.  

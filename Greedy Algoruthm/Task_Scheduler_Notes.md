
# 🧠 Task Scheduler — Notes (with 3 Approaches)

### 📝 Problem Statement
You are given an array of tasks represented by capital letters (`A`–`Z`).  
Each task takes **1 unit of time**, and between **two same tasks** there must be at least `n` units of **cooldown** time.

Find the **minimum total time** to finish all tasks.

---

## 🔹 Example
```js
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation:
A -> B -> idle -> A -> B -> idle -> A -> B
```

---

## 🔹 Formula to Remember
The main logic is based on counting frequencies.

1. Find the **maximum frequency** `maxFreq` among tasks.
2. Count how many tasks have that same maximum frequency (`countMaxFreq`).
3. Formula:
   ```
   cycles = (maxFreq - 1) * (n + 1) + countMaxFreq
   answer = Math.max(tasks.length, cycles)
   ```
   - `(maxFreq - 1)` → number of full cycles
   - `(n + 1)` → each cycle length (task + n cooldown)
   - `countMaxFreq` → last group of max frequency tasks

---

## 🧩 Approach 1: Using Array (like your original solution)
```javascript
var leastInterval = function(tasks, n) {
    let freq = Array(26).fill(0); // For A-Z
    let maxFreq = 0;

    // Step 1: Count frequency
    for (let i = 0; i < tasks.length; i++) {
        let curr = tasks[i].charCodeAt() - 65;  // 'A' → 0, 'B' → 1 ...
        freq[curr]++;
        maxFreq = Math.max(maxFreq, freq[curr]);
    }

    // Step 2: Count how many have maxFreq
    let countMaxFreq = 0;
    for (let i = 0; i < 26; i++) {
        if (freq[i] === maxFreq) countMaxFreq++;
    }

    // Step 3: Apply formula
    let cycles = (maxFreq - 1) * (n + 1) + countMaxFreq;

    // Step 4: Final answer
    return Math.max(tasks.length, cycles);
};

// Example
console.log(leastInterval(["A","A","A","B","B","B"], 2)); // Output: 8
```

✅ **Time Complexity:** O(n + 26)  
✅ **Space Complexity:** O(26)  

---

## 🧩 Approach 2: Using Map
```javascript
var leastIntervalMap = function(tasks, n) {
    const freq = new Map();

    // Step 1: Count frequencies
    for (const t of tasks) {
        freq.set(t, (freq.get(t) || 0) + 1);
    }

    // Step 2: Find max frequency
    let maxFreq = 0;
    for (const v of freq.values()) {
        if (v > maxFreq) maxFreq = v;
    }

    // Step 3: Count how many tasks have max frequency
    let countMaxFreq = 0;
    for (const v of freq.values()) {
        if (v === maxFreq) countMaxFreq++;
    }

    // Step 4: Apply formula
    const cycles = (maxFreq - 1) * (n + 1) + countMaxFreq;
    return Math.max(tasks.length, cycles);
};

// Example
console.log(leastIntervalMap(["A","A","A","B","B","B"], 2)); // Output: 8
```

✅ **Time Complexity:** O(T + U)  
✅ **Space Complexity:** O(U) (U = unique tasks)  

---

## 🧩 Approach 3: Using Plain Object `{}`

```javascript
var leastIntervalObj = function(tasks, n) {
    const freq = {};

    // Step 1: Count frequencies
    for (const t of tasks) {
        freq[t] = (freq[t] || 0) + 1;
    }

    // Step 2: Find max frequency
    let maxFreq = 0;
    for (const key in freq) {
        if (freq[key] > maxFreq) maxFreq = freq[key];
    }

    // Step 3: Count how many have max frequency
    let countMaxFreq = 0;
    for (const key in freq) {
        if (freq[key] === maxFreq) countMaxFreq++;
    }

    // Step 4: Apply formula
    const cycles = (maxFreq - 1) * (n + 1) + countMaxFreq;
    return Math.max(tasks.length, cycles);
};

// Example
console.log(leastIntervalObj(["A","A","A","B","B","B"], 2)); // Output: 8
```

✅ **Time Complexity:** O(T + U)  
✅ **Space Complexity:** O(U)

---

## 🧮 Dry Run Example

For:  
`tasks = ["A","A","A","B","B","B"], n = 2`

| Task | Count |
|------|--------|
| A    | 3      |
| B    | 3      |

- `maxFreq = 3`
- `countMaxFreq = 2`
- `cycles = (3 - 1) * (2 + 1) + 2 = 8`
- `tasks.length = 6`
- `Answer = max(8, 6) = 8`

✅ **Final Output: 8**

---

## 📚 Summary Table

| Approach | Data Structure Used | Time | Space | Simplicity |
|-----------|--------------------|-------|--------|-------------|
| Array     | Fixed Array(26)    | O(n)  | O(26)  | Fastest for A–Z |
| Map       | Map                | O(n)  | O(U)   | Clean & modern |
| Object    | Plain Object `{}`  | O(n)  | O(U)   | Simple, readable |


# Longest Repeating Character Replacement

## Problem Statement
You are given a string `s` and an integer `k`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most `k` times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

**Example:**
```
Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the 'B' in "AABA" to get "AAAA".
```

---

## 1. Brute Force Approach

### Idea
- Generate all possible substrings of `s`.
- For each substring, count the frequency of each character.
- Find the most frequent character in that substring.
- Check if `(length of substring - max frequency) <= k`.
- Keep track of the maximum valid length.

### Pseudocode
```
maxLen = 0
for i from 0 to n-1:
    for j from i to n-1:
        freq = map of character counts in s[i:j]
        maxFreq = max(freq.values())
        if (substring length - maxFreq) <= k:
            maxLen = max(maxLen, substring length)
return maxLen
```

### Time Complexity
- O(n^3) in worst case (n^2 substrings × O(n) to count frequency).

---

## 2. Optimized Sliding Window Approach

### Idea
- Use two pointers `left` and `right` to maintain a window.
- Keep a frequency map of characters in the window.
- Track `maxFreq` (maximum frequency of any character in the current window).
- The number of replacements needed = `(window length - maxFreq)`.
- If replacements needed > k → shrink window from the left.
- Update the maximum length whenever we have a valid window.

### Code
```javascript
var characterReplacement = function(s, k) {
    let left = 0;
    let maxFreq = 0;
    let freqMap = {};
    let maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        let charRight = s[right];
        freqMap[charRight] = (freqMap[charRight] || 0) + 1;
        maxFreq = Math.max(maxFreq, freqMap[charRight]);

        while ((right - left + 1) - maxFreq > k) {
            let charLeft = s[left];
            freqMap[charLeft]--;
            left++;
        }

        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
};
```

### Time Complexity
- O(n) → each pointer moves at most `n` steps.

---

## 3. Dry Run for "AABABBA", k = 1

| Step | left | right | Window | freqMap             | maxFreq | WindowLen | Replacements Needed | maxLen |
|------|------|-------|--------|---------------------|---------|-----------|---------------------|--------|
| 1    | 0    | 0     | A      | {A:1}               | 1       | 1         | 0                   | 1      |
| 2    | 0    | 1     | AA     | {A:2}               | 2       | 2         | 0                   | 2      |
| 3    | 0    | 2     | AAB    | {A:2,B:1}           | 2       | 3         | 1                   | 3      |
| 4    | 0    | 3     | AABA   | {A:3,B:1}           | 3       | 4         | 1                   | 4      |
| 5    | 0    | 4     | AABAB  | {A:3,B:2}           | 3       | 5         | 2 (>k) → shrink     | 4      |
| 6    | 1    | 4     | ABAB   | {A:2,B:2}           | 3       | 4         | 2 (>k) → shrink     | 4      |
| 7    | 2    | 4     | BAB    | {A:1,B:2}           | 3       | 3         | 1                   | 4      |
| 8    | 2    | 5     | BABB   | {A:1,B:3}           | 3       | 4         | 1                   | 4      |
| 9    | 2    | 6     | BABBA  | {A:2,B:3}           | 3       | 5         | 2 (>k) → shrink     | 4      |
| 10   | 3    | 6     | ABBA   | {A:2,B:2}           | 3       | 4         | 2 (>k) → shrink     | 4      |
| 11   | 4    | 6     | BBA    | {A:1,B:2}           | 3       | 3         | 1                   | 4      |

**Final Answer:** 4

---

**Key Insight:**  
The trick is to allow the window to grow as long as the number of replacements needed ≤ k. When it exceeds, shrink from the left.
# Longest Repeating Character Replacement — Detailed Dry Run

We will dry run the optimized sliding window solution for:

```
s = "AABABBA"
k = 1
```

---

## **Variables meaning**
- `left`: start index of the current window.
- `right`: end index of the current window.
- `freqMap`: stores counts of characters in the window.
- `maxFreq`: highest frequency of a single character in the window.
- `maxLen`: length of the longest valid window found so far.
- **Condition for a valid window**:
```
(window size) - (maxFreq) <= k
```

---

## **Step-by-step Dry Run**

### Step 1: right = 0 (`A`)
- Add `A` → `freqMap = { A: 1 }`
- `maxFreq = max(0, 1) = 1`
- Window size = `0 - 0 + 1 = 1`
- Check: `1 - 1 = 0 <= 1` ✅ valid
- Update `maxLen = 1`

---

### Step 2: right = 1 (`A`)
- Add `A` → `freqMap = { A: 2 }`
- `maxFreq = max(1, 2) = 2`
- Window size = 2
- Check: `2 - 2 = 0 <= 1` ✅ valid
- Update `maxLen = 2`

---

### Step 3: right = 2 (`B`)
- Add `B` → `freqMap = { A: 2, B: 1 }`
- `maxFreq = max(2, 1) = 2`
- Window size = 3
- Check: `3 - 2 = 1 <= 1` ✅ valid
- Update `maxLen = 3`

---

### Step 4: right = 3 (`A`)
- Add `A` → `freqMap = { A: 3, B: 1 }`
- `maxFreq = max(2, 3) = 3`
- Window size = 4
- Check: `4 - 3 = 1 <= 1` ✅ valid
- Update `maxLen = 4`

---

### Step 5: right = 4 (`B`)
- Add `B` → `freqMap = { A: 3, B: 2 }`
- `maxFreq = max(3, 2) = 3`
- Window size = 5
- Check: `5 - 3 = 2 > 1` ❌ invalid → shrink from left

**Shrink process:**
- Remove `A` at `left = 0` → `freqMap = { A: 2, B: 2 }`
- Move `left` to 1
- New window size = `4`, check: `4 - 3 = 1 <= 1` ✅ valid

- `maxLen = max(4, 4) = 4`

---

### Step 6: right = 5 (`B`)
- Add `B` → `freqMap = { A: 2, B: 3 }`
- `maxFreq = max(3, 3) = 3`
- Window size = 5
- Check: `5 - 3 = 2 > 1` ❌ invalid → shrink

**Shrink process:**
- Remove `A` at `left = 1` → `freqMap = { A: 1, B: 3 }`
- Move `left` to 2
- New window size = 4, check: `4 - 3 = 1 <= 1` ✅ valid

- `maxLen = max(4, 4) = 4`

---

### Step 7: right = 6 (`A`)
- Add `A` → `freqMap = { A: 2, B: 3 }`
- `maxFreq = max(3, 2) = 3`
- Window size = 5
- Check: `5 - 3 = 2 > 1` ❌ invalid → shrink

**Shrink process:**
- Remove `B` at `left = 2` → `freqMap = { A: 2, B: 2 }`
- Move `left` to 3
- New window size = 4, check: `4 - 3 = 1 <= 1` ✅ valid

- `maxLen = max(4, 4) = 4`

---

## **Final Answer**
```
maxLen = 4
```
The longest valid substring has length **4**.

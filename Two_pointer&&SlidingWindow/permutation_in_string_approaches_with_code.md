# Permutation in String — All Approaches

We will explore **three approaches** to solve the "Permutation in String" problem:
1. **Brute Force**
2. **Array-based Sliding Window**
3. **Map-based Sliding Window**

---

## 1. Brute Force Approach

### Idea
Check every substring of `s2` with the same length as `s1`, sort both strings, and see if they match.

### Time Complexity
- Sorting each substring takes `O(m log m)`.
- We do this for `n - m + 1` substrings.
- Total: **O((n - m + 1) * m log m)**.

### Code
```javascript
function checkInclusion(s1, s2) {
    let len1 = s1.length;
    let sortedS1 = s1.split('').sort().join('');
    
    for (let i = 0; i <= s2.length - len1; i++) {
        let substring = s2.substring(i, i + len1);
        let sortedSub = substring.split('').sort().join('');
        if (sortedSub === sortedS1) return true;
    }
    return false;
}
```

### Dry Run
**Input:** s1 = "ab", s2 = "eidbaooo"

1. sortedS1 = `"ab"`  
2. Loop through `s2` substrings of length 2:
   - i = 0 → substring `"ei"`, sorted `"ei"` → not match
   - i = 1 → substring `"id"`, sorted `"di"` → not match
   - i = 2 → substring `"db"`, sorted `"bd"` → not match
   - i = 3 → substring `"ba"`, sorted `"ab"` → match → return true

---

## 2. Array-based Sliding Window

### Idea
Use an array of size 26 to count character frequencies for `s1` and for the current window in `s2`.  
Slide the window one char at a time, updating counts, and check if arrays match.

### Time Complexity
- Building counts: `O(m)`
- Sliding window: `O(n)` with comparison `O(26)` each step.
- Total: **O(n)**.

### Code
```javascript
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;
    let hashS = Array(26).fill(0);
    let hashW = Array(26).fill(0);
    let windowLength = s1.length;
    
    for (let i = 0; i < windowLength; i++) {
        hashS[s1.charCodeAt(i) - 97]++;
        hashW[s2.charCodeAt(i) - 97]++;
    }
    
    let i = 0;
    let j = windowLength - 1;
    while (j < s2.length) {
        if (isHashSame(hashS, hashW)) return true;
        hashW[s2.charCodeAt(i) - 97]--;
        i++;
        j++;
        if (j < s2.length) {
            hashW[s2.charCodeAt(j) - 97]++;
        }
    }
    return false;
};

var isHashSame = function(hashS, hashW) {
    for (let i = 0; i < 26; i++) {
        if (hashS[i] !== hashW[i]) return false;
    }
    return true;
};
```

### Dry Run
**Input:** s1 = "ab", s2 = "eidbaooo"

- hashS after setup: `[1,1,0,...]` (a:1, b:1)
- hashW after first window "ei": `[0,0,...,1(e),1(i),...]` → not match
- Slide:
  - Remove 'e', add 'd'
  - Remove 'i', add 'b'
  - hashW matches hashS when window = "ba" → return true

---

## 3. Map-based Sliding Window

### Idea
Instead of fixed array, use a Map to store counts. Works for Unicode too.  
Maintain a count of matching characters.

### Time Complexity
- Similar to array-based: **O(n)**.

### Code
```javascript
var checkInclusion = function(s1, s2) {
    if (s1.length > s2.length) return false;
    let need = new Map();
    for (let c of s1) {
        need.set(c, (need.get(c) || 0) + 1);
    }
    
    let window = new Map();
    let left = 0, right = 0, valid = 0;
    
    while (right < s2.length) {
        let c = s2[right];
        right++;
        if (need.has(c)) {
            window.set(c, (window.get(c) || 0) + 1);
            if (window.get(c) === need.get(c)) valid++;
        }
        
        while (right - left >= s1.length) {
            if (valid === need.size) return true;
            let d = s2[left];
            left++;
            if (need.has(d)) {
                if (window.get(d) === need.get(d)) valid--;
                window.set(d, window.get(d) - 1);
            }
        }
    }
    return false;
};
```

### Dry Run
**Input:** s1 = "ab", s2 = "eidbaooo"

1. need = {a:1, b:1}, valid = 0
2. Expand window:
   - 'e' not in need → skip
   - 'i' not in need → skip
   - 'd' not in need → skip
   - 'b' in need → count = 1 matches need → valid++
   - 'a' in need → count = 1 matches need → valid++ (valid=2, need.size=2 → match found)
3. Return true

---
**Summary Table:**

| Approach        | Complexity | Space  | Suitable for |
|----------------|------------|--------|--------------|
| Brute Force    | O(m log m * (n - m)) | O(1) | Small strings |
| Array-based    | O(n)       | O(26)  | Lowercase a-z |
| Map-based      | O(n)       | O(k)   | Any char set |


# Longest Substring Without Repeating Characters

## Problem Statement
Given a string `s`, find the length of the **longest substring** without repeating characters.

---

## Approach (Two Pointers + Hash Map)

We use two pointers `i` and `j` to form a sliding window that keeps track of the current substring without repeating characters.

### Steps:
1. Create a hash map `map` to store the most recent index of each character.
2. Start both `i` and `j` at `0`.
3. Move `j` through the string:
   - If `s[j]` is already in the map and its index is **greater than or equal to** `i`, then we have found a repeating character **within the window**.
   - Move `i` to `map[s[j]] + 1` (just after the last occurrence of the repeated character).
4. Update the hash map with the current character's latest index.
5. Calculate the current window size `j - i + 1` and update `maxWS` (maximum window size).
6. Continue until `j` reaches the end.

---

## Code Implementation (JavaScript)
```javascript
var lengthOfLongestSubstring = function(s) {
    let map = new Map();
    let i = 0, maxWS = 0;

    for (let j = 0; j < s.length; j++) {
        if (map.has(s[j]) && map.get(s[j]) >= i) {
            i = map.get(s[j]) + 1;
        }
        map.set(s[j], j);
        maxWS = Math.max(maxWS, j - i + 1);
    }

    return maxWS;
};
```

---

## Dry Run Example

### Input:
```
s = "abcabcbb"
```

| j | s[j] | map before | i  | Action | map after | Window | maxWS |
|---|------|------------|----|--------|-----------|--------|-------|
| 0 | a    | {}         | 0  | Add    | {a:0}     | "a"    | 1     |
| 1 | b    | {a:0}      | 0  | Add    | {a:0,b:1} | "ab"   | 2     |
| 2 | c    | {a:0,b:1}  | 0  | Add    | {a:0,b:1,c:2} | "abc" | 3     |
| 3 | a    | {...}      | 0  | Move i to 1 | {a:3,b:1,c:2} | "bca" | 3 |
| 4 | b    | {...}      | 1  | Move i to 2 | {a:3,b:4,c:2} | "cab" | 3 |
| 5 | c    | {...}      | 2  | Move i to 3 | {a:3,b:4,c:5} | "abc" | 3 |
| 6 | b    | {...}      | 3  | Move i to 5 | {a:3,b:6,c:5} | "cb"  | 3 |
| 7 | b    | {...}      | 5  | Move i to 7 | {a:3,b:7,c:5} | "b"   | 3 |

Final Answer: **3**

---

## Time Complexity:
- **O(n)** — Each character is visited at most twice.

## Space Complexity:
- **O(min(n, charset))** — Hash map to store character positions.

using normal map

var lengthOfLongestSubstring = function(s) {
    let map = {}; // normal object

    let i = 0;
    let maxWS = 0;

    for (let j = 0; j < s.length; j++) {
        // If current char exists in map and is inside the current window
        if (map[s[j]] !== undefined && map[s[j]] >= i) {
            i = map[s[j]] + 1; // move start pointer
        }
        map[s[j]] = j; // update last index of current char

        maxWS = Math.max(maxWS, j - i + 1);
    }

    return maxWS;
};
✅ Changes from Map version

map is now a plain object {}.

Instead of map.has(s[j]), we use map[s[j]] !== undefined.

Instead of map.get(s[j]), we use map[s[j]].

Instead of map.set(s[j], j), we use map[s[j]] = j.
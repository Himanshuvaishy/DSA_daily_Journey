# Palindrome Partitioning — Backtracking (Full Notes + Tree + Dry Run)

## 🧩 Problem
Given a string `s`, partition `s` such that **every substring of the partition is a palindrome**.  
Return **all possible palindrome partitionings**.

### Example
```
Input:  s = "aab"
Output:
[
  ["a","a","b"],
  ["aa","b"]
]
```

---

# 1️⃣ Backtracking Structure (Our Standard Template)

### **State**
- `path` → current list of palindromic substrings
- `start` → index in string from where we try partitions

### **Goal**
When:
```
start === s.length
```
→ full string is consumed → save a copy of `path`.

### **Choices**
For a given `start`, try all substrings:
```
s[start .. end]  where end = start → s.length - 1
```
Choose the substring **only if it is a palindrome**.

### **Pattern**
```
choose → explore → un-choose
```

---

# 2️⃣ JavaScript Solution (Clean Backtracking)

```js
var partition = function(s) {
    const result = [];

    function isPalindrome(left, right) {
        while (left < right) {
            if (s[left] !== s[right]) return false;
            left++;
            right--;
        }
        return true;
    }

    function backtrack(start, path) {
        if (start === s.length) {
            result.push([...path]);
            return;
        }

        for (let end = start; end < s.length; end++) {
            if (!isPalindrome(start, end)) continue;

            path.push(s.substring(start, end + 1)); // choose
            backtrack(end + 1, path);                // explore
            path.pop();                              // un-choose
        }
    }

    backtrack(0, []);
    return result;
};
```

---

# 3️⃣ Full Recursion Tree (s = "aab")

Index reference:
```
0   1   2
a   a   b
```

Tree diagram:

```
start=0
│
├── "a" (0..0)
│    │
│    ├── "a" (1..1)
│    │     │
│    │     └── "b" (2..2)
│    │           → ["a","a","b"] ✅
│    │
│    └── "ab" ❌ (not palindrome)
│
├── "aa" (0..1)
│    │
│    └── "b" (2..2)
│          → ["aa","b"] ✅
│
└── "aab" ❌ (not palindrome)
```

---

# 4️⃣ Step-by-Step Dry Run

### Call 1
```
backtrack(0, [])
```

Try substrings from index 0:

---

### Choose "a" (0..0)
```
path = ["a"]
backtrack(1, ["a"])
```

---

### Choose "a" (1..1)
```
path = ["a","a"]
backtrack(2, ["a","a"])
```

---

### Choose "b" (2..2)
```
path = ["a","a","b"]
backtrack(3, ["a","a","b"])
```

`start === s.length` → SAVE

---

### Backtrack
Pop "b" → pop "a"

---

### Choose "aa" (0..1)
```
path = ["aa"]
backtrack(2, ["aa"])
```

---

### Choose "b"
```
path = ["aa","b"]
start === s.length → SAVE
```

---

# 5️⃣ Final Output
```
[
  ["a","a","b"],
  ["aa","b"]
]
```

---

# 6️⃣ Key Observations

### ✔ `start` ensures characters are not reused
### ✔ Palindrome check filters invalid branches early
### ✔ Every path from root → leaf forms a valid partition
### ✔ Same backtracking structure as:
- Subsets
- Letter Combinations
- Combination Sum

---

# 7️⃣ Time & Space Complexity

- Time: O(N · 2^N) (all possible partitions + palindrome checks)
- Space: O(N) recursion depth (excluding output)

---

# 8️⃣ Universal Backtracking Template (Palindrome Problems)

```
function backtrack(start, path):
    if start == n:
        save path

    for end from start to n-1:
        if isValid(start, end):
            choose
            backtrack(end+1)
            unchoose
```

---

If you want, I can also generate:
✅ DP-optimized palindrome partitioning  
✅ Interactive tree visualizer  
✅ Notes for harder inputs like "banana"

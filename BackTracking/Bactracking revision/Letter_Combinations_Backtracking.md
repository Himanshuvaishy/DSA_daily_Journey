# Letter Combinations of a Phone Number — Backtracking (Full Notes + Tree + Dry Run)

## 🧩 Problem  
Given a string of digits `2-9`, return **all possible letter combinations** based on a phone keypad.

Example:
```
Input: "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

---

# 1️⃣ Backtracking Structure (Same Template You Use)

### **State**
- `path` → current set of letters (array)
- `index` → current digit position

### **Goal**
If:
```
index === digits.length
```
→ we formed a valid string → push `path.join("")`.

### **Choices**
At each digit:
```
choices = letters[digits[index]]
```
Each choice is a letter like `a, b, c`.

### **Pattern**
```
choose → explore → un-choose
```

---

# 2️⃣ JavaScript Code

```js
var letterCombinations = function(digits) {
    if (!digits.length) return [];

    const letters = {
        2: "abc",
        3: "def",
        4: "ghi",
        5: "jkl",
        6: "mno",
        7: "pqrs",
        8: "tuv",
        9: "wxyz"
    };

    const result = [];

    function backtrack(path, index) {
        if (index === digits.length) {
            result.push(path.join(""));
            return;
        }

        let choices = letters[digits[index]];
        for (let i = 0; i < choices.length; i++) {
            path.push(choices[i]);          // choose
            backtrack(path, index + 1);      // explore
            path.pop();                      // un-choose
        }
    }

    backtrack([], 0);
    return result;
};
```

---

# 3️⃣ Full Recursion Tree (digits = "23")

Digit → letters mapping  
```
'2' → [a, b, c]
'3' → [d, e, f]
```

Tree:

```
                        "" (start)
             /             |              \
           a               b               c
       /   |   \       /   |   \       /   |   \\
      d    e    f     d    e    f     d    e    f

Leaf paths → Output:
ad, ae, af, bd, be, bf, cd, ce, cf
```

Each LEVEL = one digit  
Each BRANCH = one letter choice  

---

# 4️⃣ Dry Run for Input "23"

### Start
```
path = []
index = 0
digit = '2' → "abc"
```

---

## i = 0 → choose 'a'
```
path = ['a']
backtrack(['a'], 1)
```

Digit `'3'` → letters "def"

### choose 'd'
```
path = ['a','d']
index = 2 → full → PUSH "ad"
```

Pop → `['a']`

### choose 'e'
```
path = ['a','e'] → PUSH "ae"
```

Pop → `['a']`

### choose 'f'
```
path = ['a','f'] → PUSH "af"
```

Return.

---

## i = 1 → choose 'b'
Produces:
```
bd, be, bf
```

---

## i = 2 → choose 'c'
Produces:
```
cd, ce, cf
```

---

# 5️⃣ Final Output
```
["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

---

# 6️⃣ Why This Problem Is Perfect for Backtracking

✔ Each digit = level in the decision tree  
✔ Each letter = choice at that level  
✔ Every path from root → leaf = 1 valid combination  
✔ No need for sorting or duplicate skipping  
✔ Same structure as:
- Subsets  
- Permutations  
- Combination Sum  
- Subset II  
- Combination Sum II  
- Combination Sum III  

---

# 7️⃣ Summary Table

| Concept | Meaning |
|--------|---------|
| State | `path`, `index` |
| Goal | `index === digits.length` |
| Choices | `letters[digits[index]]` |
| Move | `backtrack(index + 1)` |
| Undo | `path.pop()` |

---

If you want, I can generate:  
✅ A **visual animation-friendly** tree  

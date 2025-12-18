# Word Search — DFS + Backtracking (Using OUR Backtracking Structure)

## 🧩 Problem Statement
Given an `m x n` grid of characters `board` and a string `word`, return **true** if `word` exists in the grid.

Rules:
- Letters must be connected **horizontally or vertically**
- The **same cell cannot be reused**
- Characters must match **sequentially**

---

## Example
```
board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
]

word = "ABCCED"
Output = true
```

---

# 1️⃣ OUR Backtracking Structure (Mapped Perfectly)

### **State**
- `(x, y)` → current cell position
- `index` → index of character we are matching in `word`

### **Goal**
When:
```
index === word.length
```
→ all characters matched → return `true`

### **Choices**
From `(x, y)` we can move in **4 directions**:
```
Right  → (x, y+1)
Left   → (x, y-1)
Down   → (x+1, y)
Up     → (x-1, y)
```

Only move if:
- Cell is inside the grid
- Cell matches `word[index]`
- Cell is not already visited

### **Constraint**
A cell **cannot be reused**, so we temporarily mark it as visited.

### **Pattern**
```
choose → explore → un-choose
```

---

# 2️⃣ JavaScript Code (Clean Backtracking)

```js
var exist = function(board, word) {
    const m = board.length;
    const n = board[0].length;

    function backtrack(x, y, index) {
        // GOAL
        if (index === word.length) return true;

        // boundary + mismatch + visited check
        if (
            x < 0 || y < 0 ||
            x >= m || y >= n ||
            board[x][y] !== word[index]
        ) return false;

        // choose
        const temp = board[x][y];
        board[x][y] = "#";

        // explore
        const found =
            backtrack(x, y + 1, index + 1) ||
            backtrack(x, y - 1, index + 1) ||
            backtrack(x + 1, y, index + 1) ||
            backtrack(x - 1, y, index + 1);

        // un-choose
        board[x][y] = temp;

        return found;
    }

    // try each cell as starting point
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (backtrack(i, j, 0)) return true;
        }
    }

    return false;
};
```

---

# 3️⃣ Dry Run (Step-by-Step)

### Word: `"ABCCED"`

Grid:
```
A B C E
S F C S
A D E E
```

### Start
```
backtrack(0,0,0) → 'A'
```

### Path Explored
```
(0,0) 'A'
→ (0,1) 'B'
→ (0,2) 'C'
→ (1,2) 'C'
→ (2,2) 'E'
→ (2,1) 'D'
```

At this point:
```
index === word.length → return true
```

All recursive calls unwind and restore the board.

---

# 4️⃣ Full Decision Tree (ABCCED)

```
A(0,0)
 └─ B(0,1)
     └─ C(0,2)
         └─ C(1,2)
             └─ E(2,2)
                 └─ D(2,1) ✅
```

---

# 5️⃣ Why This Is Backtracking (Not Just DFS)

| Concept | How it applies |
|------|----------------|
| Choose | Mark cell as visited |
| Explore | Try 4 directions |
| Un-choose | Restore cell |
| Pruning | Stop on mismatch/bounds |
| Goal | index === word.length |

This matches **exactly** the same structure you used in:
- Palindrome Partitioning
- Letter Combinations
- Combination Sum

---

# 6️⃣ Time & Space Complexity

- **Time:** `O(m · n · 4^L)` where `L = word.length`
- **Space:** `O(L)` recursion stack

---

# 7️⃣ Key Takeaways

✔ Always return boolean from backtracking  
✔ Stop recursion immediately when goal is reached  
✔ Restore state after each recursive path  
✔ Never reuse a visited cell  

---

## Universal Backtracking Template (Grid Problems)

```
function backtrack(state):
    if goal reached:
        return true

    for each valid choice:
        choose
        if backtrack(nextState):
            return true
        un-choose

    return false
```

---

If you want next:
✅ Interactive grid visualizer  
✅ More grid backtracking problems (Rat in Maze, N-Queens)  
✅ Backtracking Master Notes (all patterns)

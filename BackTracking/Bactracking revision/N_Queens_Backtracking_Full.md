# N-Queens — Backtracking (OUR Structure + Full Recursion Tree)

## 🧩 Problem Statement
The **N-Queens** puzzle is the problem of placing `n` queens on an `n × n` chessboard such that **no two queens attack each other**.

Rules:
- No two queens share the same **row**
- No two queens share the same **column**
- No two queens share the same **diagonal**

---

## Example
```
Input: n = 4

Output:
[
  [".Q..","...Q","Q...","..Q."],
  ["..Q.","Q...","...Q",".Q.."]
]
```

---

# 1️⃣ OUR Backtracking Structure (Mapped to N-Queens)

### ✅ State
At each recursive call:
- `row` → current row to place a queen
- `board` → current board configuration
- `colSet` → columns already occupied
- `digSet` → diagonals (row - col)
- `antiDigSet` → anti-diagonals (row + col)

---

### 🎯 Goal
```
row === n
```
All rows filled → valid configuration → save solution.

---

### 🔀 Choices
For each row, try every column:
```
col = 0 .. n-1
```

---

### 🚫 Constraints (Pruning)
Skip placement if:
```
colSet.has(col) ||
digSet.has(row - col) ||
antiDigSet.has(row + col)
```

---

### 🔁 Pattern
```
choose → explore → un-choose
```

---

# 2️⃣ JavaScript Solution (Clean Backtracking)

```js
var solveNQueens = function(n) {
    const result = [];
    const board = Array.from({ length: n }, () => Array(n).fill("."));

    function backtrack(row, colSet, digSet, antiDigSet) {
        if (row === n) {
            result.push(board.map(r => r.join("")));
            return;
        }

        for (let col = 0; col < n; col++) {
            if (
                colSet.has(col) ||
                digSet.has(row - col) ||
                antiDigSet.has(row + col)
            ) continue;

            board[row][col] = "Q";
            colSet.add(col);
            digSet.add(row - col);
            antiDigSet.add(row + col);

            backtrack(row + 1, colSet, digSet, antiDigSet);

            board[row][col] = ".";
            colSet.delete(col);
            digSet.delete(row - col);
            antiDigSet.delete(row + col);
        }
    }

    backtrack(0, new Set(), new Set(), new Set());
    return result;
};
```

---

# 3️⃣ FULL RECURSION TREE (n = 4)

Legend:
- `(r,c)` → queen placed at row r, column c
- ❌ → invalid / pruned branch
- ✅ → valid solution

```
Row 0
├── (0,0)
│   ├── (1,0) ❌
│   ├── (1,1) ❌
│   ├── (1,2)
│   │   ├── (2,0) ❌
│   │   ├── (2,1)
│   │   │   ├── (3,0) ❌
│   │   │   ├── (3,1) ❌
│   │   │   ├── (3,2) ❌
│   │   │   └── (3,3) ❌
│   │   ├── (2,2) ❌
│   │   └── (2,3)
│   │       ├── (3,0) ✅ Solution 1
│   │       ├── (3,1) ❌
│   │       ├── (3,2) ❌
│   │       └── (3,3) ❌
│   └── (1,3)
│       ├── (2,0)
│       │   ├── (3,0) ❌
│       │   ├── (3,1) ❌
│       │   ├── (3,2) ✅ Solution 2
│       │   └── (3,3) ❌
│       └── other cols ❌
├── (0,1)
│   └── symmetric exploration (mirror of (0,2))
├── (0,2)
│   └── symmetric exploration (mirror of (0,1))
└── (0,3)
    └── symmetric exploration (mirror of (0,0))
```

---

# 4️⃣ Solutions Explained

### ✅ Solution 1
```
.Q..
...Q
Q...
..Q.
```

### ✅ Solution 2
```
..Q.
Q...
...Q
.Q..
```

---

# 5️⃣ Why This Is Pure Backtracking

| Concept | Meaning |
|------|---------|
| Level | Row |
| Choice | Column |
| Constraint | Column + diagonals |
| Choose | Place queen |
| Un-choose | Remove queen |
| Goal | All rows filled |

This structure is identical to:
- Palindrome Partitioning
- Word Search
- Combination Sum
- Letter Combinations

---

# 6️⃣ Time & Space Complexity

- **Time:** `O(n!)`
- **Space:** `O(n²)` for board + recursion stack

---

# 7️⃣ Universal Row-wise Backtracking Template

```
backtrack(row):
    if row == n:
        save solution
        return

    for col in 0..n-1:
        if safe:
            choose
            backtrack(row+1)
            un-choose
```

---

These notes + tree give a **complete mental model** for solving N-Queens using backtracking.

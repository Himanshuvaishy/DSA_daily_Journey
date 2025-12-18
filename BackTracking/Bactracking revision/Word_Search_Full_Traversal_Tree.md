# Word Search — Full Grid Traversal Tree (DFS + Backtracking)

## 🧩 Problem
Word Search using DFS + Backtracking.

```
word = "ABCCED"
```

Grid with coordinates:
```
(0,0) A   (0,1) B   (0,2) C   (0,3) E
(1,0) S   (1,1) F   (1,2) C   (1,3) S
(2,0) A   (2,1) D   (2,2) E   (2,3) E
```

---

## 🔹 Valid starting cells
Only cells matching the first character `'A'` can start DFS:

```
(0,0) and (2,0)
```

---

# 🌳 FULL GRID TRAVERSAL TREE — Starting from (0,0)

```
Start
└── (0,0) 'A' [index=0]
    │
    ├── Right → (0,1) 'B' [index=1]
    │       │
    │       ├── Right → (0,2) 'C' [index=2]
    │       │       │
    │       │       ├── Right → (0,3) 'E' ❌ (needs 'C')
    │       │       ├── Left  → visited ❌
    │       │       ├── Up    → out ❌
    │       │       │
    │       │       └── Down → (1,2) 'C' [index=3]
    │       │               │
    │       │               ├── Right → (1,3) 'S' ❌ (needs 'E')
    │       │               ├── Left  → (1,1) 'F' ❌
    │       │               ├── Up    → visited ❌
    │       │               │
    │       │               └── Down → (2,2) 'E' [index=4]
    │       │                       │
    │       │                       ├── Right → (2,3) 'E' ❌ (needs 'D')
    │       │                       ├── Up    → visited ❌
    │       │                       │
    │       │                       └── Left → (2,1) 'D' [index=5]
    │       │                               │
    │       │                               └── index === word.length ✅ FOUND
    │       │
    │       ├── Left → visited ❌
    │       ├── Up → out ❌
    │       └── Down → (1,1) 'F' ❌
    │
    ├── Left → out ❌
    ├── Up → out ❌
    └── Down → (1,0) 'S' ❌
```

---

## ✅ Successful Path
```
A → B → C → C → E → D
(0,0)(0,1)(0,2)(1,2)(2,2)(2,1)
```

---

# 🌳 Traversal from Second 'A' — (2,0)

```
(2,0) 'A' [index=0]
│
├── Right → (2,1) 'D' ❌ (needs 'B')
├── Left → out ❌
├── Down → out ❌
└── Up → (1,0) 'S' ❌
```

❌ No valid path from this starting cell.

---

# 🧠 How This Fits OUR Backtracking Structure

| Backtracking Step | In Grid |
|------------------|--------|
| State | (x, y, index) |
| Choose | Mark board[x][y] = "#" |
| Explore | Try 4 directions |
| Un-choose | Restore original char |
| Goal | index === word.length |

---

# 🔑 Key Takeaways

- DFS explores depth-first paths
- Backtracking prevents revisiting cells
- Early pruning avoids unnecessary work
- Board restoration is mandatory
- Same pattern as all backtracking problems, just with grid movement

---

## Universal Grid Backtracking Template

```
backtrack(x, y, index):
    if index == word.length:
        return true

    if invalid or mismatch:
        return false

    mark visited
    for each direction:
        if backtrack(next):
            return true
    restore
    return false
```

---

This tree visually explains **why and how** the algorithm succeeds.

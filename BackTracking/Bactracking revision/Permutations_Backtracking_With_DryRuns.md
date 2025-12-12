# Permutation Backtracking — Two Versions + Full Dry Runs (JS Only)

---

# VERSION A — Using path.includes()

## 1) Problem
Generate all permutations of an array `arr` of distinct integers.

## 2) Intuition / Core Idea
At each recursive call:
- Choose any unused element (`!path.includes(arr[i])`)
- Push it into `path`
- Recurse
- Pop it to backtrack

Stop when `path.length === n`.

## 3) Backtracking Definition
State   = path  
Choices = all unused elements  
Goal    = save a copy when path.length === n  
Pattern = choose → explore → un-choose  

---

## 4) JavaScript Implementation (Version A)

```js
function permute_includes(arr) {
  const result = [];
  const n = arr.length;

  function backtrack(path) {
    if (path.length === n) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < n; i++) {
      if (!path.includes(arr[i])) {
        path.push(arr[i]);
        backtrack(path);
        path.pop();
      }
    }
  }

  backtrack([]);
  return result;
}
```

---

## 5) Dry Run (arr = [1,2,3])

Start: backtrack([])
- path = []
- i = 0 → push 1 → [1]
  - backtrack([1])
    - path = [1]
    - i = 1 → push 2 → [1,2]
      - backtrack([1,2])
        - i = 2 → push 3 → [1,2,3]
          - full → save [1,2,3]
        - pop → [1,2]
      - return, pop 2 → [1]
    - i = 2 → push 3 → [1,3]
      - backtrack([1,3])
        - i = 1 → push 2 → [1,3,2]
          - full → save [1,3,2]
        - pop → [1,3]
      - pop → [1]
    - return, pop 1 → []
- i = 1 → push 2 → [2]
  - forms [2,1,3], [2,3,1]
- i = 2 → push 3 → [3]
  - forms [3,1,2], [3,2,1]

All permutations:  
[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]

---

# VERSION B — Using visited[] (Optimized)

## 1) Problem
Same task, but improve performance by using O(1) membership checking.

## 2) Intuition / Core Idea
Instead of checking `path.includes(...)` (O(n)), use:

visited[i] = true  → arr[i] already used  
visited[i] = false → available  

Makes choosing O(1).

## 3) Backtracking Definition
State   = path + visited[]  
Choices = indexes where visited[i] == false  
Goal    = save when path.length === n  
Pattern = mark → choose → explore → unmark  

---

## 4) JavaScript Implementation (Version B)

```js
function permute_visited(arr) {
  const result = [];
  const n = arr.length;
  const visited = new Array(n).fill(false);
  const path = [];

  function backtrack() {
    if (path.length === n) {
      result.push([...path]);
      return;
    }

    for (let i = 0; i < n; i++) {
      if (visited[i]) continue;

      visited[i] = true;
      path.push(arr[i]);

      backtrack();

      path.pop();
      visited[i] = false;
    }
  }

  backtrack();
  return result;
}
```

---

## 5) Dry Run (arr = [1,2,3])

Start: backtrack()
path=[], visited=[F,F,F]

i = 0 → choose 1  
visited=[T,F,F], path=[1]

  i = 1 → choose 2  
  visited=[T,T,F], path=[1,2]

    i = 2 → choose 3  
    visited=[T,T,T], path=[1,2,3]
    full → save  
    pop 3 → visited=[T,T,F], path=[1,2]

  return, pop 2 → visited=[T,F,F], path=[1]

  i = 2 → choose 3  
  visited=[T,F,T], path=[1,3]

    i = 1 → choose 2  
    visited=[T,T,T], path=[1,3,2]
    full → save  
    pop → path=[1,3]

  pop 3 → path=[1]

pop 1 → path=[] → visited=[F,F,F]

i = 1 → choose 2  
Produces [2,1,3], [2,3,1]

i = 2 → choose 3  
Produces [3,1,2], [3,2,1]

---

# Final Notes

### Both versions generate correct permutations.
### Version B is faster because:
- visited[] makes membership checking O(1)
- path.includes makes membership checking O(n)

Both follow the same backtracking pattern.

---

# End of File

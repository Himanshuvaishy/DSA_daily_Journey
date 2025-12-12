# Subsets II — Detailed Dry Run (Step-by-step)
**Problem:** Given `nums` which may contain duplicates, return all possible subsets (the power set) without duplicate subsets.

We use the standard backtracking solution with sorting + skip rule:
```js
function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  function backtrack(start, path) {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue; // Skip duplicate
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }

  backtrack(0, []);
  return result;
}
```

---
## Why sort?
We sort first so duplicates are adjacent. That makes it easy to detect and skip duplicate branches:
```
nums = [1,2,2]  → sorted = [1,2,2]
index:  0 1 2
value:  1 2 2
```

---
## The skip rule explained (one-liner)
```js
if (i > start && nums[i] === nums[i - 1]) continue;
```
- `nums[i] === nums[i-1]` detects a duplicate value.
- `i > start` ensures we only skip duplicates **at the same recursion level** (siblings). If `i === start`, then this is the first candidate at this level and should not be skipped. When recursion goes deeper (`start` increases), picking the second duplicate can be valid (e.g. `[2,2]`).

---
## Example: nums = [1,2,2]
We will show every call to `backtrack(start, path)`, and for each loop iteration show `(i, nums[i])` and whether we **choose** or **skip**. We'll also show the `result` snapshots added by `result.push([...path])` at each function entry.

**Initial state:** `nums = [1,2,2]` (sorted)

### Call 0: `backtrack(0, [])`
- Action: `result.push([])` → result: `[ [] ]`
- Loop `i = 0 .. 2`:

#### Iteration i = 0 (nums[0] = 1)
- Check skip: `i > start`? → `0 > 0` is **false** → do not skip.
- Action: choose 1 → `path = [1]`
- Recurse → Call 1: `backtrack(1, [1])`
  - (see Call 1 below)
- After return: `path.pop()` → `path = []`

#### Iteration i = 1 (nums[1] = 2)
- Check skip: `1 > 0` is **true**, but `nums[1] === nums[0]`? → `2 === 1` is **false** → do not skip.
- Action: choose 2 → `path = [2]`
- Recurse → Call 2: `backtrack(2, [2])`
  - (see Call 2 below)
- After return: `path.pop()` → `path = []`

#### Iteration i = 2 (nums[2] = 2)
- Check skip: `2 > 0` is **true** AND `nums[2] === nums[1]` → `2 === 2` is **true** → **SKIP** this iteration.
- (No choose, no recurse)

- Loop ends. Return from Call 0.

---
### Call 1: `backtrack(1, [1])`
- Enter: `result.push([1])` → result: `[ [], [1] ]`
- Loop `i = 1 .. 2`:

#### Iteration i = 1 (nums[1] = 2)
- Check skip: `1 > 1` is **false** → do not skip.
- Action: choose 2 → `path = [1,2]`
- Recurse → Call 1.1: `backtrack(2, [1,2])`
  - (see Call 1.1 below)
- After return: `path.pop()` → `path = [1]`

#### Iteration i = 2 (nums[2] = 2)
- Check skip: `2 > 1` is **true** AND `nums[2] === nums[1]` → `2 === 2` is **true** → **SKIP** this iteration.
- (No choose, no recurse)

- Loop ends. Return from Call 1.

---
### Call 1.1: `backtrack(2, [1,2])`
- Enter: `result.push([1,2])` → result: `[ [], [1], [1,2] ]`
- Loop `i = 2 .. 2`:

#### Iteration i = 2 (nums[2] = 2)
- Check skip: `2 > 2` is **false** → do not skip.
- Action: choose 2 → `path = [1,2,2]`
- Recurse → Call 1.1.1: `backtrack(3, [1,2,2])`
  - (see Call 1.1.1 below)
- After return: `path.pop()` → `path = [1,2]`

- Loop ends. Return from Call 1.1.

---
### Call 1.1.1: `backtrack(3, [1,2,2])`
- Enter: `result.push([1,2,2])` → result: `[ [], [1], [1,2], [1,2,2] ]`
- Loop `i = 3 .. 2` → empty → return immediately.

---
### Call 2: `backtrack(2, [2])`
- Enter: `result.push([2])` → result: `[ [], [1], [1,2], [1,2,2], [2] ]`
- Loop `i = 2 .. 2`:

#### Iteration i = 2 (nums[2] = 2)
- Check skip: `2 > 2` is **false** → do not skip.
- Action: choose 2 → `path = [2,2]`
- Recurse → Call 2.1: `backtrack(3, [2,2])`
  - (see Call 2.1 below)
- After return: `path.pop()` → `path = [2]`

- Loop ends. Return from Call 2.

---
### Call 2.1: `backtrack(3, [2,2])`
- Enter: `result.push([2,2])` → result: `[ [], [1], [1,2], [1,2,2], [2], [2,2] ]`
- Loop `i = 3 .. 2` → empty → return immediately.

---
## Final result
After all calls finish, `result` contains:

```
[
  [],
  [1],
  [1,2],
  [1,2,2],
  [2],
  [2,2]
]
```

These are all unique subsets — duplicates like a second `[2]` from choosing `nums[2]` at the top-level were **skipped** by the condition.

---
## Why `i > start` is essential (recap)
- `i > start` ensures we only skip duplicates when they would be **sibling choices** at the same recursion level.
- If we didn't check `i > start`, we'd incorrectly skip valid deeper choices (e.g., in `backtrack(2, [1,2])` we must allow choosing the second `2` to form `[1,2,2]`).

Concrete rule: **Skip a duplicate value at this loop if the earlier equal value was already considered in this same loop (i.e., it's a sibling), but don't skip if we're deeper inside recursion where picking the duplicate forms a new distinct subset.**

---
## Visual mnemonic
- Think: at each level you list "which element to pick next" — if two equal elements appear in that list, only pick the first one at that level; the second is a repeat choice producing the same subtree.
- But if you already picked an element and go deeper, picking the next equal element is allowed — it produces a larger subset that legitimately contains both copies.

---
## Bonus: variant to print every step with `path, start, i, action`
You can instrument the function to `console.log` each action. For learning, printing each `enter/choose/skip/pop` with `path, start, i` helps internalize the flow.

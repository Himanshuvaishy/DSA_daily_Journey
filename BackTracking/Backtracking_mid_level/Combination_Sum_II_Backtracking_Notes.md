# 🧩 Combination Sum II — Backtracking Explained

## 📘 Problem Definition

> Given a collection of candidate numbers `candidates` (which may contain duplicates) and a target number `target`, find all unique combinations where the candidate numbers sum to `target`.

Each number **may only be used once** in the combination.

---

### 🔹 Example

```js
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
Explanation:

Every combination must sum to 8.

Each number can only be used once.

Duplicates in candidates are handled carefully to avoid repeated combinations.

⚙️ Key Differences from Combination Sum
Feature	Combination Sum	Combination Sum II
Candidates	Distinct	May contain duplicates
Element reuse	✅ Allowed	❌ Not allowed
Sorting	Optional	✅ Required (to skip duplicates)
Duplicate handling	Not needed	Must skip at same recursion level

🧠 Intuition
Think of it as exploring a decision tree, but:

You can only pick each number once.

You must skip duplicates at the same level to avoid identical subsets.

To achieve this:

Sort the array first — duplicates come together.

Use backtracking to explore all subsets that sum to the target.

If we see a duplicate element at the same recursion level (i > start && nums[i] === nums[i-1]) → skip it.

🧩 JavaScript Solution (Approach 1 — Using Total Sum)
js
Copy code
var combinationSum2 = function(candidates, target) {
    const result = [];
    candidates.sort((a, b) => a - b); // sort to skip duplicates easily

    function backtrack(start, path, sum) {
        if (sum === target) {
            result.push([...path]);
            return;
        }
        if (sum > target) return;

        for (let i = start; i < candidates.length; i++) {
            // ⚠️ Skip duplicates at same level
            if (i > start && candidates[i] === candidates[i - 1]) continue;

            path.push(candidates[i]);
            backtrack(i + 1, path, sum + candidates[i]); // i+1 → no reuse
            path.pop();
        }
    }

    backtrack(0, [], 0);
    return result;
};
🧩 JavaScript Solution (Approach 2 — Using Remaining Sum)
js
Copy code
var combinationSum2 = function (arr, target) {
    let result = [];
    arr.sort((a, b) => a - b);

    let backtrack = (remainingSum, path, start) => {
        if (remainingSum === 0) {
            result.push([...path]);
            return;
        }
        if (remainingSum < 0) return;

        for (let i = start; i < arr.length; i++) {
            // ⚠️ Skip duplicate numbers at same recursion level
            if (i > start && arr[i] === arr[i - 1]) continue;

            path.push(arr[i]);
            backtrack(remainingSum - arr[i], path, i + 1); // i+1 because no reuse
            path.pop();
        }
    };

    backtrack(target, [], 0);
    return result;
};
💡 Why Sort and Skip?
Because candidates can have duplicates like [1,1,2,5].
Without sorting and skipping, we’d get repeated results like [1,2,5] twice.

Sorting helps to group duplicates together, so we can detect and skip them easily.

js
Copy code
if (i > start && arr[i] === arr[i - 1]) continue;
This ensures:

We skip the same number appearing multiple times at the same recursion depth.

But we still allow duplicates in deeper recursion levels (like [1,1,6]).

🧮 Step-by-Step Dry Run
Input:

js
Copy code
candidates = [10,1,2,7,6,1,5]
target = 8
After sorting:

js
Copy code
[1,1,2,5,6,7,10]
Step 1
backtrack(0, [], 8)

Loop over i = 0 → 6

1️⃣ i = 0 → pick 1
→ call backtrack(1, [1], 7)

Step 2 (path = [1], remaining = 7)
Loop i = 1 → 6

i = 1 → pick 1 → [1,1], call backtrack(2, [1,1], 6)

i = 2 → pick 2 → [1,2], call backtrack(3, [1,2], 5)

i = 3 → pick 5 → [1,5], call backtrack(4, [1,5], 2)

i = 4 → pick 6 → [1,6] ✅ found sum = 8

i = 5 → pick 7 → sum = 9 ❌

i = 6 → pick 10 → sum = 11 ❌

Step 3 (path = [1,1], remaining = 6)
Loop i = 2 → 6

i = 2 → pick 2 → [1,1,2] sum = 4 remaining → backtrack(3, [1,1,2], 4)

i = 3 → pick 5 → [1,1,5] ✅ sum = 8 → add to result

i = 4 → pick 6 → sum = 9 ❌ skip

i = 5 → pick 7 → sum = 10 ❌ skip

i = 6 → pick 10 → sum = 13 ❌ skip

Step 4 (path = [1,2], remaining = 5)
Loop i = 3 → 6

i = 3 → pick 5 → [1,2,5] ✅ sum = 8 → add

i = 4 → 6 → sum = 9 ❌ skip

i = 5 → 7 → 10 ❌ skip

i = 6 → 10 → 13 ❌ skip

Step 5 (path = [2,6]) ✅ also valid
✅ Final Results:

csharp
Copy code
[
  [1,1,6],
  [1,2,5],
  [1,7],
  [2,6]
]
🌳 State Space Tree (Simplified)
scss
Copy code
[]
├── 1
│   ├── 1
│   │   ├── 2 ❌ (sum>)
│   │   ├── 5 ✅ [1,1,5]
│   ├── 2
│   │   ├── 5 ✅ [1,2,5]
│   ├── 6 ✅ [1,6]
│   ├── 7 ❌
├── 2
│   ├── 6 ✅ [2,6]
│   ├── 7 ❌
├── 5 ❌
├── 6 ❌
├── 7 ✅ [1,7]
└── 10 ❌
🧭 Intuition Recap
Concept	Meaning
Sort the array	To detect duplicates easily
Skip duplicates	Avoid identical combinations
No reuse	Move to next index (i+1)
Remaining sum	Easier to track remaining target
Backtrack	Undo last choice and explore others

✅ Final Output
js
Copy code
[[1,1,6],[1,2,5],[1,7],[2,6]]
🧩 Time Complexity (Rough)
O(2^N) — exponential, since we explore all subsets.
Sorting adds O(N log N), and pruning reduces actual runtime.

📘 Summary
Each element used once → move i+1 after choosing.

Sort array → essential for skipping duplicates.

Skip duplicates at same level only.

Store paths when remainingSum == 0.

Backtrack by removing last picked element.

💡 Key takeaway:
Combination Sum II combines subset generation + duplicate skipping logic + single-use constraint — all handled elegantly using backtracking.
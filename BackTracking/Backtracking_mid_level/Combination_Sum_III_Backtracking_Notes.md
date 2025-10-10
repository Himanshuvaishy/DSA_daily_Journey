# 🧩 Combination Sum III — Backtracking Notes

## 📘 Problem Definition

Find all possible combinations of **k** numbers that add up to a number **n**, using only numbers from **1 through 9**, and each number **can be used at most once**.

---

### Example

```js
Input: k = 3, n = 9
Output: [[1,2,6],[1,3,5],[2,3,4]]
Explanation:
Each combination uses distinct digits 1–9, no repetition, and sums to 9.

⚙️ Constraints
Each number from 1–9 can be used once.

Only numbers 1 through 9 are allowed.

The total number of elements in each combination must be exactly k.

The sum of chosen numbers must equal n.

🧠 Intuition
We are exploring combinations of the numbers 1–9 that meet two conditions:

Their sum equals n

They have exactly k elements

We use backtracking to explore each possible number while pruning invalid paths.

At each step:

Choose a number i

Subtract it from the remaining target (remaining -= i)

Move to the next number (i + 1) since reuse is not allowed

Backtrack when path length exceeds k or sum > target

💻 JavaScript Code Implementation
js
Copy code
var combinationSum3 = function(k, n) {
    const result = [];

    const backtrack = (start, path, remaining) => {
        // ✅ Base case: valid combination
        if (path.length === k && remaining === 0) {
            result.push([...path]);
            return;
        }

        // 🚫 Pruning: stop exploring invalid paths
        if (path.length >= k || remaining < 0) return;

        // 🔁 Try all numbers from current start to 9
        for (let i = start; i <= 9; i++) {
            path.push(i);
            backtrack(i + 1, path, remaining - i); // move forward, no reuse
            path.pop(); // backtrack
        }
    };

    backtrack(1, [], n);
    return result;
};
🔍 Step-by-Step Dry Run
Input:
js
Copy code
k = 3, n = 9
Step 1
backtrack(1, [], 9)

Loop i = 1 → 9

i = 1 → pick 1
→ path = [1], remaining = 8
→ backtrack(2, [1], 8)

Step 2
path = [1], remaining = 8

Loop i = 2 → 9

i = 2 → path = [1,2], remaining = 6
→ call backtrack(3, [1,2], 6)

Step 3
path = [1,2], remaining = 6

Loop i = 3 → 9

i = 3 → path = [1,2,3], remaining = 3 ❌ (not 0 → backtrack)

i = 4 → path = [1,2,4], remaining = 2 ❌

i = 5 → path = [1,2,5], remaining = 1 ❌

i = 6 → path = [1,2,6], remaining = 0 ✅ add [1,2,6]

Backtrack to try more combinations.

Step 4
Continue with i = 3 → path = [1,3]
→ find [1,3,5] ✅
Then [2,3,4] ✅

✅ Final Answer:

js
Copy code
[[1,2,6],[1,3,5],[2,3,4]]
🌳 State Space Tree (Simplified)
css
Copy code
[]
├── 1
│   ├── 2
│   │   ├── 3 ❌
│   │   ├── 4 ❌
│   │   ├── 5 ❌
│   │   ├── 6 ✅ [1,2,6]
│   ├── 3
│   │   ├── 5 ✅ [1,3,5]
│   ├── 4 ❌
├── 2
│   ├── 3
│   │   ├── 4 ✅ [2,3,4]
│   ├── 5 ❌
└── ...
🧩 Why Loop Runs Till 9 (Not n)
Many learners ask: Why do we loop for (let i = start; i <= 9; i++) and not i <= n?

✅ Reason:
Because the problem restricts the pool of numbers to 1–9.
We’re not allowed to use any number beyond 9 — even if n (target sum) is large.

n represents the target sum, not the range of numbers available.

🔹 Example:
If n = 15, k = 3
We still can only choose from [1,2,3,4,5,6,7,8,9].

Hence:

js
Copy code
for (let i = start; i <= 9; i++)
is correct.

🔸 Summary Table
Concept	Explanation
Numbers used	1–9 only
Why not loop till n	Because n is the target, not range
start variable	Ensures no number is reused
i+1	Moves to next number (no reuse)
remaining < 0 prune	Stops invalid branches early

🧮 Complexity Analysis
Time: O(2⁹) ≈ O(512) → small and efficient

Space: O(k) recursion depth

✅ Summary
Feature	Combination Sum III
Range of numbers	Fixed 1–9
Reuse allowed	❌ No
Fixed combination length	✅ Yes (k elements)
Base condition	path.length === k && remaining === 0
Loop range	start → 9
Approach type	Backtracking with pruning

💬 Key Takeaway
Combination Sum III teaches strong pruning skills and clear boundary reasoning — exploring only valid 1–9 digits with fixed-length combinations.

vbnet
Copy code

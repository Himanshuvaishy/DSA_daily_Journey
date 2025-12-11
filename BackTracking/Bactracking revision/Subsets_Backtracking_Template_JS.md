```js
# Subsets — The Power Set (Full Backtracking Template Solution, JS Only)

------------------------------------------------
1) Problem Statement
------------------------------------------------
Given: an array nums containing distinct integers
Return: all possible subsets (power set)
Type: Backtracking — Subsets
Constraints: Typical 0 ≤ n ≤ 20

------------------------------------------------
2) Intuition / Core Idea
------------------------------------------------
At each step, decide:
- Include nums[i]
- Exclude nums[i]

State = path (current subset), index (next element)
Every path is a valid subset → record at each call.

------------------------------------------------
3) Backtracking Definition
------------------------------------------------
State        = path, index
Choices      = nums[i] (choose) or skip via loop
Goal         = record all subsets
Backtracking = choose → explore → un-choose

------------------------------------------------
4) Backtracking Template (JavaScript)
------------------------------------------------
function subsets(nums) {
    const ans = [];
    const path = [];

    function backtrack(index) {
        ans.push([...path]); // record

        for (let i = index; i < nums.length; i++) {
            path.push(nums[i]);      // choose
            backtrack(i + 1);        // explore
            path.pop();              // un-choose
        }
    }

    backtrack(0);
    return ans;
}

------------------------------------------------
5) Decision Tree Diagram (nums = [1,2,3]) Correct Order
------------------------------------------------

Start: []

Level 1:
[]
├── [1]
├── [2]
└── [3]

Level 2:
[1]
├── [1,2]
└── [1,3]

[2]
└── [2,3]

[3] 
(no further children)

Full ordered tree:

[]
├── [1]
│   ├── [1,2]
│   │   └── [1,2,3]
│   └── [1,3]
├── [2]
│   └── [2,3]
└── [3]

------------------------------------------------
6) Dry Run (nums = [1,2])
------------------------------------------------
backtrack(0):
  path = [] → add []

  i = 0 → choose 1
    path = [1] → add [1]
    i = 1 → choose 2
        path = [1,2] → add [1,2]
        pop → [1]
    pop → []

  i = 1 → choose 2
    path = [2] → add [2]
    pop → []

Result → [[], [1], [1,2], [2]]

------------------------------------------------
7) Pattern Used
------------------------------------------------
- Record subset at every call
- Loop from index to end
- Use i + 1 → each element appears once

------------------------------------------------
8) Edge Cases
------------------------------------------------
[]        → [[]]
[5]       → [[], [5]]
Large n   → up to 2^20 subsets

------------------------------------------------
9) Complexity
------------------------------------------------
Time:  O(n × 2^n)
Space: O(n) recursion depth + output size

------------------------------------------------
10) Final Clean JS Code
------------------------------------------------
function subsets(nums) {
    const ans = [];
    const path = [];

    function backtrack(index) {
        ans.push([...path]); 

        for (let i = index; i < nums.length; i++) {
            path.push(nums[i]);
            backtrack(i + 1);
            path.pop();
        }
    }

    backtrack(0);
    return ans;
}


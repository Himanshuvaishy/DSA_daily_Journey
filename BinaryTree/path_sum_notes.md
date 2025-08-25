# 📝 Path Sum Problem – Notes (Top-Down & Bottom-Up)

The **Path Sum** problem: Given the root of a binary tree and an integer `targetSum`, return true if the tree has a **root-to-leaf path** such that the sum of the node values equals `targetSum`.

---
```js
🔹 Approach 1: Top-Down (Pass Running Sum Downwards)

👉 Idea: At each step, keep track of the current running sum from root to the current node.
If we reach a leaf node, check if this running sum equals the target.

Code:
var hasPathSum = function(root, targetSum) {
    if (!root) return false;
    let ans = false;

    let traverse = (curr, currSum) => {
        let newSum = currSum + curr.val;

        // If it's a leaf
        if (!curr.left && !curr.right) {
            if (newSum === targetSum) {
                ans = ans || true;
            }
        }

        // Recurse deeper
        if (curr.left) traverse(curr.left, newSum);
        if (curr.right) traverse(curr.right, newSum);
    };

    traverse(root, 0);
    return ans;
};

✅ Dry Run Example

Tree:

       5
     /   \
    4     8
   /     / \
  11    13  4
 /  \        \
7    2        1


targetSum = 22

Step-by-Step Call Stack

📌 Start: traverse(5, 0)

newSum = 0 + 5 = 5

Not leaf → go left & right

➡️ Left Path:

traverse(4, 5) → newSum = 9

Not leaf → go left

traverse(11, 9) → newSum = 20

Not leaf → go left & right

traverse(7, 20) → newSum = 27 ❌ not target

traverse(2, 20) → newSum = 22 ✅ target found → ans = true

➡️ Right Path:

traverse(8, 5) → newSum = 13

Not leaf → go left & right

traverse(13, 13) → newSum = 26 ❌ not target

traverse(4, 13) → newSum = 17

traverse(1, 17) → newSum = 18 ❌ not target

Final Answer → true
📚 Call Stack Expansion (important for imagination)
traverse(5,0)
 ├─ traverse(4,5)
 │    └─ traverse(11,9)
 │          ├─ traverse(7,20) → leaf (27 ❌)
 │          └─ traverse(2,20) → leaf (22 ✅ ans=true)
 └─ traverse(8,5)
      ├─ traverse(13,13) → leaf (26 ❌)
      └─ traverse(4,13)
            └─ traverse(1,17) → leaf (18 ❌)

## 🔹 Approach 2: Bottom-Up (Aggregating Results Upwards)

**Idea:**
- Instead of passing target down, compute results **from leaves upward**.
- At each node:
  - Check if leaf and `targetSum == val` → return true.
  - Else recursively compute for left & right with reduced target.
- Aggregate results using `||`.

**Code (Bottom-Up):**
```js
var hasPathSum = function(root, targetSum) {
    if (!root) return false;

    // Leaf node check
    if (!root.left && !root.right) {
        return root.val === targetSum;
    }

    let left = hasPathSum(root.left, targetSum - root.val);
    let right = hasPathSum(root.right, targetSum - root.val);

    return left || right;
};
```

### 🔄 Dry Run Example
(Same tree, Target = 22)

#### Step 1: Start from leaves
- Node 7: `22-5-4-11=2` → `2==7? false`
- Node 2: `22-5-4-11=2` → `2==2? true`
- Node 13: `22-5-8=9` → `9==13? false`
- Node 1: `22-5-8-4=5` → `5==1? false`

#### Step 2: Bubble up
- Node 11: left=false, right=true → return true
- Node 4 (left): receives true from 11 → return true
- Node 8: both children false → return false

#### Step 3: Bubble up to root
- Root (5): left=true, right=false → return true ✅

**✔ Answer = true**

---

## 🔎 Key Difference

| Aspect              | Top-Down                             | Bottom-Up |
|---------------------|---------------------------------------|-----------|
| Flow of Data        | Subtract target and pass downward     | Compute results at leaves, bubble up |
| When Decision Made  | At leaves while going down            | At leaves, then aggregated upward |
| Call Stack Thinking | You imagine subtracting at each call  | You imagine results coming back up |

---

## ✅ Summary
- Both approaches give same answer.
- **Top-Down** is easier to *imagine target shrinking*.
- **Bottom-Up** is easier to *imagine results bubbling upward*.
- In interviews, either approach is fine, but explaining both shows depth of understanding.

---


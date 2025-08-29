```js
📘 Balanced Binary Tree (JavaScript)
🔹 Problem Statement

Given a binary tree, determine if it is height-balanced.
A binary tree is balanced if:

The depth of the two subtrees of every node never differs by more than 1.

🔹 Example
Input: [3,9,20,null,null,15,7]

        3
       / \
      9  20
        /  \
       15   7

Output: true

Input: [1,2,2,3,3,null,null,4,4]

           1
          / \
         2   2
        / \
       3   3
      / \
     4   4

Output: false

🔹 Approach 1: Brute Force (Recursive Height Calculation)
📝 Code
var isBalanced = function(root) {
    let ans = true;
    let calculateHeight = (curr) => {
        if(!curr) return 0;
        let leftHeight = calculateHeight(curr.left);
        let rightHeight = calculateHeight(curr.right);
        if(Math.abs(leftHeight - rightHeight) > 1){
            ans = ans && false;
        }
        return 1 + Math.max(leftHeight, rightHeight);
    }
    calculateHeight(root);
    return ans;
};

⏱️ Time Complexity

Worst case: O(n²) (because for each node, height is recalculated).

📌 Dry Run (for tree [3,9,20,null,null,15,7])

isBalanced(3)

height(9) = 1

height(20) = 2

|1 - 2| = 1 → ok

Recurse on left & right → balanced.

Output → true.

📌 Call Stack Trace
isBalanced(3)
 ├── height(9)
 └── height(20)
      ├── height(15)
      └── height(7)

🔹 Approach 2: Optimized Recursive (DFS + Height in Same Call)
📝 Code
var isBalanced = function(root) {
    const check = (node) => {
        if (!node) return 0;

        const left = check(node.left);
        if (left === -1) return -1;

        const right = check(node.right);
        if (right === -1) return -1;

        if (Math.abs(left - right) > 1) return -1;

        return 1 + Math.max(left, right);
    };

    return check(root) !== -1;
};
Sample Tree:

       1
      / \
     2   3
    / \
   4   5


We want to check if this tree is balanced. A tree is balanced if the heights of left and right subtrees of every node differ by at most 1.

Step-by-step Dry Run:

We call isBalanced(root) where root is node 1.

Step 1: check(node 1)

Node is not null → proceed.

Call check(node 2) for left subtree.

Step 2: check(node 2)

Node is not null → proceed.

Call check(node 4) for left subtree.

Step 3: check(node 4)

Node is not null → proceed.

Call check(node 4.left) → null → return 0

Call check(node 4.right) → null → return 0

Check Math.abs(left - right) = Math.abs(0 - 0) = 0 → okay

Return 1 + Math.max(left, right) = 1 + 0 = 1

So, height of node 4 = 1

Step 4: check(node 5)

Node is not null → proceed.

Call check(node 5.left) → null → return 0

Call check(node 5.right) → null → return 0

Math.abs(left - right) = 0 → okay

Return 1 + Math.max(0, 0) = 1

So, height of node 5 = 1

Step 5: Back to node 2

Left height = 1 (from node 4)

Right height = 1 (from node 5)

Math.abs(left - right) = 0 → okay

Return 1 + Math.max(1, 1) = 2

Height of node 2 = 2

Step 6: check(node 3)

Node is not null → proceed

check(node 3.left) → null → return 0

check(node 3.right) → null → return 0

Math.abs(0 - 0) = 0 → okay

Return 1 + Math.max(0, 0) = 1

Height of node 3 = 1

Step 7: Back to node 1

Left height = 2 (from node 2)

Right height = 1 (from node 3)

Math.abs(2 - 1) = 1 → okay

Return 1 + Math.max(2, 1) = 3

Step 8: Final Check in isBalanced

check(root) = 3 (not -1) → return true

✅ So the tree is balanced.

Key Points of This Optimized Approach:

Each node returns height if subtree is balanced.

Returns -1 immediately if any subtree is unbalanced → avoids redundant height calculations.

Time complexity: O(n) (visits each node once)

Space complexity: O(h) (recursion stack, h = height of tree)

If you want, I can draw a visual call stack diagram for this dry run showing the recursive calls, heights returned, and where -1 would propagate. It makes it super clear.

Do you want me to do that?

You said:
yes where -1 propogate
ChatGPT said:

Perfect! Let’s do a visual dry run with -1 propagation. We’ll use a tree that is NOT balanced this time to illustrate -1 propagation:

Sample Tree (Unbalanced):
       1
      / \
     2   3
    /
   4
  /
 5


Here, node 2’s left subtree is deeper than right by 2, so it’s unbalanced.

Step-by-Step Dry Run with -1 Propagation
Step 1: check(node 5)

Node 5 has no children → left = 0, right = 0

Math.abs(0 - 0) = 0 → okay

Return 1 + max(0, 0) = 1

Step 2: check(node 4)

Left = check(node 5) = 1

Right = check(null) = 0

Math.abs(1 - 0) = 1 → okay

Return 1 + max(1, 0) = 2

Step 3: check(node 2)

Left = check(node 4) = 2

Right = check(null) = 0

Math.abs(2 - 0) = 2 → > 1 → unbalanced!

Return -1 immediately

✅ Here’s the first -1 propagation.

Step 4: Back to check(node 1)

Left = check(node 2) = -1

Check if (left === -1) return -1; triggers → propagate -1

Right subtree (check(node 3)) is never evaluated because we already know the tree is unbalanced.

Step 5: isBalanced(root)

check(root) = -1 → return false

Visual Call Stack with -1:
check(1)
 ├─ check(2)
 │   ├─ check(4)
 │   │   ├─ check(5) → returns 1
 │   │   └─ check(null) → 0
 │   │   → Math.abs(1-0)=1 → return 2
 │   └─ check(null) → 0
 │   → Math.abs(2-0)=2 → return -1  <- unbalanced detected
 └─ check(3)  -> not called due to -1

Key Observations:

Once -1 is returned from a subtree, all ancestors propagate -1 immediately.

This avoids checking the rest of the tree unnecessarily.

Efficiently detects imbalance in O(n) time.

⏱️ Time Complexity

O(n) (each node visited once).

Space: O(h) (recursion depth).

📌 Dry Run (tree [3,9,20,null,null,15,7])

Start at 3.

Left subtree 9 → returns 1.

Right subtree 20 →

left = 1 (15), right = 1 (7) → balanced.

returns 2.

diff = |1 - 2| = 1 → balanced.

Final → true.

📌 Call Stack Trace
check(3)
 ├── check(9)
 │     └── check(null) → 0
 │     └── check(null) → 0
 └── check(20)
       ├── check(15)
       │     └── check(null) → 0
       │     └── check(null) → 0
       └── check(7)
             └── check(null) → 0
             └── check(null) → 0

🔹 Approach 3: Iterative BFS with Height Map
📝 Code
var isBalanced = function(root) {
    if (!root) return true;
    
    const height = new Map();

    const dfsHeight = (node) => {
        if (!node) return 0;
        if (height.has(node)) return height.get(node);

        let h = 1 + Math.max(dfsHeight(node.left), dfsHeight(node.right));
        height.set(node, h);
        return h;
    };

    const queue = [root];
    while (queue.length > 0) {
        let node = queue.shift();

        let lh = dfsHeight(node.left);
        let rh = dfsHeight(node.right);

        if (Math.abs(lh - rh) > 1) return false;

        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
    }
    return true;
};

⏱️ Time Complexity

O(n) (each node visited, height cached).

📌 Dry Run (tree [3,9,20,null,null,15,7])

Start queue = [3].

Check height(left=1, right=2). diff=1 → ok.

Push children [9,20].

Node=9 → left=0, right=0 → balanced.

Node=20 → left=1, right=1 → balanced.

Final → true.

✅ Conclusion

Brute Force: Easy but O(n²).

Optimized DFS: Best, O(n).

Iterative BFS: Also O(n) but requires caching heights.
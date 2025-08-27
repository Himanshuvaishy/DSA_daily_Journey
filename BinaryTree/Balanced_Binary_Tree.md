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
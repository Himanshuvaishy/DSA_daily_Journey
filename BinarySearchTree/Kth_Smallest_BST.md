# 🌳 Kth Smallest Element in a Binary Search Tree (BST)

## 📌 Problem Statement
Given the root of a Binary Search Tree (BST) and an integer `k`, return the kth smallest value among all the nodes.

---

## ⚡ Approach 1: Inorder Traversal + Array

### Code
```javascript
var kthSmallest = function(root, k) {
    let ans = [];

    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        ans.push(node.val);
        inorder(node.right);
    }

    inorder(root);
    return ans[k - 1]; // kth smallest (1-indexed)
};
Explanation

Perform inorder traversal (Left → Root → Right).

Collect values in an array ans.

Since inorder traversal of BST gives sorted order, the kth element is ans[k-1].

Complexity

Time: O(n) — visit all nodes.

Space: O(n) — array storage.

⚡ Approach 2: Inorder Traversal with Counter (Optimized Space)
Code
var kthSmallest = function(root, k) {
    let count = 0;
    let result = null;

    function inorder(node) {
        if (!node || result !== null) return;

        inorder(node.left);

        count++;
        if (count === k) {
            result = node.val;
            return;
        }

        inorder(node.right);
    }

    inorder(root);
    return result;
};

Explanation

No need to store all values.

Keep a counter to track position.

Stop recursion as soon as kth smallest element is found.

Complexity

Time: O(h + k), where h = height of tree.

Space: O(h), recursion stack.

⚡ Approach 3: Iterative Inorder with Stack
Code
var kthSmallest = function(root, k) {
    let stack = [];
    let curr = root;

    while (true) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }

        curr = stack.pop();
        k--;
        if (k === 0) return curr.val;
        curr = curr.right;
    }
};

Explanation

Use stack to simulate inorder traversal.

Each pop gives the next smallest element.

When k === 0, return the value.

Complexity

Time: O(h + k)

Space: O(h)

📖 Dry Run Example

Tree:

        5
       / \
      3   6
     / \
    2   4
   /
  1


Inorder Traversal → [1, 2, 3, 4, 5, 6]

k = 3 → The 3rd smallest element is 3.

✅ Comparison of Approaches
Approach	Extra Space	Time Complexity	Notes
Inorder + Array	O(n)	O(n)	Easy, but not space efficient
Inorder + Counter	O(h)	O(h + k)	Optimized recursion
Iterative + Stack	O(h)	O(h + k)	No recursion, iterative
🏆 Conclusion

If k is small, prefer Approach 2 or 3 (better space).

If simplicity is the goal, Approach 1 works fine.
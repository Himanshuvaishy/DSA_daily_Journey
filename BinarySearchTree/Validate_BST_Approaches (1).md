# Validate Binary Search Tree (BST)

This document explains **two approaches** to validate if a given binary
tree is a valid BST, along with **detailed dry runs**.

------------------------------------------------------------------------

## Approach 1: Using `lo` and `hi` bounds

### Code:

``` javascript
function isValidBST(root) {
    function helper(curr, lo, hi) {
        if (!curr) return true;

        if ((lo != null && curr.val <= lo) ||
            (hi != null && curr.val >= hi)) {
            return false;
        }

        return helper(curr.left, lo, curr.val) &&
               helper(curr.right, curr.val, hi);
    }

    return helper(root, null, null);
}
```

### Explanation:

-   We recursively check each node ensuring:
    -   If `lo` exists → current node must be **greater** than it.
    -   If `hi` exists → current node must be **smaller** than it.
-   Update bounds:
    -   For left child → `hi = curr.val`
    -   For right child → `lo = curr.val`

-  Meaning of lo and hi

lo → lower bound (the minimum value that curr.val must be greater than).

hi → upper bound (the maximum value that curr.val must be less than).

These bounds come from the ancestors of the current node when traversing the tree.

Case: lo != null && curr.val <= lo

This check means:

If a lower bound exists (lo != null)

And the current node’s value is less than or equal to that lower bound → ❌ invalid.

👉 This situation happens when we are in a right subtree.
Because in the right subtree of a node, every node must be strictly greater than the parent (or the ancestor that set the lower bound).

Case: hi != null && curr.val >= hi

This check means:

If an upper bound exists (hi != null)

And the current node’s value is greater than or equal to that upper bound → ❌ invalid.

👉 This situation happens when we are in a left subtree.
Because in the left subtree of a node, every node must be strictly smaller than the parent (or ancestor that set the upper bound).

Example Dry Run (focus on lo check in right subtree)

Tree:

    10
   /  \
  5    15
       / \
      12  20


Start at root = 10 → lo = null, hi = null. ✅ valid.

Go right → node = 15 → lo = 10, hi = null.

Condition check: (lo != null && curr.val <= lo) → (10 != null && 15 <= 10) → false. ✅

Go left (of 15) → node = 12 → lo = 10, hi = 15.

Condition check: (lo != null && curr.val <= lo) → (10 != null && 12 <= 10) → false. ✅

Condition check: (hi != null && curr.val >= hi) → (15 != null && 12 >= 15) → false. ✅
→ valid.

If instead that node was 9 instead of 12:

Check: (lo != null && curr.val <= lo) → (10 != null && 9 <= 10) → true ❌ → invalid.
That’s because 9 is in the right subtree of 10, but it is not greater than 10.

✅ So yes, (lo != null && curr.val <= lo) is specifically ensuring correctness in the right subtree.

### Dry Run Example:

For tree:

            5
           /       3   7
         / \       2   4   8

1.  Start at root `5`, bounds `lo = null`, `hi = null` → valid.
2.  Left of `5` → node `3`, bounds `lo = null`, `hi = 5` → valid since
    `3 < 5`.
3.  Left of `3` → node `2`, bounds `lo = null`, `hi = 3` → valid since
    `2 < 3`.
4.  Right of `3` → node `4`, bounds `lo = 3`, `hi = 5` → valid since
    `3 < 4 < 5`.
5.  Right of `5` → node `7`, bounds `lo = 5`, `hi = null` → valid since
    `7 > 5`.
6.  Right of `7` → node `8`, bounds `lo = 7`, `hi = null` → valid since
    `8 > 7`.

✅ Tree is a valid BST.

------------------------------------------------------------------------

## Approach 2: Using `min` and `max` bounds with Infinity

### Code:

``` javascript
function isValidBST(root) {
    function helper(node, min, max) {
        if (!node) return true;

        if (node.val <= min || node.val >= max) return false;

        return helper(node.left, min, node.val) &&
               helper(node.right, node.val, max);
    }

    return helper(root, -Infinity, Infinity);
}
```

### Explanation:

-   Each node must lie **strictly** between `min` and `max`.
-   Initially root is between `-∞` and `+∞`.
-   Update bounds:
    -   For left child → `max = node.val`
    -   For right child → `min = node.val`

### Dry Run Example:

For tree:

            5
           /       3   7
         / \       2   4   8

1.  Start at root `5`, bounds `(-∞, ∞)` → valid.
2.  Left of `5` → node `3`, bounds `(-∞, 5)` → valid since `-∞ < 3 < 5`.
3.  Left of `3` → node `2`, bounds `(-∞, 3)` → valid since `-∞ < 2 < 3`.
4.  Right of `3` → node `4`, bounds `(3, 5)` → valid since `3 < 4 < 5`.
5.  Right of `5` → node `7`, bounds `(5, ∞)` → valid since `5 < 7 < ∞`.
6.  Right of `7` → node `8`, bounds `(7, ∞)` → valid since `7 < 8 < ∞`.

✅ Tree is a valid BST.

------------------------------------------------------------------------

## Key Difference:

-   **Approach 1** uses `null` checks with `lo` and `hi` updates.
-   **Approach 2** uses strict range with `-Infinity` and `Infinity`.

Both ensure correctness, but approach 2 is often cleaner due to explicit
infinity bounds.

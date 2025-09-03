# 🌳 Search in Binary Search Tree (BST)

## 📌 Problem Statement

Given the root of a Binary Search Tree (BST) and a target value,
determine if the target exists in the BST.\
If it exists, return the node reference; otherwise, return `null`.

------------------------------------------------------------------------

## ⚡ Approach 1: Recursive Search

### Code

``` javascript
function searchBST(root, target) {
    if (!root) return null;

    if (root.val === target) return root;

    if (target < root.val) {
        return searchBST(root.left, target); // ✅ must return
    } else {
        return searchBST(root.right, target); // ✅ must return
    }
}
```

### Explanation

-   If the root is `null`, return `null` (base case).\
-   If the value matches the target, return the node.\
-   If target \< node value → search left subtree.\
-   Else → search right subtree.\
-   **Important:** We use `return` before recursive calls so the result
    bubbles back up to the top-level caller.

------------------------------------------------------------------------

### ❌ What if we don't use `return`?

``` javascript
if (target < root.val) {
    searchBST(root.left, target); // result ignored ❌
} else {
    searchBST(root.right, target); // result ignored ❌
}
```

-   Recursive calls may find the node deep inside, but their result
    never comes back.\
-   In JavaScript, if a function ends without `return`, it returns
    `undefined`.\
-   So the top-level call always ends up as `undefined`.

#### Example Dry Run (Without return)

Target = 6

    searchBST(8,6)
       → calls searchBST(3,6)
            → calls searchBST(6,6) = Node(6) ✅
            → result ignored → returns undefined ❌
       → returns undefined ❌

#### Example Dry Run (With return)

Target = 6

    searchBST(8,6)
       → return searchBST(3,6)
            → return searchBST(6,6) = Node(6) ✅
       → returns Node(6) ✅

------------------------------------------------------------------------

## ⚡ Approach 2: Iterative Search

### Code

``` javascript
function searchBST(root, target) {
    let curr = root;

    while (curr) {
        if (curr.val === target) return curr;

        if (target < curr.val) {
            curr = curr.left;
        } else {
            curr = curr.right;
        }
    }

    return null; // not found
}
```

### Explanation

-   Start from the root.\
-   Move left if target \< current value.\
-   Move right if target \> current value.\
-   If found, return node.\
-   If traversal ends (`curr` becomes null), target doesn't exist.

------------------------------------------------------------------------

## ⏱️ Time and Space Complexity

### Recursive Approach

-   **Time:** O(h), where `h` is the height of the tree.\
-   **Space:** O(h) (function call stack due to recursion).

### Iterative Approach

-   **Time:** O(h)\
-   **Space:** O(1) (no recursion stack, just a pointer).

------------------------------------------------------------------------

✅ **Conclusion:**\
- Use recursion for simplicity & clarity.\
- Use iteration for efficiency (no stack overhead).

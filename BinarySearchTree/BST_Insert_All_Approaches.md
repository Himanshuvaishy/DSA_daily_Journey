# 🌳 Binary Search Tree (BST) Insert Operation

We'll explore **three main approaches** for inserting into a Binary
Search Tree (BST):

1.  **Iterative Traversal Approach**
2.  **Recursive Top-Down Approach**
3.  **Recursive Bottom-Up Approach**

------------------------------------------------------------------------

## 1. Iterative Traversal Approach

### Code

``` js
insert(value) {
  const newNode = new Node(value);

  if (!this.root) {
    this.root = newNode;
    return this; // return entire tree
  }

  let current = this.root;
  while (true) {
    if (value === current.value) return undefined; // avoid duplicates

    if (value < current.value) {
      if (!current.left) {
        current.left = newNode;
        return this; // successfully inserted
      }
      current = current.left;
    } else {
      if (!current.right) {
        current.right = newNode;
        return this; // successfully inserted
      }
      current = current.right;
    }
  }
}
```

### Explanation

-   Start from the root.
-   Compare `value` with `current.value`:
    -   If smaller → go left.
    -   If larger → go right.
-   Continue until you find an empty spot (`null` child).
-   Insert the node there and return the BST (`this`).

🔎 **Why do we use `while (true)`?** - Tree can be any height --- we
don't know in advance when we'll find the spot.\
- With `while(true)`, we keep walking until we explicitly `return`.\
- Exit points: - `return this` when inserted.\
- `return undefined` if duplicate found.\
- So it's not infinite --- it's controlled.

### Dry Run Example

Insert `13` into this BST:

            10
           /        6    15
         / \          3   8     20

Steps: 1. Start at `10`. `13 > 10`, go right. 2. At `15`. `13 < 15`, go
left (empty). 3. Insert `13` at `15.left`.

Result:

            10
           /        6    15
         / \   /     3   8 13 20

------------------------------------------------------------------------

## 2. Recursive Top-Down Approach

### Code

``` js
insert(value) {
  const newNode = new Node(value);

  if (!this.root) {
    this.root = newNode;
    return this;
  }

  function helper(node) {
    if (value === node.value) return undefined; // no duplicates

    if (value < node.value) {
      if (!node.left) {
        node.left = newNode;
        return;
      }
      helper(node.left);
    } else {
      if (!node.right) {
        node.right = newNode;
        return;
      }
      helper(node.right);
    }
  }

  helper(this.root);
  return this;
}
```

### Explanation

-   If root is empty → set the new node as root.
-   Otherwise recurse downwards:
    -   If smaller → go left until spot is found.
    -   If larger → go right until spot is found.
-   Insert the node when null spot is reached.

### Dry Run Example

Insert `13` into the same BST:

-   Call `helper(10)` → `13 > 10`, go right → call `helper(15)`\
-   At `15`: `13 < 15`, go left → left is `null` → insert here.

Tree after insertion is same as iterative.

------------------------------------------------------------------------

## 3. Recursive Bottom-Up Approach

### Code

``` js
var insertIntoBST = function(root, val) {
    if (!root) {
        return new Node(val); // base case: found null spot
    }

    if (val < root.val) {
        root.left = insertIntoBST(root.left, val); // bubble result up
    } else if (val > root.val) {
        root.right = insertIntoBST(root.right, val); // bubble result up
    }
    // if val === root.val, we skip duplicates

    return root; // return updated subtree root
};
```

### Explanation

-   If root is `null` → create and return new node.\
-   Otherwise, recurse down:
    -   Insert into left if smaller.\
    -   Insert into right if larger.\
-   **Key difference:** Each recursive call returns the updated subtree
    root.\
-   As recursion unwinds, the parent pointers are updated correctly.\
-   Finally the original root (whole BST) is returned.

### Dry Run Example

Insert `6` into this BST:

        8
       /   3   10

Steps: 1. `insertIntoBST(8,6)` → 6 \< 8 → root.left = insertIntoBST(3,6)
2. `insertIntoBST(3,6)` → 6 \> 3 → root.right = insertIntoBST(null,6) 3.
`insertIntoBST(null,6)` → returns Node(6) 4. Bubble up: - Node(3).right
= Node(6) → return Node(3) - Node(8).left = Node(3 with right child 6) →
return Node(8)

Result:

        8
       /   3   10
           6

------------------------------------------------------------------------

## Comparison

  -------------------------------------------------------------------------------
  Feature           Iterative    Recursive Top-Down      Recursive Bottom-Up
  ----------------- ------------ ----------------------- ------------------------
  **Style**         Loop-based   Recurses until null,    Returns subtree root
                                 inserts directly        upward

  **Readability**   Clear,       Cleaner and elegant     Very elegant and
                    explicit                             functional

  **Memory**        O(1) extra   O(h) stack              O(h) stack

  **Performance**   O(h)         O(h)                    O(h)

  **Best For**      Beginners    Clean recursion         Functional recursive
                                                         solutions
  -------------------------------------------------------------------------------

------------------------------------------------------------------------

## Time & Space Complexity

-   **Time Complexity:** `O(h)` where `h` is height of tree.
    -   Balanced BST → `O(log n)`\
    -   Skewed BST → `O(n)`
-   **Space Complexity:**
    -   Iterative → `O(1)`\
    -   Recursive Top-Down → `O(h)`\
    -   Recursive Bottom-Up → `O(h)`

------------------------------------------------------------------------

✅ Now you have **all three insertion approaches** with clear
explanation and dry runs.

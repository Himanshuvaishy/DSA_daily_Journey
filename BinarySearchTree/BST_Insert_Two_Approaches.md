# Binary Search Tree (BST) Insert Operation

We’ll explore **two main approaches** for inserting into a Binary Search Tree (BST):

1. **Iterative Traversal Approach**
2. **Recursive Approach**

---

## 1. Iterative Traversal Approach

### Code
```js
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
- Start from the root.
- Compare `value` with `current.value`:
  - If smaller → go left.
  - If larger → go right.
- Continue until you find an empty spot (`null` child).
- Insert the node there and return the BST (`this`).


🔎 **Why do we use while (true) here?**
```js
1. Traversal without knowing the height of the tree

The tree could be of any height.

We don’t know in advance how many steps it will take to find the correct empty spot (null).

So, instead of for or while(some_condition), we just say while(true) → meaning:
“Keep going until I explicitly return after inserting.”

2. Guaranteed Exit (Not Infinite Loop)

At first it looks dangerous because while(true) normally means infinite loop.

But in our case, there are explicit exit points:

return this when we insert.

return undefined when duplicate is found.

So we’re not looping forever — we’re guaranteed to stop once insertion is done.

3. Why not while(current) instead?

If we used while(current), inside the loop when current becomes null, we’d already have missed the chance to insert the node.

With while(true), we never let current become null.

Instead, we check before moving whether current.left or current.right exists.

If not → insert there and return.

✅ So basically,

while(true) means “keep walking down the tree until I manually stop.”

The return statements ensure we stop exactly when the new node gets inserted.

We don’t know in advance how many steps it will take to find the correct empty spot (null).

So, instead of for or while(some_condition), we just say while(true) → meaning:
“Keep going until I explicitly return after inserting.”

Guaranteed Exit (Not Infinite Loop)

At first it looks dangerous because while(true) normally means infinite loop.

But in our case, there are explicit exit points:

return this when we insert.

return undefined when duplicate is found.

So we’re not looping forever — we’re guaranteed to stop once insertion is done.

Why not while(current) instead?

If we used while(current), inside the loop when current becomes null, we’d already have missed the chance to insert the node.

With while(true), we never let current become null.

Instead, we check before moving whether current.left or current.right exists.

If not → insert there and return.

✅ So basically,

while(true) means “keep walking down the tree until I manually stop.”

The return statements ensure we stop exactly when the new node gets inserted.
```

### Dry Run Example
Insert `13` into this BST:

```
        10
       /        6    15
     / \         3   8     20
```

Steps:
1. Start at `10`. `13 > 10`, go right.
2. At `15`. `13 < 15`, go left (empty).
3. Insert `13` at `15.left`.

Result:

```
        10
       /        6    15
     / \   /     3   8 13 20
```

---

## 2. Recursive Approach

### Code
```js
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
- Base condition: if the root is empty, set the new node as root.
- Otherwise, use recursion:
  - If smaller → go left and recurse.
  - If larger → go right and recurse.
- Once you find a null spot, insert the node.

### Dry Run Example
Insert `13` into the same BST:

- Call `helper(10)` → `13 > 10`, go right → call `helper(15)`
- `13 < 15`, go left → left is `null` → insert here.

Tree after insertion is the same as iterative result.

---

## Comparison

| Feature | Iterative | Recursive |
|---------|-----------|-----------|
| **Style** | Uses loops | Uses recursion |
| **Readability** | Explicit control flow | Cleaner & more elegant |
| **Memory** | O(1) extra space | O(h) call stack (h = height of tree) |
| **Performance** | Same time complexity | Same time complexity |
| **Best For** | Beginners, iterative problems | Elegant recursive solutions |

---

## Time & Space Complexity
- **Time Complexity:** `O(h)` where `h` is height of the tree.  
  - Balanced BST → `O(log n)`  
  - Skewed BST → `O(n)`
- **Space Complexity:**  
  - Iterative → `O(1)`  
  - Recursive → `O(h)` due to call stack

---

✅ Both approaches return **`this` (the whole tree)** so you can chain operations or still access the updated tree easily.


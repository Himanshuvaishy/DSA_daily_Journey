
# 🌳 Inorder Traversal (Recursive & Iterative)

---

## 📌 What is Inorder Traversal?
Inorder traversal of a binary tree visits nodes in the following order:
**Left → Root → Right**

---

## 🔹 Recursive Approach

### Code (JavaScript)
```js
function inorderRecursive(root) {
  if (root === null) return;
  inorderRecursive(root.left);
  console.log(root.val);
  inorderRecursive(root.right);
}
```

### Time Complexity
- **O(n)** → Each node is visited once.
- **O(h)** → Space complexity (h = height of tree, due to recursion stack).

---

## 🔹 Iterative Approach (Using Stack)

### Code (JavaScript)
```js
function inorderIterative(root) {
  let stack = [];
  let curr = root;

  while (curr !== null || stack.length > 0) {
    // Traverse to the leftmost node
    while (curr !== null) {
      stack.push(curr);
      curr = curr.left;
    }

    // Process the node
    curr = stack.pop();
    console.log(curr.val);

    // Move to the right subtree
    curr = curr.right;
  }
}
```

### Why do we need `curr !== null || stack.length > 0`?
- If we only check `stack.length > 0`, we might **miss the first push of root** when `stack` is empty but `curr` exists.
- If we only check `curr !== null`, then after reaching `null` (leaf’s left child), we would **stop without processing nodes from stack**.

👉 Example:  
Consider tree with single node `10`  
- Initially: `curr = 10, stack = []`  
- Condition: `(curr || stack.length)` = `(10 || 0)` → ✅ enter loop  
- Push 10, move left → `curr = null`  
- Outer condition again → `(null || [10])` → ✅ process 10  
✔️ Without checking both, traversal breaks.

---

## 🔹 Dry Run Example

### Tree:
```
      10
     /      5    15
```

### Iterative Dry Run
1. Start: `curr = 10, stack = []`
2. Push 10 → stack = [10], curr = 5
3. Push 5 → stack = [10, 5], curr = null
4. Pop 5 → print(5), curr = null
5. Outer loop → curr=null, stack=[10] ✅
6. Pop 10 → print(10), curr=15
7. Push 15 → stack=[15], curr=null
8. Pop 15 → print(15), curr=null  
✔️ Output = `5, 10, 15`

---

## 🔹 Time & Space Complexity

### Recursive:
- Time = **O(n)**
- Space = **O(h)** (recursion stack)

### Iterative:
- Time = **O(n)**
- Space = **O(h)** (stack stores nodes at most height of tree)

---

✅ Both approaches take **O(n)** time.  
Iterative avoids recursion but uses explicit stack. Recursive is simpler but may cause **stack overflow** in very deep trees.

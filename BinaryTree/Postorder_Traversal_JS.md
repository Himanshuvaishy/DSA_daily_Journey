# 🌲 Postorder Traversal in JavaScript

Postorder traversal order is:
**Left → Right → Root**

---

## ✅ Recursive Approach

### Code (JavaScript)
```js
function postorderTraversalRecursive(root) {
    let result = [];
    function traverse(node) {
        if (!node) return;
        traverse(node.left);   // Left
        traverse(node.right);  // Right
        result.push(node.val); // Root
    }
    traverse(root);
    return result;
}
```

### Dry Run Example
For tree:  
```
       1
      /      2   3
    / \       4   5    6
```
Steps:
1. Start at root `1` → go left to `2`.
2. From `2` → go left to `4`. No children → add `4`.
3. Back to `2` → go right to `5`. No children → add `5`.
4. Done with children of `2` → add `2`.
5. Back to `1` → go right to `3` → then right to `6` → add `6`.
6. Done with children of `3` → add `3`.
7. Done with children of `1` → add `1`.

**Output:** `[4, 5, 2, 6, 3, 1]`

### Time & Space Complexity
- **Time Complexity:** `O(n)` → each node is visited once.  
- **Space Complexity:** `O(h)` → recursive stack where `h` is tree height.

---

## ✅ Iterative Approach (One Stack)

We can simulate recursion using **one stack**.

### Code (JavaScript)
```js
function postorderTraversalIterative(root) {
    let result = [];
    let stack = [];
    let lastVisited = null;
    let current = root;

    while (stack.length > 0 || current) {
        if (current) {
            stack.push(current);
            current = current.left; // go left
        } else {
            let peekNode = stack[stack.length - 1];
            if (peekNode.right && lastVisited !== peekNode.right) {
                current = peekNode.right; // go right if not visited
            } else {
                result.push(peekNode.val); // visit root
                lastVisited = stack.pop();
            }
        }
    }
    return result;
}
```

### Dry Run Example
For tree:  
```
       1
      /      2   3
    / \       4   5    6
```
Steps:
1. Push `1`, go left → Push `2`, go left → Push `4` → left is null.
2. Peek `4`. No right child → visit `4` → result `[4]`.
3. Peek `2`. Right exists (`5`) and not visited → go right → Push `5`.
4. Peek `5`. No right → visit `5` → result `[4, 5]`.
5. Peek `2`. Right is visited → visit `2` → result `[4, 5, 2]`.
6. Peek `1`. Right exists (`3`) → go right → Push `3` → go right → Push `6`.
7. Peek `6`. Visit → result `[4, 5, 2, 6]`.
8. Peek `3`. Right visited → visit `3` → result `[4, 5, 2, 6, 3]`.
9. Peek `1`. Right visited → visit `1` → result `[4, 5, 2, 6, 3, 1]`.

**Output:** `[4, 5, 2, 6, 3, 1]`

### Time & Space Complexity
- **Time Complexity:** `O(n)` → each node is processed once.  
- **Space Complexity:** `O(h)` → stack stores nodes on path, worst case `O(n)` for skewed tree.

---

## 🔑 Key Takeaways
- Recursive approach is simpler to write and understand.
- Iterative one-stack approach is efficient but trickier to implement.
- Both achieve the same **postorder sequence**.


### Postorder Traversal (Iterative using Two Stacks)
📌 Reminder

- Postorder Traversal Order:
👉 Left → Right → Root

🔹 Idea Behind Two-Stack Approach

**We use two stacks:**

stack1 → for processing nodes

stack2 → for storing nodes in reverse postorder (Root → Right → Left)

Steps:
```js
Push the root into stack1.

While stack1 is not empty:

Pop a node from stack1 and push it into stack2.

Push left child into stack1.

Push right child into stack1.

Finally, pop all nodes from stack2 → this gives Postorder Traversal.

### Code (JavaScript)
**Postorder Traversal using Two Stacks**
```js
function postorderTwoStacks(root) {
    if (!root) return [];

    let stack1 = [];
    let stack2 = [];
    let result = [];

    stack1.push(root);

    while (stack1.length > 0) {
        let node = stack1.pop();
        stack2.push(node);

        if (node.left) stack1.push(node.left);
        if (node.right) stack1.push(node.right);
    }

    // Now pop from stack2 to get postorder
    while (stack2.length > 0) {
        result.push(stack2.pop().val);
    }

    return result;
}
```
🔹 Dry Run
```js
Let’s take the test case:

root = [1,2,3,4,5,null,8,null,null,6,7,9]

Step 1: Initial
stack1 = [1]
stack2 = []

Step 2: Process

Pop 1 → push to stack2

Push 2 (left), 3 (right) → stack1 = [2, 3]

stack1 = [2, 3]
stack2 = [1]


Pop 3 → push to stack2

Push 8 (right) → stack1 = [2, 8]

stack1 = [2, 8]
stack2 = [1, 3]


Pop 8 → push to stack2

Push 9 (left) → stack1 = [2, 9]

stack1 = [2, 9]
stack2 = [1, 3, 8]


Pop 9 → push to stack2
(no children)

stack1 = [2]
stack2 = [1, 3, 8, 9]


Pop 2 → push to stack2

Push 4 (left), 5 (right) → stack1 = [4, 5]

stack1 = [4, 5]
stack2 = [1, 3, 8, 9, 2]


Pop 5 → push to stack2

Push 6 (left), 7 (right) → stack1 = [4, 6, 7]

stack1 = [4, 6, 7]
stack2 = [1, 3, 8, 9, 2, 5]


Pop 7 → push to stack2
(no children)

stack1 = [4, 6]
stack2 = [1, 3, 8, 9, 2, 5, 7]


Pop 6 → push to stack2
(no children)

stack1 = [4]
stack2 = [1, 3, 8, 9, 2, 5, 7, 6]


Pop 4 → push to stack2
(no children)

stack1 = []
stack2 = [1, 3, 8, 9, 2, 5, 7, 6, 4]

Step 3: Reverse stack2

Result = [4, 6, 7, 5, 2, 9, 8, 3, 1]

✅ This matches postorder traversal.

🔹 Time & Space Complexity

Time Complexity:

Each node is pushed and popped from stack1 & stack2 once → O(N)

Space Complexity:

Two stacks store all nodes at worst → O(N)
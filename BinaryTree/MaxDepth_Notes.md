# 🌳 Maximum Depth of Binary Tree (DFS Approach)

## Problem Statement

Given the `root` of a binary tree, return its **maximum depth**.

-   The **maximum depth** is the number of nodes along the longest path
    from the root node down to the farthest leaf node.

------------------------------------------------------------------------

## ✅ Correct Approach (DFS with Depth Tracking)

We use **Depth-First Search (DFS)** with a helper function that tracks
the current depth.

### Code:

``` javascript
var maxDepth = function (root) {
    if (root == null) return 0;
    let maxDepth = 0;

    function traverse(curr, depth) {
        if (curr == null) return;

        // Update maxDepth whenever we reach a node
        maxDepth = Math.max(maxDepth, depth);

        // Recurse left and right with incremented depth
        traverse(curr.left, depth + 1);
        traverse(curr.right, depth + 1);
    }

    traverse(root, 1); // start with depth 1 at root
    return maxDepth;
};
```

------------------------------------------------------------------------

## 📊 Dry Run Example

### Example Tree:

            1
           /       2   3
         /     4   5

### Execution Steps (Stack Trace Simulation):

1.  `traverse(1, 1)` → maxDepth = 1
    -   Call left → `traverse(2, 2)`\
    -   Call right → `traverse(3, 2)`
2.  `traverse(2, 2)` → maxDepth = 2
    -   Call left → `traverse(4, 3)`\
    -   Call right → `traverse(5, 3)`
3.  `traverse(4, 3)` → maxDepth = 3
    -   Call left → `traverse(null, 4)` → return\
    -   Call right → `traverse(null, 4)` → return
4.  `traverse(5, 3)` → maxDepth = 3
    -   Call left → `traverse(null, 4)` → return\
    -   Call right → `traverse(null, 4)` → return
5.  `traverse(3, 2)` → maxDepth = 3
    -   Call left → `traverse(null, 3)` → return\
    -   Call right → `traverse(null, 3)` → return

Final `maxDepth = 3` ✅

------------------------------------------------------------------------

## ❌ Incorrect Approach (Your Initial Version)

Your first attempt:

``` javascript
var maxDepth = function (root) {
    if(root==null) return 0;
    let maxDepth = 0;
    let length = 1;

    function traverse(curr) {
        if(curr==null) return;
        length++;  // ❌ Issue: length keeps increasing globally
        maxDepth = Math.max(maxDepth, length);
        traverse(curr.left);
        traverse(curr.right);
    }

    traverse(root);
    return maxDepth;
};
```

### Why It Fails?

-   `length` was declared as a **global variable**, not tied to each
    path.
-   It increases every recursive call, even when **backtracking**.\
-   This means the depth is not reset when moving to a new branch.

🔎 Example:\
When exploring `root.left → left subtree`, `length` keeps increasing.\
When we backtrack and go to `root.right`, `length` does not reset →
causes overcounting.

------------------------------------------------------------------------

## 🎯 Key Takeaways

-   Always **pass depth as a parameter** in recursive DFS.\
-   Avoid using a single global counter (`length`) because recursion
    explores multiple paths independently.\
-   Use `Math.max` to keep track of the largest depth seen so far.

------------------------------------------------------------------------

## Final Answer:

The correct maximum depth algorithm is:

``` javascript
var maxDepth = function (root) {
    if (root == null) return 0;
    let maxDepth = 0;

    function traverse(curr, depth) {
        if (curr == null) return;
        maxDepth = Math.max(maxDepth, depth);
        traverse(curr.left, depth + 1);
        traverse(curr.right, depth + 1);
    }

    traverse(root, 1);
    return maxDepth;
};
```
```js

🌳 Maximum Depth of a Binary Tree — Top-Down vs Bottom-Up (JS)
Problem

Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from the root to a leaf.

 Two Core DFS Patterns
1) Top-Down (carry state downward)

You pass the current depth down the recursion.

You update an answer (e.g., maxDepth) at each node.

Information flow: parent ➜ child.

// Top-Down: carry `depth` down, update a shared answer
var maxDepth = function (root) {
  if (root == null) return 0;
  let maxDepth = 0;

  function traverse(curr, depth) {
    if (curr == null) return;                 // stop at null
    maxDepth = Math.max(maxDepth, depth);     // use current depth
    traverse(curr.left, depth + 1);
    traverse(curr.right, depth + 1);
  }

  traverse(root, 1); // root is depth 1
  return maxDepth;
};


Key points

You decide the starting depth (commonly 1 at root).

You must avoid global counters that don’t reset on backtrack (that causes bugs).

Great when you need to maintain prefix/state (e.g., path sums, constraints gathered from root).
```js

2) Bottom-Up (aggregate results upward)

Each call returns the height of its subtree to its parent.

Parent computes 1 + max(leftHeight, rightHeight).

Information flow: child ➜ parent.

// Bottom-Up: return height from children and add 1
var maxDepth = function (root) {
  if (root == null) return 0;                 // empty subtree has height 0
  const left = maxDepth(root.left);
  const right = maxDepth(root.right);
  return 1 + Math.max(left, right);
};
```

### Key points

Very concise and mathematically mirrors the definition of height.

No external mutable state needed.

Natural fit for problems where the answer is a pure function of subtrees.

## Deep Dive: What’s the Real Difference?

| Aspect              | Top-Down (DFS with depth passed down)                   | Bottom-Up (DFS with return values)                   |
|---------------------|---------------------------------------------------------|------------------------------------------------------|
| **Info flow**       | Parent passes depth/state down                          | Children return heights/results up                   |
| **Update moment**   | Update `maxDepth` on visit                              | Compute height on return                             |
| **State**           | Often uses a captured variable (closure)                | Pure recursion; no external state                    |
| **Expressiveness**  | Easy to track prefix constraints (e.g., “how many evens on path so far”) | Easy to compute subtree metrics (diameter/height) |
| **Base case**       | `if (node == null) return;` (use current depth)         | `if (node == null) return 0;` (height of empty subtree) |
| **Off-by-one risk** | Must pick correct start (e.g., depth = 1 at root)       | Very low; formula handles it                         |
| **Early pruning**   | Easy (skip branches when condition fails)               | Less direct; usually must compute both sides         |
| **Global-state pitfalls** | Possible if using a single counter                | Minimal (no global mutation)                         |


### Bottom line:

Use Top-Down when you need context from root to node (prefix sums, constraints, path building).

Use Bottom-Up when the answer is a combination of child results (heights, balances, DP-on-tree).

Correctness Dry Runs (same tree)

Tree:

        1
       / \
      2   3
     / \
    4   5


Expected max depth = 3.

Top-Down (stack view)

traverse(1,1) → maxDepth = 1

traverse(2,2) → maxDepth = 2

traverse(4,3) → maxDepth = 3

traverse(null,4) → return

traverse(null,4) → return

traverse(5,3) → maxDepth = 3

traverse(null,4) → return

traverse(null,4) → return

traverse(3,2) → maxDepth = 3

traverse(null,3) → return

traverse(null,3) → return
Result: 3

Bottom-Up (return values)

At 4 and 5: return 1

At 2: 1 + max(1,1) = 2

At 3: 1 + max(0,0) = 1

At 1: 1 + max(2,1) = 3
Result: 3

Time & Space Complexity

Both approaches visit each node once:

Time: O(N) for N nodes.

Space: O(H) recursion stack in the worst case (H = height; skewed tree → O(N), balanced → O(log N)).

Common Pitfalls & Edge Cases

Empty tree: return 0 (both versions handle it).

Skewed tree: recursion depth may reach N.

Top-Down off-by-one: ensure traverse(root, 1) (not 0) if you define depth as node count.

Global counter bug (wrong):

// ❌ Anti-pattern: global length that only increments
let length = 1;
function traverse(node) {
  if (!node) return;
  length++;                    // grows across branches
  // ... never decremented on backtrack → OVERCOUNTS
}


This fails because recursion explores many branches; a single global counter doesn’t reflect the per-path depth. Either pass depth (Top-Down) or return heights (Bottom-Up).

Which One Should I Use?

Prefer Bottom-Up for clean height/size computations.

Prefer Top-Down when the node’s value depends on the path from the root (limits, sums, labels, ancestors, etc.).
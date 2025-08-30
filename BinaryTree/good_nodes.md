# Count Good Nodes in Binary Tree

## Problem Statement
Given a binary tree, a node **X** is considered *good* if on the path from the root to `X`, there are no nodes with a value greater than `X`.  
Return the number of *good nodes* in the binary tree.

---

### Example
**Input:**
    3
   / \
  1   4
 /   / \
3   1   5

**Output:** `4`

**Explanation:**  
- Node 3 (root) is always good.  
- Node 1 (left child of 3) is not good because `3 > 1`.  
- Node 3 (left child of 1) is good because all ancestors ≤ 3.  
- Node 4 is good because `4 ≥ 3`.  
- Node 1 (right child of 4) is not good because `4 > 1`.  
- Node 5 is good because it is the max so far.

---

## Approach 1: Recursive DFS

### Code
```javascript
var goodNodes = function(root) {
    let ans = 0;

    let traversal = (curr, maxSeenSoFar) => {
        if (curr.val >= maxSeenSoFar) {
            ++ans;
        }

        let currMax = Math.max(maxSeenSoFar, curr.val);

        if (curr.left) traversal(curr.left, currMax);
        if (curr.right) traversal(curr.right, currMax);
    };

    traversal(root, -Infinity);
    return ans;
};
Explanation

Start DFS from the root.

Keep track of the maximum value seen so far along the path.

If the current node value ≥ maximum so far → it's a good node.

Update maximum and continue traversal for left and right subtrees.
Dry Run (Recursive)

Input Tree:

        3
       / \
      1   4
     /   / \
    3   1   5


Start at root 3, maxSeenSoFar = -∞ → 3 >= -∞ ✅ good. ans = 1.
Update max = 3.

Traverse left(1, max=3)

Traverse right(4, max=3)

Node 1, max=3 → 1 >= 3 ❌ not good. ans = 1.
max = 3. Traverse left(3, 3).

Node 3, max=3 → 3 >= 3 ✅ good. ans = 2.
No children. Backtrack.

Node 4, max=3 → 4 >= 3 ✅ good. ans = 3.
Update max=4.

Left(1, 4)

Right(5, 4)

Node 1, max=4 → 1 >= 4 ❌ not good. ans = 3.

Node 5, max=4 → 5 >= 4 ✅ good. ans = 4.

Final Answer: 4
```
**Approach 2: Iterative DFS with Stack**
Code
```javascript
var goodNodes = function(root) {
    if (!root) return 0;
    let count = 0;
    let stack = [[root, -Infinity]]; // pair of (node, maxSoFar)

    while (stack.length) {
        let [node, maxSoFar] = stack.pop();

        if (node.val >= maxSoFar) {
            count++;
        }

        let newMax = Math.max(maxSoFar, node.val);

        if (node.left) stack.push([node.left, newMax]);
        if (node.right) stack.push([node.right, newMax]);
    }
    return count;
};

Explanation

Use stack to simulate DFS traversal.

Each stack element stores (node, maxSoFar).

Process node: if node.val >= maxSoFar, count it.

Push children with updated maximum.

Dry Run (Iterative)

Tree:

        3
       / \
      1   4
     /   / \
    3   1   5


Stack = [(3, -∞)], count=0

Pop (3, -∞): 3 >= -∞ ✅ count=1, push (1,3) and (4,3).

Pop (4,3): 4 >= 3 ✅ count=2, push (1,4) and (5,4).

Pop (5,4): 5 >= 4 ✅ count=3.

Pop (1,4): 1 >= 4 ❌ count=3.

Pop (1,3): 1 >= 3 ❌ count=3, push (3,3).

Pop (3,3): 3 >= 3 ✅ count=4.

Stack empty → Final Answer = 4

Complexity Analysis

Time Complexity:
O(N) where N = number of nodes, since each node is visited once.

Space Complexity:

Recursive: O(H) due to recursion stack (H = height of tree).

Iterative: O(N) in worst case (skewed tree, stack holds all nodes).
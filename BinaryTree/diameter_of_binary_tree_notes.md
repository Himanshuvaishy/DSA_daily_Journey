# Diameter of Binary Tree

## Problem Statement
The **diameter of a binary tree** is the length of the longest path between any two nodes.  
- The path may or may not pass through the root.  
- The length is measured in terms of **edges**.

---

## Example
```
       1
      / \
     2   3
    / \
   4   5
```

- Longest path: `4 → 2 → 1 → 3` or `5 → 2 → 1 → 3`
- Diameter = **3 edges**

---

## Approach (DFS + Height in Same Call)
We calculate the height of each node’s left and right subtree while keeping track of the maximum diameter.

Steps:
1. For each node, compute left height and right height.  
2. Candidate diameter = `leftHeight + rightHeight`.  
3. Update global maximum diameter.  
4. Return `1 + max(leftHeight, rightHeight)` as the node’s height.  

---

## Code (JavaScript)
```javascript
var diameterOfBinaryTree = function(root) {
    let maxDiameter = 0;

    const findDepth = (node) => {
        if (!node) return 0;

        let left = findDepth(node.left);
        let right = findDepth(node.right);

        // Update diameter through this node
        maxDiameter = Math.max(maxDiameter, left + right);

        // Return height of node
        return 1 + Math.max(left, right);
    };

    findDepth(root);
    return maxDiameter;
};
```

---

## Dry Run

### Function Call:
`diameterOfBinaryTree(root)` where

```
root = TreeNode(1)
├── left: TreeNode(2)
│   ├── left: TreeNode(4)
│   └── right: TreeNode(5)
└── right: TreeNode(3)
```

---

### Step-by-Step Execution

**Step 1:**  
→ Call `findDepth(1)`  

**Step 2:**  
→ Call `findDepth(2)`  

**Step 3:**  
→ Call `findDepth(4)`  

**Step 4:**  
→ Call `findDepth(null)` → return 0  
→ Call `findDepth(null)` → return 0  
→ Node 4 → leftDepth = 0, rightDepth = 0  
→ currDiameter = 0  
→ maxDiameter = max(0, 0) = 0  
→ Return depth = 1  

**Step 5:**  
→ Back to Node 2  
→ leftDepth = 1  
→ Call `findDepth(5)`  

**Step 6:**  
→ Call `findDepth(null)` → return 0  
→ Call `findDepth(null)` → return 0  
→ Node 5 → leftDepth = 0, rightDepth = 0  
→ currDiameter = 0  
→ maxDiameter = max(0, 0) = 0  
→ Return depth = 1  

**Step 7:**  
→ Back to Node 2  
→ rightDepth = 1  
→ Node 2 → leftDepth = 1, rightDepth = 1  
→ currDiameter = 2  
→ maxDiameter = max(0, 2) = 2  
→ Return depth = 2  

**Step 8:**  
→ Back to Node 1  
→ leftDepth = 2  
→ Call `findDepth(3)`  

**Step 9:**  
→ Call `findDepth(null)` → return 0  
→ Call `findDepth(null)` → return 0  
→ Node 3 → leftDepth = 0, rightDepth = 0  
→ currDiameter = 0  
→ maxDiameter = max(2, 0) = 2  
→ Return depth = 1  

**Step 10:**  
→ Back to Node 1  
→ rightDepth = 1  
→ Node 1 → leftDepth = 2, rightDepth = 1  
→ currDiameter = 3  
→ maxDiameter = max(2, 3) = 3  
→ Return depth = 3  

---

## Final Result:
Diameter = **3**


# Diameter of Binary Tree - Bigger Tree Dry Run

## Tree Structure
        1
      /   \
     2     3
    / \     
   4   5    
      / \
     6   7

- Longest path: `6 → 5 → 2 → 1 → 3`  
- Diameter = **4 edges**

---

## Function Call
`diameterOfBinaryTree(root)`

---

## Step-by-Step Execution

**Step 1:**  
→ Call `findDepth(1)`  
→ Call `findDepth(2)`

**Step 2:**  
→ Call `findDepth(4)`  
→ `findDepth(null)` → return 0  
→ `findDepth(null)` → return 0  
→ Node 4 → leftDepth = 0, rightDepth = 0  
→ currDiameter = 0  
→ maxDiameter = 0  
→ Return depth = 1  

**Step 3:**  
→ Back to Node 2  
→ leftDepth = 1  
→ Call `findDepth(5)`

**Step 4:**  
→ Call `findDepth(6)`  
→ `findDepth(null)` → return 0  
→ `findDepth(null)` → return 0  
→ Node 6 → depth = 1  
→ currDiameter = 0  
→ maxDiameter = 0  

**Step 5:**  
→ Call `findDepth(7)`  
→ `findDepth(null)` → return 0  
→ `findDepth(null)` → return 0  
→ Node 7 → depth = 1  
→ currDiameter = 0  
→ maxDiameter = 0  

**Step 6:**  
→ Back to Node 5  
→ leftDepth = 1, rightDepth = 1  
→ Node 5 → depth = 2  
→ currDiameter = 2  
→ maxDiameter = max(0, 2) = 2  

**Step 7:**  
→ Back to Node 2  
→ rightDepth = 2  
→ Node 2 → depth = 3  
→ currDiameter = 3  
→ maxDiameter = max(2, 3) = 3  

**Step 8:**  
→ Back to Node 1  
→ leftDepth = 3  
→ Call `findDepth(3)`  
→ `findDepth(null)` → 0  
→ `findDepth(null)` → 0  
→ Node 3 → depth = 1  
→ currDiameter = 0  
→ maxDiameter = 3  

**Step 9:**  
→ Back to Node 1  
→ rightDepth = 1  
→ Node 1 → leftDepth = 3, rightDepth = 1  
→ currDiameter = 4  
→ maxDiameter = max(3, 4) = 4  
→ Return depth = 4  

---

## Final Result
Diameter = **4**

---

## Call Stack Trace (Simplified)

findDepth(1)
├─ findDepth(2)
│ ├─ findDepth(4) → depth=1
│ └─ findDepth(5)
│ ├─ findDepth(6) → depth=1
│ └─ findDepth(7) → depth=1
│ → Node 5 → depth=2, currDiameter=2
│ → Node 2 → depth=3, currDiameter=3
└─ findDepth(3) → depth=1
→ Node 1 → depth=4, currDiameter=4


✅ Diameter = 4 (longest path = `6 → 5 → 2 → 1 → 3`).

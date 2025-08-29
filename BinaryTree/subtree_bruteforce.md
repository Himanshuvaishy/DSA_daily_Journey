
# 🌲 Subtree of Another Tree — Brute Force Approach (LeetCode 572)

This note explains the **brute force** solution with clear **tree structures (ASCII)**, a detailed **step-by-step explanation**, and **two dry runs** (simple + bigger tree). Code is in **JavaScript**.

---

## 🧩 Problem
Given two binary trees `root` and `subRoot`, return **true** if `subRoot` is a **subtree** of `root`.  
A subtree means there exists a node in `root` such that the tree starting from that node is **identical** to `subRoot` (same structure and values).

---

## 🌳 Tree Structure (ASCII)
We’ll write trees like this:

```
root = Node(val)
├── left:  Node(...)
└── right: Node(...)
```

Example:
```
root =
1
├── 2
│   ├── 4
│   └── 5
└── 3
```

---

## 💡 Brute Force Idea
1. **At every node in `root`**, check whether the subtree rooted at that node is **identical** to `subRoot`.
2. Use a helper `isSameTree(a, b)` that returns true if two trees are structurally identical with equal values.
3. If not identical at the current node, **recurse** into `root.left` and `root.right`.

This guarantees correctness because if `subRoot` exists anywhere in `root`, we will eventually compare against it.

---

## 🧪 Equality Helper: `isSameTree`
Rules:
- Both nodes `null` → **true**
- One `null`, one not → **false**
- Values differ → **false**
- Otherwise → compare **left** and **right** subtrees recursively

---

## 🧑‍💻 JavaScript Code (Brute Force)
```javascript
var isSubtree = function(root, subRoot) {
    if (!root) return false;
    if (isSameTree(root, subRoot)) return true;
    return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

function isSameTree(a, b) {
    if (!a && !b) return true;
    if (!a || !b) return false;
    if (a.val !== b.val) return false;
    return isSameTree(a.left, b.left) && isSameTree(a.right, b.right);
}
```

---

## 🔎 Dry Run #1 (Simple Match)

### Trees
```
root =
3
├── 4
│   ├── 1
│   └── 2
└── 5

subRoot =
4
├── 1
└── 2
```

### Step-by-step
1. `isSubtree(root=3, subRoot=4)`  
   - `isSameTree(3,4)` → values differ → **false**  
   - Recurse left and right.

2. **Left subtree**: `isSubtree(root=4, subRoot=4)`  
   - `isSameTree(4,4)` → values equal  
     - Compare left: `isSameTree(1,1)` → true  
     - Compare right: `isSameTree(2,2)` → true  
     - Both sides true → **isSameTree = true** → return **true**

✅ Answer: `true`

Why it works: We checked at node `3` (mismatch), then at node `4` (match).

---

## 🔎 Dry Run #2 (Bigger Tree, Deep Match)

### Trees
```
root =
8
├── 3
│   ├── 1
│   └── 6
│       ├── 4
│       │   ├── 1
│       │   └── 2
│       │       └── 5
│       └── 7
└── 10
    └── 14
        ├── 13
        └── (null)

subRoot =
4
├── 1
└── 2
    └── 5
```

### What should happen
- The desired match is the subtree rooted at **the left child (4) of node 6** in `root`:
```
4
├── 1
└── 2
    └── 5
```
- There are many non-matching nodes before reaching this `4`; the brute force will **check many nodes**.

### Detailed Trace (key comparisons)
We write calls as `isSubtree(nodeVal, subRootRootVal)` and `isSameTree(aVal, bVal)`.

1. `isSubtree(8, 4)`  
   - `isSameTree(8, 4)` → **false**  
   - Recurse into left (3) and right (10).

2. **Left branch** `isSubtree(3, 4)`  
   - `isSameTree(3, 4)` → **false**  
   - Recurse into `1` and `6`.

3. `isSubtree(1, 4)`  
   - `isSameTree(1, 4)` → **false**  
   - Recurse into `null` children → both return **false**.

4. `isSubtree(6, 4)`  
   - `isSameTree(6, 4)` → **false**  
   - Recurse into `4` and `7`.

5. **Here is the match candidate** `isSubtree(4, 4)`  
   - `isSameTree(4, 4)` → values equal  
     - Compare left: `isSameTree(1, 1)` → true  
       - Children both `null` → still true  
     - Compare right: `isSameTree(2, 2)` → values equal  
       - Left: `isSameTree(null, null)` → true  
       - Right: `isSameTree(5, 5)` → values equal  
         - Children both `null` → true  
       - Both left & right true → subtree at `2` matches  
     - Both left & right for node `4` are true → **isSameTree = true**
   - `isSubtree(4, 4)` returns **true** → Stop and **bubble up true**.

(We would not need to check `isSubtree(7, 4)` or the right side of the original root once a match is found.)

✅ Final Answer: `true`

### Visualization of path taken
```
8 → 3 → 1   (no)
        ↘ 6 → 4  (YES, match here) 
             ↘ 7 (not needed)
10 → 14 ... (not needed)
```

---

## ⏱️ Complexity
- Let `m = |root|` nodes, `n = |subRoot|` nodes.
- **Time:** Worst-case `O(m * n)`  
  (At each of the `m` nodes, `isSameTree` may compare up to `n` nodes.)
- **Space:** `O(h_root + h_sub)` due to recursion depth.

---

## 🧊 Common Edge Cases
- `subRoot` is `null` → typically considered **true** (empty tree is a subtree). If your platform defines otherwise, adjust.  
- `root` is `null` but `subRoot` isn’t → **false**.  
- Duplicate values (e.g., multiple nodes with value `4`): make sure **structure** also matches, not just values.  
- Unbalanced trees or skewed shapes → recursion depth may be high.

---

## 🛠️ Notes & Alternatives
- **Optimized idea**: serialize trees with markers and use **string matching** (e.g., KMP / Z-algorithm) to reduce average comparisons.  
- **Hashing approach**: Merkle hashing / rolling hash for subtree equality (careful with collisions).  
- Brute force stays the most straightforward and interview-friendly to implement first.

---

## ✅ Takeaway
Brute force = “**Try at every node** + **Exact equality check**”.  
It’s simple, correct, and often fast enough for moderate inputs.


# 🌳 Subtree of Another Tree (Optimal Approach using Serialization)

## 📌 Problem Statement
Given the roots of two binary trees `root` and `subRoot`, return `true` if there is a subtree of `root` with the same structure and node values as `subRoot` and `false` otherwise.  

A subtree of a binary tree `tree` is a tree that consists of a node in `tree` and all of this node's descendants. The tree `tree` could also be considered as a subtree of itself.

### Example 1
Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true


### Example 2


Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false


---

## 💡 Approach (Serialization + Substring Check)

1. **Serialize both trees** using **preorder traversal** (root-left-right).  
   - Use a special marker `#` for null nodes to avoid ambiguity.  
   - Example: `[1, null, 2]` → `"-1-#-2-#-#"`

2. Convert both trees into **strings** (`hashRoot` and `hashSubRoot`).

3. Check if `hashSubRoot` is a **substring** of `hashRoot`.  
   - If yes → `subRoot` is a subtree of `root`.  
   - If no → return false.

### Why does this work?
- Including `#` markers ensures that different structures don't accidentally match.  
  Example: `1` with left child `2` vs `1` with right child `2` → serialization will be different.

```js 🌳 Serialization in Trees
🔹 What is Serialization?

Serialization is the process of converting a tree data structure (or any data structure) into a linear format such as a string or array.

This makes the tree easy to store, transfer, or compare, since strings/arrays are much simpler than trees.

For example, a binary tree like this:

      1
     / \
    2   3


Can be serialized into a string:

"1,2,#,#,3,#,#"

🔹 Why Do We Use Serialization?

Comparison –

In the subtree problem, instead of comparing two trees node-by-node repeatedly, we serialize both trees into strings and check if one string is a substring of the other.

This reduces complexity and avoids redundant comparisons.

Storage –

If you want to save a tree into a file or database, you cannot directly store its pointer structure. Serialization allows us to store it as text.

Transmission –

If you want to send a tree over a network, you cannot send memory pointers. Serialization converts it into a transportable format.

Reconstruction (Deserialization) –

Once serialized, we can later rebuild the exact same tree using deserialization (reverse process).

🔹 When Do We Use Serialization?

Checking subtree problems (like isSubtree)

Tree equality problems (to check if two trees are identical by comparing their serialized strings)

Storing data structures (in databases, files, or cache systems)

Network communication (sending tree structures between systems)

Preorder/Postorder storage (common in LeetCode & interview problems)

🔹 Example with Preorder Serialization

Consider this tree:

      4
     / \
    2   5

Preorder Traversal with Null Markers:

Visit root → 4

Go left → 2

Left of 2 is null → #

Right of 2 is null → #

Go right → 5

Left of 5 is null → #

Right of 5 is null → #

👉 Serialized string:

"4-2-#-#-5-#-#"


This uniquely represents the structure and values of the tree.

✅ In short:
Serialization = Tree → String
Deserialization = String → Tree

We use it mainly to compare, store, or transfer tree structures efficiently.
```
---

## 📝 Dry Run

### Input:


root = [3,4,5,1,2]
subRoot = [4,1,2]


### Step 1: Serialize `root`


root serialization:
3 → "-3"
left(4) → "-4"
left(1) → "-1"
left → "-#"
right → "-#"
right(2) → "-2"
left → "-#"
right → "-#"
right(5) → "-5"
left → "-#"
right → "-#"

hashRoot = "-3-4-1-#-#-2-#-#-5-#-#"


### Step 2: Serialize `subRoot`


subRoot serialization:
4 → "-4"
left(1) → "-1"
left → "-#"
right → "-#"
right(2) → "-2"
left → "-#"
right → "-#"

hashSubRoot = "-4-1-#-#-2-#-#"


### Step 3: Substring Check


hashRoot.includes(hashSubRoot) → true


✅ Output = `true`

---

## 💻 Code (JavaScript)

```javascript
var isSubtree = function(root, subRoot) {
    let hashRoot = serialize(root);
    let hashSubRoot = serialize(subRoot);

    return hashRoot.includes(hashSubRoot);
};

let serialize = function(root) {
    let hash = "";
    let traversal = (curr) => {
        if (!curr) {
            hash = hash + "-#"; // marker for null
            return;
        }
        hash = hash + "-" + curr.val; // add current node
        traversal(curr.left);        // serialize left
        traversal(curr.right);       // serialize right
    };
    traversal(root);
    return hash;
};

⏱️ Complexity Analysis

Time Complexity:

O(N + M) for serializing both trees (N = #nodes in root, M = #nodes in subRoot)

O(N + M) for substring check (using KMP or built-in efficient implementation).

Overall: O(N + M)

Space Complexity:

O(N + M) for storing serialized strings.

Recursion stack in traversal: O(H) (height of tree).

Overall: O(N + M)
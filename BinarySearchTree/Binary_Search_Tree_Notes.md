
# 🌳 Binary Search Tree (BST) – Complete Notes with JavaScript

---

## 📌 What is a Binary Search Tree?
A **Binary Search Tree (BST)** is a type of **binary tree** with an ordering rule:

- Each node has at most **two children**.  
- The **left child** contains values **smaller** than the parent.  
- The **right child** contains values **greater** than the parent.  
- No duplicates (in most cases).  

---

## ✅ Properties of BST
1. Searching is efficient (like binary search on arrays).  
2. Inorder traversal gives values in **sorted order**.  
3. Supports dynamic **insertion** and **deletion**.  

---

## ⚡ Operations on BST

---

### 🟢 1. **Search**

#### 📖 Explanation
To find whether a value exists in a BST:  
1. Start at the root.  
2. If the value = root → found.  
3. If the value < root → move left.  
4. If the value > root → move right.  
5. If you reach `null`, the value does not exist.  

#### 💻 Code
```js
search(value) {
  let current = this.root;
  while (current) {
    if (value === current.value) return true;
    if (value < current.value) {
      current = current.left;
    } else {
      current = current.right;
    }
  }
  return false;
}
```

#### 🔍 Dry Run
BST Example: Inserted `[10, 5, 15, 3, 7]`

```
        10
       /  \
      5    15
     / \
    3   7
```

Search `7`:  
- Compare with 10 → smaller → go left.  
- Compare with 5 → greater → go right.  
- Found `7`. ✅  

Search `20`:  
- Compare with 10 → greater → go right.  
- Compare with 15 → greater → go right.  
- Null → Not found ❌  

---

### 🟢 2. **Insert**

#### 📖 Explanation
To insert a new value:  
1. Start from root.  
2. If new value < current → go left.  
3. If new value > current → go right.  
4. Place the value at the first null position.  

#### 💻 Code
```js
insert(value) {
  const newNode = new Node(value);

  if (!this.root) {
    this.root = newNode;
    return this;
  }

  let current = this.root;
  while (true) {
    if (value === current.value) return undefined; // no duplicates

    if (value < current.value) {
      if (!current.left) {
        current.left = newNode;
        return this;
      }
      current = current.left;
    } else {
      if (!current.right) {
        current.right = newNode;
        return this;
      }
      current = current.right;
    }
  }
}
```

#### 🔍 Dry Run
Insert values `[10, 5, 15, 3, 7]`

1. Insert `10` → becomes root.  
2. Insert `5` → smaller than 10 → goes left.  
3. Insert `15` → greater than 10 → goes right.  
4. Insert `3` → smaller than 10 → go left → smaller than 5 → goes left.  
5. Insert `7` → smaller than 10 → go left → greater than 5 → goes right.  

Final BST:

```
        10
       /  \
      5    15
     / \
    3   7
```

---

### 🟢 3. **Delete**

#### 📖 Explanation
Deleting a node has **3 cases**:  
1. **Leaf node** (no children) → remove directly.  
2. **One child** → replace node with its child.  
3. **Two children** →  
   - Find inorder successor (smallest in right subtree).  
   - Replace node’s value with successor’s value.  
   - Delete the successor.  

#### 💻 Code
```js
deleteNode(root, value) {
  if (!root) return null;

  if (value < root.value) {
    root.left = this.deleteNode(root.left, value);
  } else if (value > root.value) {
    root.right = this.deleteNode(root.right, value);
  } else {
    // Case 1: No child
    if (!root.left && !root.right) return null;

    // Case 2: One child
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Case 3: Two children
    let successor = this.findMin(root.right);
    root.value = successor.value;
    root.right = this.deleteNode(root.right, successor.value);
  }
  return root;
}

findMin(node) {
  while (node.left) node = node.left;
  return node;
}
```

#### 🔍 Dry Run
BST before deletion:  
```
        10
       /  \
      5    15
     / \
    3   7
```

- Delete **leaf node 3** → simply remove.  
```
        10
       /  \
      5    15
       \
        7
```

- Delete **node 5 (one child)** → replace with child `7`.  
```
        10
       /  \
      7    15
```

- Delete **node 10 (two children)** →  
  - Inorder successor = `15`.  
  - Replace `10` with `15`.  
  - Delete `15`.  

Final BST:  
```
        15
       /
      7
```

---

### 🟢 4. **Traversal**

#### 📖 Explanation
Ways to visit all nodes:  

1. **Inorder (Left → Root → Right)** → gives sorted order.  
2. **Preorder (Root → Left → Right)** → useful to copy tree.  
3. **Postorder (Left → Right → Root)** → useful for deleting tree.  

#### 💻 Code
```js
// Inorder Traversal
inorder(node = this.root, result = []) {
  if (!node) return result;
  this.inorder(node.left, result);
  result.push(node.value);
  this.inorder(node.right, result);
  return result;
}

// Preorder Traversal
preorder(node = this.root, result = []) {
  if (!node) return result;
  result.push(node.value);
  this.preorder(node.left, result);
  this.preorder(node.right, result);
  return result;
}

// Postorder Traversal
postorder(node = this.root, result = []) {
  if (!node) return result;
  this.postorder(node.left, result);
  this.postorder(node.right, result);
  result.push(node.value);
  return result;
}
```

#### 🔍 Dry Run
BST:  
```
        10
       /  \
      5    15
```

- **Inorder** → `[5, 10, 15]`  
- **Preorder** → `[10, 5, 15]`  
- **Postorder** → `[5, 15, 10]`  

---

## ⏱️ Time Complexity Summary
| Operation | Average Case | Worst Case |
|-----------|--------------|------------|
| Search    | O(log n)     | O(n) |
| Insert    | O(log n)     | O(n) |
| Delete    | O(log n)     | O(n) |
| Traversal | O(n)         | O(n) |

---

✅ These notes now cover **theory + code + dry runs** for all major BST operations.

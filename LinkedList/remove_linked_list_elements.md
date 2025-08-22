# Remove Linked List Elements in JavaScript

This document explains how to **remove all nodes of a given value** from a linked list using two approaches:

1. **Without Dummy Node**
2. **With Dummy Node (Preferred Approach)**

---

## Problem Statement
Given the head of a linked list and an integer `val`, remove all nodes from the linked list that have `Node.val == val` and return the new head.

Example:
```
Input:  1 → 2 → 6 → 3 → 4 → 5 → 6, val = 6
Output: 1 → 2 → 3 → 4 → 5
```

---

## 1. Approach 1: Without Dummy Node

### 💡 Idea
- Remove nodes directly from the head if they match the value.
- Traverse through the list and skip nodes with the given value.

### Code
```javascript
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function removeElements(head, val) {
  // Step 1: Remove from head while needed
  while (head !== null && head.val === val) {
    head = head.next;
  }

  // Step 2: Traverse remaining list
  let current = head;
  while (current !== null && current.next !== null) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return head;
}

// Example usage
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(6);
head.next.next.next = new ListNode(3);
head.next.next.next.next = new ListNode(4);
head.next.next.next.next.next = new ListNode(5);
head.next.next.next.next.next.next = new ListNode(6);

console.log(removeElements(head, 6)); // Linked List without 6's
```

### ✅ Time & Space Complexity
- **Time:** O(n) (traverses list once)  
- **Space:** O(1) (in-place)

---

## 2. Approach 2: With Dummy Node (Preferred)

### 💡 Idea
- Introduce a dummy node **before head**.  
- This simplifies removal of nodes (especially when head itself must be removed).

### Code
```javascript
function removeElementsDummy(head, val) {
  let dummy = new ListNode(0);
  dummy.next = head;
  let current = dummy;

  while (current.next !== null) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return dummy.next;
}

// Example usage
let head2 = new ListNode(1);
head2.next = new ListNode(2);
head2.next.next = new ListNode(6);
head2.next.next.next = new ListNode(3);
head2.next.next.next.next = new ListNode(4);
head2.next.next.next.next.next = new ListNode(5);
head2.next.next.next.next.next.next = new ListNode(6);

console.log(removeElementsDummy(head2, 6)); // Linked List without 6's
```

### ✅ Time & Space Complexity
- **Time:** O(n)  
- **Space:** O(1)

---

## 🔎 Dry Run (With Dummy Node)

Input:
```
head = 1 → 2 → 6 → 3, val = 6
```

1. Dummy list: `0 → 1 → 2 → 6 → 3`  
2. `current = dummy`. Check `1` → not equal → move forward.  
3. Check `2` → not equal → move forward.  
4. Check `6` → equal → skip it → list becomes `0 → 1 → 2 → 3`.  
5. Continue until end.

Final list:  
```
1 → 2 → 3
```

---

## ❓ Why Dummy Node is Preferred?

- Simplifies handling of edge cases where **head node itself needs removal**.  
- Without dummy node → extra loop needed to adjust `head`.  
- With dummy node → uniform logic for all nodes, including head.  
- Cleaner, less error-prone implementation.
⚖️ Why Use Dummy Node?

## Without Dummy Node
- We must separately check if the head itself has the value and keep updating it. This adds extra complexity.

## With Dummy Node
- We attach a fake node (dummy) before the head. Now, even if the head must be deleted, the logic is the same for all nodes.
✅ Cleaner, avoids special handling, and reduces bugs.

Example:

Input: [6,6,1,2], val = 6

Without dummy → need extra logic to move head until it reaches 1

With dummy → dummy points to [6,6,1,2], loop removes first two 6s, done!
---

## 📌 Final Notes
- **Without Dummy Node:** Works but requires special handling of head.  
- **With Dummy Node:** Cleaner and preferred approach in interviews and production code.  

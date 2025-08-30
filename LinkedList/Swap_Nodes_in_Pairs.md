
# Swap Nodes in Pairs (Linked List)

---

## 📌 Problem Statement

Given a **linked list**, swap every two adjacent nodes and return its head.  
You must solve the problem **without modifying the node values** (i.e., only node links may be changed).

---

### Example

**Input:**  
`1 -> 2 -> 3 -> 4`

**Output:**  
`2 -> 1 -> 4 -> 3`

---

## 🟠 Iterative Approach

### Idea:
- Use a **dummy node** at the start to simplify edge cases.
- Iterate through the list in pairs:
  1. Take two nodes (`first` and `second`).
  2. Swap their links.
  3. Move to the next pair.

---

### Step-by-step:
1. Create a `dummy` node pointing to `head`.
2. Initialize a pointer `prev` = `dummy`.
3. While there are at least two nodes to swap:
   - `first = prev.next`
   - `second = first.next`
   - Swap:  
     `prev.next = second`  
     `first.next = second.next`  
     `second.next = first`
   - Move `prev` forward to `first`.
4. Return `dummy.next`.

---

### JavaScript Code (Iterative)

```js
var swapPairs = function(head) {
    let dummy = new ListNode(0, head);
    let prev = dummy;

    while (prev.next && prev.next.next) {
        let first = prev.next;
        let second = first.next;

        // Swap
        prev.next = second;
        first.next = second.next;
        second.next = first;

        // Move prev
        prev = first;
    }

    return dummy.next;
};
```

---

### Complexity (Iterative)
- **Time Complexity:** `O(N)` (visit each node once)  
- **Space Complexity:** `O(1)` (constant extra space)

---

## 🟢 Recursive Approach

### Idea:
- Base case: if the list has 0 or 1 node, return head.
- Otherwise:
  - Let `first = head`
  - Let `second = head.next`
  - Swap them: `first.next = swapPairs(second.next)`
  - Return `second` as the new head of this swapped pair.

---

### Step-by-step:
1. If head is `null` or `head.next` is `null`, return head.
2. Store `first = head`, `second = head.next`.
3. Recursively swap the rest:  
   `first.next = swapPairs(second.next)`.
4. Link `second.next = first`.
5. Return `second`.

---

### JavaScript Code (Recursive)

```js
var swapPairs = function(head) {
    if (!head || !head.next) return head;

    let first = head;
    let second = head.next;

    first.next = swapPairs(second.next);
    second.next = first;

    return second;
};
```

---

### Complexity (Recursive)
- **Time Complexity:** `O(N)`  
- **Space Complexity:** `O(N)` (recursion stack)

---

## 🔎 Dry Run Example (Iterative)

Input: `1 -> 2 -> 3 -> 4`

1. `prev = dummy` → `first = 1`, `second = 2`  
   Swap → `dummy -> 2 -> 1 -> 3 -> 4`

2. Move `prev` to `1`.  
   `first = 3`, `second = 4`  
   Swap → `dummy -> 2 -> 1 -> 4 -> 3`

Final Answer: `2 -> 1 -> 4 -> 3`

---
# Swap Nodes in Pairs (Recursive Approach)

## Problem Statement
Given the head of a linked list, swap every two adjacent nodes and return its head.  
You must solve the problem without modifying the values in the list's nodes (i.e., only nodes themselves may be changed).

---

## Recursive Approach Code

```javascript
var swapPairs = function(head) {
    if (!head || !head.next) return head;

    let l = head;
    let r = head.next;

    l.next = swapPairs(r.next);
    r.next = l;
    return r;
};
Step-by-Step Explanation

Base case:

If the list is empty (head == null) or has only one node (head.next == null), return head (no swap possible).

Recursive case:

Take two nodes at a time:

l = head (first node of pair)

r = head.next (second node of pair)

Swap:

Recursively call on the rest of the list (swapPairs(r.next)) and assign it to l.next.

Point r.next to l (actual swap).

Return r (new head of the swapped pair).

Dry Run Example
Input Linked List:
1 -> 2 -> 3 -> 4 -> null

Step 1:

head = 1

l = 1, r = 2

Call l.next = swapPairs(3)

Step 2 (recursive call with head = 3):

head = 3

l = 3, r = 4

Call l.next = swapPairs(null)

Step 3 (recursive call with head = null):

head = null

Base case triggered → return null

Step 2 continues:

l = 3, r = 4

l.next = null (from base case result)

r.next = l → 4 -> 3

Return r = 4

Result from step 2:

4 -> 3 -> null

Step 1 continues:

l = 1, r = 2

l.next = (result of step 2) = 4 -> 3 -> null

r.next = l → 2 -> 1

Return r = 2

Final Result:

2 -> 1 -> 4 -> 3 -> null

Final Answer

The linked list after swapping pairs:

2 -> 1 -> 4 -> 3

Time & Space Complexity

Time Complexity: O(n) (we visit each node once).

Space Complexity: O(n) (recursive stack for n/2 swaps).
## ✅ Summary
- **Iterative Approach:** Uses dummy node, swaps pairs in a loop. `O(N)` time, `O(1)` space.  
- **Recursive Approach:** Elegant recursive swapping. `O(N)` time, `O(N)` space.  
- Both methods are valid; iterative is more space-efficient.

---

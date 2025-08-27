# Rotate Linked List (Two-Pointer Approach)

## Problem
Given the head of a linked list, rotate the list to the right by `k` places.

---

## Approach: Two-Pointer Method

### Intuition
- Instead of brute force rotations or making the list circular, we use two pointers:
  1. Count the length of the list.
  2. Move `first` pointer `k` steps ahead.
  3. Move both `first` and `second` pointers together until `first` reaches the last node.
  4. At this point, `second` is just before the new head. Rewire the links to rotate.

This avoids unnecessary rotations and works in one traversal after finding length.

---

## Code (JavaScript)
```javascript
var rotateRight = function(head, k) {
    if (!head || !head.next) return head;

    // Step 1: find length
    let length = 0;
    let curr = head;
    while (curr) {
        length++;
        curr = curr.next;
    }

    // Step 2: adjust k
    k = k % length;
    if (k === 0) return head;

    // Step 3: move first pointer k steps ahead
    let first = head, second = head;
    for (let i = 0; i < k; i++) {
        first = first.next;
    }

    // Step 4: move both until first is at tail
    while (first.next) {
        first = first.next;
        second = second.next;
    }

    // Step 5: rewire connections
    let newHead = second.next;
    first.next = head;
    second.next = null;

    return newHead;
};
```

---

## Dry Run Example

Input: `head = [1,2,3,4,5], k = 2`

1. **Find length** → length = 5.  
   Adjust `k = 2 % 5 = 2`.  

2. **Move first ahead by 2**:  
   - first = 3, second = 1  

3. **Move both until first is at tail**:  
   - Step 1 → first = 4, second = 2  
   - Step 2 → first = 5, second = 3  

4. **Rewire**:  
   - newHead = second.next = 4  
   - first.next = head → 5 → 1  
   - second.next = null → 3 → null  

Result: **[4,5,1,2,3]**

---

## Complexity Analysis

- **Time Complexity**: O(n)  
  - One pass to find length  
  - One pass to find new head  
- **Space Complexity**: O(1)  
  - Only pointers used

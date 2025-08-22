# 📝 Remove Duplicates from Sorted List (Approach 1)

## Problem Statement

Given the head of a **sorted singly linked list**, delete all duplicates
such that each element appears only once.\
Return the linked list sorted as well.

### Example 1:

**Input:** head = \[1,1,2\]\
**Output:** \[1,2\]

### Example 2:

**Input:** head = \[1,1,2,3,3\]\
**Output:** \[1,2,3\]

------------------------------------------------------------------------

## ✅ Approach 1: Iterative (Without Sentinel Node)

Since the list is **sorted**, all duplicates will be **adjacent**.\
We can traverse the list and compare each node with its next.\
If the current node and the next node have the same value, skip the next
node by adjusting the `next` pointer.

### Code (JavaScript)

``` javascript
var deleteDuplicates = function(head) {
    let curr = head;
    while (curr && curr.next) {
        if (curr.val === curr.next.val) {
            curr.next = curr.next.next; // Skip duplicate node
        } else {
            curr = curr.next; // Move forward
        }
    }
    return head;
};
```

------------------------------------------------------------------------

## 🔍 Dry Run

**Input:** head = \[1,1,2,3,3\]

1.  Start at first node (1). Compare with next (1). Duplicate found →
    skip.\
    → List becomes \[1,2,3,3\]

2.  Now at node (1). Compare with next (2). Not duplicate → move to
    next.

3.  At node (2). Compare with next (3). Not duplicate → move to next.

4.  At node (3). Compare with next (3). Duplicate found → skip.\
    → List becomes \[1,2,3\]

5.  Reached end of list. Done.

**Final Output:** \[1,2,3\]

------------------------------------------------------------------------

## ⏱️ Time and Space Complexity

-   **Time Complexity:** `O(n)` → Each node visited once.\
-   **Space Complexity:** `O(1)` → No extra space used.

------------------------------------------------------------------------

## ⚡ Edge Cases

1.  **Empty List (head = null):** return null.\
2.  **Single Node (head = \[5\]):** return \[5\].\
3.  **All Same Values (head = \[2,2,2,2\]):** return \[2\].

------------------------------------------------------------------------

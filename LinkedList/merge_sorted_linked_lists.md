# Merge Two Sorted Linked Lists - JavaScript Study Notes

## 1. Problem Statement

**Given** the heads of two sorted linked lists `list1` and `list2`, **merge** the two lists into a single sorted linked list. The merged list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.

### Example 1
```text
Input: list1 = 1 -> 2 -> 4, list2 = 1 -> 3 -> 4
Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4
```

### Example 2
```text
Input: list1 = [], list2 = []
Output: []
```

### Example 3
```text
Input: list1 = [], list2 = 0 -> 3 -> 5
Output: 0 -> 3 -> 5
```

---

## 2. Approach Using a **Dummy Node**

### Why Use a Dummy Node?
- A **dummy node** acts as a placeholder that simplifies list manipulation.
- It helps **avoid checking if the head is null** and eliminates extra condition handling.
- After the merge, the real merged list starts from `dummy.next`.

### Step-by-Step Approach
1. Create a **dummy node** and a pointer `current` pointing to it.
2. Compare the current nodes of `list1` and `list2`.
3. Append the **smaller node** to `current.next`.
4. Move the pointer of the list from which you took the node forward.
5. Move `current` forward.
6. Repeat until one of the lists becomes null.
7. Append the remaining nodes of the non-null list to `current.next`.
8. Return `dummy.next` as the head of the merged list.

---

## 3. JavaScript Implementation

```javascript
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(-1);
  let current = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }

  // Append remaining nodes
  if (list1 !== null) current.next = list1;
  if (list2 !== null) current.next = list2;

  return dummy.next;
}
```

---

## 4. Dry Run Example

**Input:**

```
list1: 1 -> 2 -> 4
list2: 1 -> 3 -> 4
```

### Step-by-Step Visualization

1. Initialize dummy node:
```
dummy(-1) -> null
current -> dummy
```

2. Compare `list1.val=1` and `list2.val=1`:
```
1 <= 1 → pick list1
dummy(-1) -> 1
current -> 1
list1 -> 2 -> 4
```

3. Compare `list1.val=2` and `list2.val=1`:
```
1 < 2 → pick list2
dummy(-1) -> 1 -> 1
current -> 1
list2 -> 3 -> 4
```

4. Compare `list1.val=2` and `list2.val=3`:
```
2 < 3 → pick list1
dummy(-1) -> 1 -> 1 -> 2
current -> 2
list1 -> 4
```

5. Compare `list1.val=4` and `list2.val=3`:
```
3 < 4 → pick list2
dummy(-1) -> 1 -> 1 -> 2 -> 3
current -> 3
list2 -> 4
```

6. Compare `list1.val=4` and `list2.val=4`:
```
4 <= 4 → pick list1
dummy(-1) -> 1 -> 1 -> 2 -> 3 -> 4
current -> 4
list1 -> null
```

7. `list1` is null, append remaining `list2`:
```
dummy(-1) -> 1 -> 1 -> 2 -> 3 -> 4 -> 4
```

**Output:**
```
1 -> 1 -> 2 -> 3 -> 4 -> 4
```

---

## 5. Complexity Analysis

| Complexity Type | Analysis |
|-----------------|----------|
| **Time Complexity** | O(n + m) → We traverse each list once, where n and m are the lengths of the lists. |
| **Space Complexity** | O(1) → No extra space is used (only pointers), except for input lists. |

---

## 6. Key Notes and Tips

- Using a **dummy node** simplifies handling the head of the merged list.
- Always move the `current` pointer after attaching a node.
- Don’t forget to **append the remaining nodes** after the loop.
- Works for empty lists as well (`list1` or `list2` null).

---

## 7. Summary

- Merge sorted lists by **comparing nodes one by one**.
- Use a **dummy node** to simplify list handling.
- Update pointers carefully and append remaining nodes.
- Efficient approach: **O(n + m)** time and **O(1)** space.
- Dry-running with small examples helps visualize connections and avoid mistakes.


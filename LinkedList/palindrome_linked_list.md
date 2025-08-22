# Palindrome Linked List in JavaScript

This document explains how to check if a **Linked List** is a palindrome using two approaches:

1. **Convert to Array Approach**
2. **Two-Pointer Approach (Find Middle → Reverse Second Half → Compare)**

---

## 📌 What is a Palindrome?
A palindrome is a sequence that reads the same forward and backward.  
Examples: `121`, `madam`, `radar`.

For linked list:  
```
1 → 2 → 2 → 1   ✅ Palindrome
1 → 2 → 3       ❌ Not Palindrome
```

---

## 1. Approach 1: Convert Linked List to Array

### 💡 Idea
- Traverse the linked list and store values in an array.  
- Check if the array is the same forward and backward.

### Code
```javascript
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function isPalindromeArray(head) {
  let arr = [];
  let current = head;

  // Step 1: Store values in array
  while (current) {
    arr.push(current.val);
    current = current.next;
  }

  // Step 2: Check palindrome using two pointers
  let left = 0, right = arr.length - 1;
  while (left < right) {
    if (arr[left] !== arr[right]) return false;
    left++;
    right--;
  }

  return true;
}

// Example usage
let head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(2);
head.next.next.next = new ListNode(1);

console.log(isPalindromeArray(head)); // true
```

### ✅ Time & Space Complexity
- **Time:** O(n) (one traversal + comparison)  
- **Space:** O(n) (extra array)

---

## 2. Approach 2: Find Middle → Reverse Second Half → Compare

### 💡 Idea
- Use **slow and fast pointers** to find the middle.  
- Reverse the second half of the linked list.  
- Compare first half with reversed second half.  
- (Optional) Restore the list.

### Code
```javascript
function isPalindromeLinkedList(head) {
  if (!head || !head.next) return true;

  // Step 1: Find middle using slow/fast pointers
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse second half
  let prev = null, curr = slow;
  while (curr) {
    let nextTemp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextTemp;
  }

  // Step 3: Compare first half and reversed second half
  let left = head, right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }

  return true;
}

// Example usage
console.log(isPalindromeLinkedList(head)); // true
```

### ✅ Time & Space Complexity
- **Time:** O(n) (one pass to find middle, one pass to reverse, one pass to compare)  
- **Space:** O(1) (in-place reversal, no extra array)

---

## 🔎 Dry Run of Approach 2

For list:
```
1 → 2 → 2 → 1
```

1. **Find middle:**  
   - `slow` at `2`, `fast` at end.  
   - Middle is second `2`.

2. **Reverse second half:**  
   - Before: `2 → 1`  
   - After:  `1 → 2`

3. **Compare:**  
   - Compare `1 ↔ 1` ✅  
   - Compare `2 ↔ 2` ✅  

All matched → Palindrome ✅

---

## 📌 Final Notes
- **Array Approach:** Easier to implement but uses O(n) space.  
- **Two-Pointer Approach:** Optimized with O(1) space, commonly asked in interviews.  

```js
A) Odd length example: 1 → 2 → 3 → 2 → 1
1) Find the middle (slow/fast)

Start: slow=1, fast=1

Iter	slow moves to	fast moves to	Condition to continue
1	2	3	fast & fast.next exist
2	3	1	(from 3 → 2 → 1)
3	—	—	stop: fast.next is null

➡️ Middle found: slow = 3 (the true middle for odd length).

List (with marker):

1 → 2 → [3] → 2 → 1
          ^
         slow

2) Reverse the second half (start at slow)

We reverse 3 → 2 → 1 in place.

Initial: prev=null, curr=3

Iter 1

nextNode = 2

curr.next = prev ⇒ 3 → null

move prev = 3, curr = 2

State:

(first half)   1 → 2   (cut)
(reversed so far) 3 → null
(to process)       2 → 1 → null


Iter 2

nextNode = 1

curr.next = prev ⇒ 2 → 3 → null

move prev = 2, curr = 1

State:

reversed so far: 2 → 3 → null
to process:      1 → null


Iter 3

nextNode = null

curr.next = prev ⇒ 1 → 2 → 3 → null

move prev = 1, curr = null (stop)

Final after reverse:

head of 2nd half (prev): 1 → 2 → 3 → null
first half still:        1 → 2 → 3 → 2 → 1   (links before slow are unchanged)


Note: we didn’t “cut” links physically before reversing; the reverse operation flips pointers starting at slow, which works fine.

3) Compare first half vs reversed second half

Set left = head (1), right = prev (1).

Step	left.val	right.val	equal?	Next left	Next right
1	1	1	✅	2	2
2	2	2	✅	3	3
3	3	3	✅	2	null (stop)

We stop when right becomes null. All compared pairs matched ⇒ palindrome = true.

B) Even length example: 1 → 2 → 2 → 1
1) Find the middle

Start: slow=1, fast=1

Iter	slow moves to	fast moves to	Continue?
1	2 (1st 2)	2 (3rd node)	yes
2	2 (2nd 2)	null	stop (fast null)

➡️ For even length, slow ends at the start of the second half (the right middle): slow = (second 2).

List (with marker):

1 → 2 → [2] → 1
        ^
       slow

2) Reverse the second half (start at slow)

Reverse 2 → 1.

Initial: prev=null, curr=2 (right-middle)

Iter 1

nextNode = 1

curr.next = prev ⇒ 2 → null

prev = 2, curr = 1

Iter 2

nextNode = null

curr.next = prev ⇒ 1 → 2 → null

prev = 1, curr = null (stop)

Reversed second half head: prev = 1 → 2 → null

3) Compare halves

Set left = head (1), right = prev (1).

Step	left.val	right.val	equal?	Next left	Next right
1	1	1	✅	2	2
2	2	2	✅	2	null (stop)

All matched ⇒ palindrome = true.
(We only compare as long as right exists; for even length, that’s exactly n/2 comparisons.)

(Optional) Not-palindrome peek: 1 → 2 → 3

Find middle: slow lands on 2

Reverse from 2: becomes 3 → 2

Compare:

left=1 vs right=3 ⇒ mismatch ⇒ return false immediately.

Why this works

Slow/Fast splits the list in O(n) without extra memory.

Reversing in place gives us the second half in reverse order so a straight left-to-right comparison checks symmetry.

We compare only half the nodes.

Time O(n), space O(1).

Tip: If you need to restore the original list, just reverse the second half again after comparison (same loop as the reverse step).
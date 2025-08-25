# Add Two Numbers (Linked List)

## Problem Recap
We are given two non-empty linked lists representing two non-negative integers.  
- Digits are stored in **reverse order**.  
- Each node contains a single digit.  
- Return the sum as a linked list (also in reverse order).  

**Example:**  
```
Input:  (2 → 4 → 3) + (5 → 6 → 4)
Output: 7 → 0 → 8
Explanation: 342 + 465 = 807
```

---

## Approach 1: Brute Force (Convert to Numbers)

### Idea
1. Traverse both linked lists to extract digits.  
2. Convert them into full numbers.  
3. Add the numbers.  
4. Convert the sum back into a reversed linked list.  

### Code (JS)
```js
var addTwoNumbersBruteForce = function(l1, l2) {
    // Helper to convert linked list to number
    function toNumber(list) {
        let num = 0, multiplier = 1;
        while (list) {
            num += list.val * multiplier;
            multiplier *= 10;
            list = list.next;
        }
        return num;
    }

    let num1 = toNumber(l1);
    let num2 = toNumber(l2);
    let sum = num1 + num2;

    // Convert back to linked list
    let dummy = new ListNode(0);
    let curr = dummy;
    if (sum === 0) return dummy;

    while (sum > 0) {
        curr.next = new ListNode(sum % 10);
        sum = Math.floor(sum / 10);
        curr = curr.next;
    }

    return dummy.next;
};
```

### Limitations
- Doesn’t work if numbers are extremely large (overflow in JS).  
- Not memory efficient.  

**Time Complexity**: O(m + n) (to traverse lists and reconstruct)  
**Space Complexity**: O(max(m, n))  

---

## Approach 2: Optimal (Digit-by-Digit with Carry)

### Idea
1. Use a **dummy node** to simplify handling of the head.  
2. Traverse both lists together.  
3. Add digits along with a `carry`.  
4. Create new nodes for each digit.  
5. Continue until both lists are empty and carry is 0.  

### Code (JS)
```js
var addTwoNumbers = function(l1, l2) {
    let dummy = new ListNode(0);
    let curr = dummy;
    let carry = 0;

    while (l1 || l2 || carry) {
        let sum = carry;
        if (l1) {
            sum += l1.val;
            l1 = l1.next;
        }
        if (l2) {
            sum += l2.val;
            l2 = l2.next;
        }

        carry = Math.floor(sum / 10);
        curr.next = new ListNode(sum % 10);
        curr = curr.next;
    }

    return dummy.next;
};
```

---

## Dry Run (Example: l1 = 2→4→3, l2 = 5→6→4)

| Step | l1.val | l2.val | Carry | Sum | New Node |
|------|--------|--------|-------|-----|----------|
| Init |   2    |   5    |   0   |  7  |   7      |
| Next |   4    |   6    |   0   | 10  |   0 (carry=1) |
| Next |   3    |   4    |   1   |  8  |   8      |
| End  |   —    |   —    |   0   | —   | —        |

**Result Linked List**: `7 → 0 → 8`

---

## Complexity
- **Time Complexity**: O(max(m, n))  
- **Space Complexity**: O(max(m, n)) (output list only)

---

## Why Use Dummy Node?
Without a dummy node, we would need extra checks for the first node (head).  
With a dummy node:  
- Always attach to `curr.next`.  
- At the end, just return `dummy.next`.  

This avoids edge-case headaches when initializing the result list.

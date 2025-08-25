# Odd-Even Linked List

The problem: Given the head of a singly linked list, group all odd-indexed nodes together followed by even-indexed nodes, preserving their relative order.

---

## Approach 1: Brute Force (Using Arrays)

### Idea
- Traverse the list, collect values in **two arrays**: one for odd-indexed nodes, one for even-indexed nodes.
- Concatenate arrays and rebuild the list.
- Simple but uses extra space.

### Code (JS)
```javascript
var oddEvenList = function(head) {
    if (!head || !head.next) return head;

    let oddVals = [];
    let evenVals = [];

    let curr = head;
    let index = 1;

    while (curr) {
        if (index % 2 === 1) oddVals.push(curr.val);
        else evenVals.push(curr.val);
        curr = curr.next;
        index++;
    }

    let dummy = new ListNode(0);
    let temp = dummy;
    for (let val of [...oddVals, ...evenVals]) {
        temp.next = new ListNode(val);
        temp = temp.next;
    }

    return dummy.next;
};
```

### Dry Run (Input: 1→2→3→4→5)
- oddVals = [1,3,5], evenVals = [2,4]  
- Combined = [1,3,5,2,4]  
- Output: 1→3→5→2→4

### Complexity
- Time: O(n)  
- Space: O(n)

---

## Approach 2: Your Approach (In-place with `while(odd.next && even.next)`)

### Idea
- Use two pointers: `odd` and `even`, plus `evenStart` to reconnect later.
- Rewire odd/even pointers alternately until end.
- Condition: `while(odd.next && even.next)`.

### Code (JS)
```javascript
var oddEvenList = function(head) {
    if (!head || !head.next) return head;

    let odd = head;
    let even = head.next;
    let evenStart = even;

    while (odd.next && even.next) {
        odd.next = odd.next.next;
        even.next = even.next.next;

        odd = odd.next;
        even = even.next;
    }

    odd.next = evenStart;
    return head;
};
```

### Dry Run (Input: 1→2→3→4→5)
- Init: odd=1, even=2, evenStart=2  
- Iter1: odd.next=3, even.next=4 → odd=3, even=4  
- Iter2: odd.next=5, even.next=null → odd=5, even=null  
- Attach odd.next=evenStart  
- Output: 1→3→5→2→4

### Complexity
- Time: O(n)  
- Space: O(1)

### Note
This works safely in JS because of short-circuiting, but less explicit than the classic.

---

## Approach 3: Classic In-place (with `while(even && even.next)`)

### Idea
- Similar two-pointer method, but condition is based on `even`, safer and more conventional.

### Code (JS)
```javascript
var oddEvenList = function(head) {
    if (!head || !head.next) return head;

    let odd = head;
    let even = head.next;
    let evenStart = even;

    while (even && even.next) {
        odd.next = even.next;
        odd = odd.next;

        even.next = odd.next;
        even = even.next;
    }

    odd.next = evenStart;
    return head;
};
```

### Dry Run (Input: 1→2→3→4→5)
- Init: odd=1, even=2, evenStart=2  
- Iter1: odd.next=3, odd=3, even.next=4, even=4  
- Iter2: odd.next=5, odd=5, even.next=null, even=null  
- Attach odd.next=evenStart  
- Output: 1→3→5→2→4

### Complexity
- Time: O(n)  
- Space: O(1)

---

## Summary
- **Brute Force:** easiest to reason but O(n) space.  
- **Your Approach:** correct in JS due to short-circuit, condition `while(odd.next && even.next)` is okay but less explicit.  
- **Classic Approach:** safest and most common, `while(even && even.next)` ensures clarity and avoids possible null errors.

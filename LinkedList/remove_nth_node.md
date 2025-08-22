# 📝 Remove Nth Node From End of Singly Linked List

We will cover **4 approaches**: 1. **Two-Pass with Sentinel Node** 2.
**Two-Pass without Sentinel Node** 3. **One-Pass with Sentinel Node** 4.
**One-Pass without Sentinel Node**

------------------------------------------------------------------------

## 🔹 1. Two-Pass with Sentinel Node

``` javascript
var removeNthFromEnd = function(head, n) {
    let sentinel = new ListNode(0, head);
    let length = 0;
    let curr = head;

    // First pass: count length
    while (curr) {
        length++;
        curr = curr.next;
    }

    // Find (length - n)-th node
    curr = sentinel;
    for (let i = 0; i < length - n; i++) {
        curr = curr.next;
    }

    // Remove nth node
    curr.next = curr.next.next;

    return sentinel.next;
};
```

✅ **Dry Run Example**\
Input: `head = [1,2,3,4,5], n = 2`\
Length = 5 → (5-2)=3 → remove 4th node (value `4`)\
Output: `[1,2,3,5]`

⚡ **Edge Cases** - Removing head (`n=length`) → sentinel handles it.\
- Empty list → returns `null`.

⏱ **Time Complexity**: O(L) (L = length of list)\
💾 **Space Complexity**: O(1)

------------------------------------------------------------------------

## 🔹 2. Two-Pass without Sentinel Node

``` javascript
var removeNthFromEnd = function(head, n) {
    let length = 0;
    let curr = head;

    // Count length
    while (curr) {
        length++;
        curr = curr.next;
    }

    // If removing head
    if (n === length) return head.next;

    curr = head;
    for (let i = 0; i < length - n - 1; i++) {
        curr = curr.next;
    }

    curr.next = curr.next.next;
    return head;
};
```

✅ **Dry Run Example**\
Input: `[1,2,3,4,5], n=5`\
Length = 5 → remove head → result `[2,3,4,5]`

⚡ **Edge Cases** - Must handle head removal separately since no
sentinel.

⏱ **Time Complexity**: O(L)\
💾 **Space Complexity**: O(1)

------------------------------------------------------------------------

## 🔹 3. One-Pass with Sentinel Node (Fast & Slow Pointers)

``` javascript
var removeNthFromEnd = function(head, n) {
    let sentinel = new ListNode(0, head);
    let first = sentinel;

    // Move first pointer n steps ahead
    for (let i = 0; i < n; i++) {
        first = first.next;
    }

    let second = sentinel;

    // Move both until first reaches end
    while (first.next) {
        first = first.next;
        second = second.next;
    }

    second.next = second.next.next;
    return sentinel.next;
};
```

✅ **Dry Run Example**\
Input: `[1,2,3,4,5], n=2`\
Fast pointer moves 2 steps → points to `2`.\
Both move until fast reaches last node.\
Slow lands before node `4`.\
Delete `4`. → `[1,2,3,5]`

⚡ **Edge Cases** - Head removal handled naturally by sentinel.

⏱ **Time Complexity**: O(L)\
💾 **Space Complexity**: O(1)

------------------------------------------------------------------------

## 🔹 4. One-Pass without Sentinel Node

``` javascript
var removeNthFromEnd = function(head, n) {
    let fast = head, slow = head;

    // Move fast n steps ahead
    for (let i = 0; i < n; i++) {
        fast = fast.next;
    }

    // If fast is null, remove head
    if (!fast) return head.next;

    // Move both pointers until fast reaches last node
    while (fast.next) {
        fast = fast.next;
        slow = slow.next;
    }

    slow.next = slow.next.next;
    return head;
};
```

✅ **Dry Run Example**\
Input: `[1,2,3,4,5], n=5`\
Fast moves 5 steps → becomes null.\
Means we must remove head.\
Result: `[2,3,4,5]`

⚡ **Edge Cases** - Need special handling if removing head.

⏱ **Time Complexity**: O(L)\
💾 **Space Complexity**: O(1)

------------------------------------------------------------------------

## 🎯 Why Use a Sentinel Node?

-   Simplifies edge cases (especially when removing head).\
-   Cleaner, uniform code (no separate logic for head removal).\
-   Increases readability and reduces bugs.

**Example**:\
Without sentinel → must write special case
`if (n === length) return head.next;`\
With sentinel → just proceed normally.

------------------------------------------------------------------------

✅ **Conclusion**:\
- Use **sentinel** for cleaner code.\
- **One-pass approach** is optimal in practice.

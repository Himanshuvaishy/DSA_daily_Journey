# 🔍 Find the Middle Node in a Singly Linked List

## 🧠 Intuition Behind the Fast and Slow Pointer Approach

To find the **middle node** of a singly linked list **in one pass**, we use two pointers moving at different speeds:

- **Slow Pointer**: Moves **1 step** at a time.
- **Fast Pointer**: Moves **2 steps** at a time.

### 💡 Why This Works
As the fast pointer moves twice as fast as the slow pointer, by the time the fast pointer reaches the end of the list, the slow pointer will be at the **middle**.

### 📈 Time Complexity: `O(n)`  
Only one pass through the list is needed.

### 📦 Space Complexity: `O(1)`  
No extra space required.

---

## ✅ When to Use Fast and Slow Pointers
Use this technique when:
- You need to find the **middle of a list**.
- You want to **detect a cycle** in a linked list.
- You want to **find the length of a loop**.
- You want to **split a list in half**.

---

## 🧪 Dry Run Example – Odd Length List

### List:
```
[1] → [2] → [3] → [4] → [5]
```

### Initialization:
```
slow = head (1)
fast = head (1)
```

### Iteration Steps:

| Step | slow.val | fast.val |
|------|----------|----------|
| 1    |    2     |    3     |
| 2    |    3     |    5     |
| 3    |    -     |   null   |

### 🔚 Result:
- Loop ends when `fast` or `fast.next` becomes null.
- `slow` is pointing to `[3]` ⇒ **Middle Node**

---

## 🧪 Dry Run Example – Even Length List

### List:
```
[10] → [20] → [30] → [40]
```

### Initialization:
```
slow = head (10)
fast = head (10)
```

### Iteration Steps:

| Step | slow.val | fast.val |
|------|----------|----------|
| 1    |   20     |   30     |
| 2    |   30     |   null   |

### 🔚 Result:
- `slow` points to `[30]`
- When even nodes exist, **this returns the second middle**.

---

## ✅ JavaScript Code

```js
function findMiddleNode(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}
```

---

## 📌 Summary

- Efficient `O(n)` single-pass approach.
- Two pointers: slow moves 1 step, fast moves 2 steps.
- When fast reaches the end, slow is at the middle.
- For even-length lists, returns the **second** middle node.

---
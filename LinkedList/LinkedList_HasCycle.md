
# Detect Cycle in a Linked List

We will solve the **Linked List Cycle Detection** problem using two approaches:

---

## 🔹 Approach 1: Using a Set

### Idea:
- Keep a **Set** to track visited nodes.
- Traverse the linked list:
  - If we encounter a node that is already in the Set → Cycle exists.
  - If we reach the end (`null`) → No cycle.

### Code (JavaScript):
```js
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

function hasCycleSet(head) {
  let visited = new Set();
  let current = head;

  while (current) {
    if (visited.has(current)) {
      return true; // Cycle detected
    }
    visited.add(current);
    current = current.next;
  }
  return false; // No cycle
}
```

### Dry Run:
Example: `1 → 2 → 3 → 4 → 2 (cycle)`

- Start at node `1`, add to Set → `{1}`  
- Move to node `2`, add to Set → `{1,2}`  
- Move to node `3`, add to Set → `{1,2,3}`  
- Move to node `4`, add to Set → `{1,2,3,4}`  
- Next is node `2` which is already in Set → **Cycle Found ✅**

---

## 🔹 Approach 2: Floyd’s Cycle Detection (Tortoise & Hare Algorithm)

### Idea:
- Use **two pointers** (slow and fast).
- Move `slow` by 1 step, `fast` by 2 steps.
- If they ever meet → Cycle exists.
- If `fast` reaches `null` → No cycle.

### Code (JavaScript):
```js
function hasCycleFloyd(head) {
  if (!head || !head.next) return false;

  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;       // move 1 step
    fast = fast.next.next;  // move 2 steps

    if (slow === fast) {
      return true; // Cycle detected
    }
  }
  return false; // No cycle
}
```

### Dry Run:
Example: `1 → 2 → 3 → 4 → 2 (cycle)`

- Start: `slow = 1`, `fast = 1`  
- Step 1: `slow = 2`, `fast = 3`  
- Step 2: `slow = 3`, `fast = 2`  
- Step 3: `slow = 4`, `fast = 4` → **They meet → Cycle Found ✅**

---

## ✅ Comparison

| Approach | Time Complexity | Space Complexity | Notes |
|----------|-----------------|------------------|-------|
| Using Set | O(n) | O(n) | Easy but uses extra memory |
| Floyd’s Cycle Detection | O(n) | O(1) | Optimal, no extra memory |

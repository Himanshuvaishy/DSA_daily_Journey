# Intersection of Two Linked Lists

## 🔍 Problem Statement
Given the heads of two singly linked lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection, return `null`.

---

## 💡 Brute Force Approach

We compare every node of list A with every node of list B to find the intersection.

### ✅ Using `while` loop

```javascript
var getIntersectionNode = function(headA, headB) {
    let currentA = headA;
    while (currentA !== null) {
        let currentB = headB;
        while (currentB !== null) {
            if (currentA === currentB) {
                return currentA;
            }
            currentB = currentB.next;
        }
        currentA = currentA.next;
    }
    return null;
};
```

### ✅ Using `for` loop

```javascript
var getIntersectionNode = function(headA, headB) {
    for (let currentA = headA; currentA !== null; currentA = currentA.next) {
        for (let currentB = headB; currentB !== null; currentB = currentB.next) {
            if (currentA === currentB) {
                return currentA;
            }
        }
    }
    return null;
};
```

---

## ⚙️ Optimized Approach 1: Using a Set

We store all nodes of list A in a Set and then check if any node in list B is in the set.

```javascript
var getIntersectionNode = function(headA, headB) {
    const nodes = new Set();
    let currentA = headA;

    while (currentA !== null) {
        nodes.add(currentA);
        currentA = currentA.next;
    }

    let currentB = headB;
    while (currentB !== null) {
        if (nodes.has(currentB)) {
            return currentB;
        }
        currentB = currentB.next;
    }

    return null;
};
```

---

## ⚡ Optimized Approach 2: Two Pointer Technique

We use two pointers and switch heads when one pointer reaches the end.

```javascript
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;

    let a = headA;
    let b = headB;

    while (a !== b) {
        a = a === null ? headB : a.next;
        b = b === null ? headA : b.next;
    }

    return a;
};
```

---

## 🧠 Time & Space Complexity

| Approach        | Time Complexity | Space Complexity |
|----------------|-----------------|------------------|
| Brute Force    | O(m * n)        | O(1)             |
| Using Set      | O(m + n)        | O(m)             |
| Two Pointer    | O(m + n)        | O(1)             |

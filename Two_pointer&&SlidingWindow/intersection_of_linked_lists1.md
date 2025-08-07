
# Intersection of Two Linked Lists

## Problem Statement
Given the heads of two singly linked lists `headA` and `headB`, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return `null`.

---

## 🔴 Brute Force Approach (Nested Loop)
Time Complexity: O(m * n)  
Space Complexity: O(1)

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

---

## 🟡 Optimized Using Set
Time Complexity: O(m + n)  
Space Complexity: O(m)

```javascript
var getIntersectionNode = function(headA, headB) {
    let nodesInA = new Set();
    
    while (headA !== null) {
        nodesInA.add(headA);
        headA = headA.next;
    }
    
    while (headB !== null) {
        if (nodesInA.has(headB)) {
            return headB;
        }
        headB = headB.next;
    }
    
    return null;
};
```

---

## 🟢 Optimized Using Two Pointers (Short)
Time Complexity: O(m + n)  
Space Complexity: O(1)

```javascript
var getIntersectionNode = function(headA, headB) {
    if (!headA || !headB) return null;

    let pA = headA;
    let pB = headB;

    while (pA !== pB) {
        pA = pA === null ? headB : pA.next;
        pB = pB === null ? headA : pB.next;
    }

    return pA; // Either the intersection node or null
};
```
### 🧠 No Infinite Loop Explanation – `getIntersectionNode`

#### Given Example (No Intersection):
- `listA = [2, 6, 4]`
- `listB = [1, 5]`

#### 🔁 Code:
```javascript
var getIntersectionNode = function(headA, headB) {
    let pA = headA;
    let pB = headB;

    while (pA !== pB) {
        pA = (pA === null) ? headB : pA.next;
        pB = (pB === null) ? headA : pB.next;
    }

    return pB;
};
```

#### 🔍 Dry Run:

| Step | pA value | pB value |
|------|----------|----------|
| 1    | 2        | 1        |
| 2    | 6        | 5        |
| 3    | 4        | null     |
| 4    | null     | 2        |
| 5    | 1        | 6        |
| 6    | 5        | 4        |
| 7    | null     | null     |

➡️ Now both pointers are `null`, so the condition `pA !== pB` becomes false and the loop ends.

#### ✅ Why It Doesn't Go Into an Infinite Loop:
- Both pointers traverse the **same total number of nodes (lengthA + lengthB)**.
- If there is **no intersection**, they will both reach `null` at the same time and the loop stops.
- If there **is an intersection**, they will meet at the intersecting node before reaching `null`.

#### 🔐 Guarantee:
- Total steps are at most `lengthA + lengthB`.
- Code ensures the loop always terminates — no chance of an infinite loop.


---

## 🟢 Optimized Using Two Pointers (Length-based Long Form)
Time Complexity: O(m + n)  
Space Complexity: O(1)

```javascript
-------write code in different way----
var getIntersectionNode = function(headA, headB) {
    let n = 0, m = 0;

    // Find length of list A
    let pA = headA;
    while (pA) {
        ++n;
        pA = pA.next;
    }

    // Find length of list B
    let pB = headB;
    while (pB) {
        ++m;
        pB = pB.next;
    }

    // Get absolute difference
    let diff = Math.abs(n - m);

    // Ensure headA is the smaller list
    if (n > m) {
        let temp = headA;
        headA = headB;
        headB = temp;
    }

    // Move the pointer of the longer list ahead by `diff`
    for (let i = 0; i < diff; i++) {
        headB = headB.next;
    }

    // Now both are equidistant from the intersection point
    pA = headA;
    pB = headB;
    while (pA && pB) {
        if (pA === pB) return pA;
        pA = pA.next;
        pB = pB.next;
    }

    return null; // No intersection
};
// ----
var getIntersectionNode = function(headA, headB) {
    function getLength(head) {
        let length = 0;
        while (head !== null) {
            length++;
            head = head.next;
        }
        return length;
    }

    let lenA = getLength(headA);
    let lenB = getLength(headB);

    while (lenA > lenB) {
        headA = headA.next;
        lenA--;
    }

    while (lenB > lenA) {
        headB = headB.next;
        lenB--;
    }

    while (headA !== null && headB !== null) {
        if (headA === headB) {
            return headA;
        }
        headA = headA.next;
        headB = headB.next;
    }

    return null;
};
```

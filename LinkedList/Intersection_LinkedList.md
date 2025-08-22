# 📝 Intersection of Two Linked Lists

We will learn two approaches to find the intersection node of two linked
lists.

------------------------------------------------------------------------

## Approach 1: Brute Force

### Idea:

-   For each node in list A, traverse list B completely and check if any
    node matches (same reference, not just value).
-   Time Complexity: O(m \* n), where `m` and `n` are the lengths of the
    two lists.
-   Space Complexity: O(1).

### Code (JavaScript):

``` javascript
function getIntersectionNodeBruteForce(headA, headB) {
    let currentA = headA;
    while (currentA !== null) {
        let currentB = headB;
        while (currentB !== null) {
            if (currentA === currentB) {
                return currentA; // Found intersection
            }
            currentB = currentB.next;
        }
        currentA = currentA.next;
    }
    return null; // No intersection
}
```

### Dry Run:

Suppose: - List A: 1 → 9 → 1 → 2 → 4 - List B: 3 → 2 → 4\
(Here, node `2` is the intersection)

Steps: 1. Start with node `1` of list A, compare with all nodes in list
B → no match. 2. Move to node `9`, compare with all nodes in list B → no
match. 3. Move to node `1`, compare with all nodes in list B → no match.
4. Move to node `2`, compare with all nodes in list B → found a match
with node `2` in list B. ✅ Return intersection node `2`.

------------------------------------------------------------------------

## Approach 2: Using Set

### Idea:

-   Traverse list A and store all its nodes in a set (based on
    reference).
-   Traverse list B, and check if any node already exists in the set.
-   First such node is the intersection.
-   Time Complexity: O(m + n).
-   Space Complexity: O(m).

### Code (JavaScript):

``` javascript
function getIntersectionNodeSet(headA, headB) {
    let visited = new Set();
    let currentA = headA;
    
    while (currentA !== null) {
        visited.add(currentA);
        currentA = currentA.next;
    }
    
    let currentB = headB;
    while (currentB !== null) {
        if (visited.has(currentB)) {
            return currentB; // Found intersection
        }
        currentB = currentB.next;
    }
    return null; // No intersection
}
```

### Dry Run:

Suppose: - List A: 4 → 1 → 8 → 4 → 5 - List B: 5 → 6 → 1 → 8 → 4 → 5\
(Here, node `8` is the intersection)

Steps: 1. Traverse list A, add all nodes to set → {4, 1, 8, 4, 5}. 2.
Traverse list B: - Node `5` not in set → continue. - Node `6` not in set
→ continue. - Node `1` not in set → continue. - Node `8` found in set →
✅ return node `8`.

------------------------------------------------------------------------

## Summary

-   **Brute Force:** Simple, but O(m \* n) time.
-   **Set Approach:** Faster O(m + n), but uses extra space.

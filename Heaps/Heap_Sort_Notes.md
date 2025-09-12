# 📘 Heap Sort Notes

## 📌 What is Heap Sort?

Heap Sort is a **comparison-based sorting algorithm** that uses the
**binary heap data structure**.\
It is similar to Selection Sort, but instead of finding the maximum
element linearly, it leverages a **Max Heap** (or Min Heap for
descending order).

------------------------------------------------------------------------

## ✅ Why & Where Heap Sort is Used?

-   **Efficient:** Time complexity is **O(n log n)** in all cases (best,
    average, worst).
-   **In-place sorting:** Requires **O(1) auxiliary space** when
    implemented without extra array.
-   **Deterministic:** Unlike Quick Sort, it does not degrade to O(n²).
-   **Useful in:**
    -   Scheduling problems (priority queues).\
    -   Systems where **worst-case performance is critical** (like
        embedded systems, OS task scheduling).\
    -   When **memory is limited** and O(1) space is needed.

⚠️ However, Heap Sort is **not stable** (equal elements may not maintain
their order). For stability, Merge Sort is preferred.

------------------------------------------------------------------------

## 🛠️ Heap Sort Algorithm (Step by Step)

1.  **Build Max Heap** from the unsorted array.\
2.  The **largest element is at the root (index 0)**.\
3.  Swap it with the last element.\
4.  Reduce the heap size by 1.\
5.  Apply **heapifyDown** to restore heap property.\
6.  Repeat until the array is sorted.

------------------------------------------------------------------------

## 📊 Example 1 (Simple)

Unsorted Array:\
`[10, 5, 3, 4, 1]`

Steps: 1. Build Max Heap → `[10, 5, 3, 4, 1]` 2. Swap root with last
element → `[1, 5, 3, 4, 10]` 3. Heapify → `[5, 4, 3, 1, 10]` 4. Continue
until fully sorted → `[1, 3, 4, 5, 10]`

Final Sorted Array:\
`[1, 3, 4, 5, 10]`

------------------------------------------------------------------------

## 📊 Example 2 (Detailed)

Unsorted Array:\
`[3, 8, 2, 10, 5, 6]`

1.  Build Max Heap → `[10, 8, 6, 3, 5, 2]`
2.  Swap max with last → `[2, 8, 6, 3, 5, 10]`
3.  Heapify → `[8, 5, 6, 3, 2, 10]`
4.  Repeat extraction → `[2, 3, 5, 6, 8, 10]`

Final Sorted Array:\
`[2, 3, 5, 6, 8, 10]`

------------------------------------------------------------------------

## 📟 JavaScript Implementation

``` javascript
let arr = [10, 4, 5, 1, 3];

function heapSort(arr) {
    let n = arr.length;

    // Build Max Heap
    for (let i = n - 1; i >= 0; i--) {
        heapifyDown(arr, i, n);
    }

    // Extract elements one by one
    for (let i = n - 1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapifyDown(arr, 0, i);
    }
    return arr;
}

function heapifyDown(arr, i, n) {
    let largest = i;
    let left = (2 * i) + 1;
    let right = (2 * i) + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest != i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapifyDown(arr, largest, n);
    }
}

// Run
const sortedArray = heapSort(arr);
console.log(sortedArray); // [1, 3, 4, 5, 10]
```

------------------------------------------------------------------------

## 📝 Dry Run (Example: arr = \[10, 4, 5, 1, 3\])

### Step 1: Build Max Heap

-   i = 4 → no change → `[10, 4, 5, 1, 3]`
-   i = 3 → no change → `[10, 4, 5, 1, 3]`
-   i = 2 → no change → `[10, 4, 5, 1, 3]`
-   i = 1 → compare children → swap → `[10, 3, 5, 1, 4]`
-   i = 0 → compare children → swap → `[5, 3, 10, 1, 4]`

Max Heap Built: `[5, 3, 10, 1, 4]`

### Step 2: Extract Elements

-   Swap root (5) with last (4) → `[4, 3, 10, 1, 5]` → heapify →
    `[10, 3, 4, 1, 5]`
-   Swap root (10) with arr\[3\] (1) → `[1, 3, 4, 10, 5]` → heapify →
    `[4, 3, 1, 10, 5]`
-   Swap root (4) with arr\[2\] (1) → `[1, 3, 4, 10, 5]` → heapify →
    `[3, 1, 4, 10, 5]`
-   Swap root (3) with arr\[1\] (1) → `[1, 3, 4, 10, 5]`

Final Sorted Array: `[1, 3, 4, 5, 10]`

------------------------------------------------------------------------

## ⏱️ Complexity Analysis

-   **Time Complexity:** O(n log n)\
-   **Space Complexity:** O(1)\
-   **Stable?:** ❌ Not stable

------------------------------------------------------------------------

## ✅ Key Takeaways

-   Heap Sort is **reliable and consistent** with O(n log n)
    complexity.\
-   Preferred when **O(1) space** is required.\
-   Not stable → if stability is needed, use Merge Sort.


# Time Complexity Comparison with Other Sorts

| Algorithm     | Best Case   | Average Case | Worst Case   | Stable? | Space Complexity |
|---------------|------------|--------------|--------------|---------|------------------|
| **Bubble Sort**   | O(n)        | O(n²)        | O(n²)        | Yes     | O(1)             |
| **Insertion Sort**| O(n)        | O(n²)        | O(n²)        | Yes     | O(1)             |
| **Merge Sort**    | O(n log n)  | O(n log n)   | O(n log n)   | Yes     | O(n)             |
| **Heap Sort**     | O(n log n)  | O(n log n)   | O(n log n)   | **No**  | O(1)             |
| **Quick Sort**    | O(n log n)  | O(n log n)   | O(n²)        | **No**  | O(log n)         |

---

## 🔑 Notes

### Stable Sorting Algorithm
A sorting algorithm is **stable** if it preserves the relative order of records with equal keys.  
For example, if two people both have `age = 18`, a **stable algorithm** ensures they remain in the same order in the sorted list.

Example:

```js
[
  {name: "Rahul", age: 20},
  {name: "Akshay", age: 18},
  {name: "Simran", age: 18},
  {name: "Sachin", age: 30}
]
Stable Sort (e.g., Merge Sort, Insertion Sort):
Sorted by age →
[ {Akshay, 18}, {Simran, 18}, {Rahul, 20}, {Sachin, 30} ]
→ Akshay comes before Simran (same as input order).

Unstable Sort (e.g., Heap Sort, Quick Sort):
Sorted by age →
[ {Simran, 18}, {Akshay, 18}, {Rahul, 20}, {Sachin, 30} ]
→ Relative order of Akshay & Simran changed.

📝 Why Heap Sort is Unstable?
Heap Sort swaps elements during heapify operations in a way that can move equal elements out of their original order.
This is why algorithms like Merge Sort are preferred when stability is required (e.g., sorting records by multiple fields).
---------------------------------------------------------------------------------------------------
# Heap Sort – Time and Space Complexity

## Space Complexity
- Heap Sort can be done **in-place**, meaning it requires only a constant amount of extra memory.
- **Space Complexity = O(1)**

---

## Time Complexity
- Each `heapifyDown` operation takes **O(log n)** time.
- Total number of nodes in the heap = `n`
- Out of these, half (`n/2`) are **leaf nodes**, and we don’t need to perform any heapify on them.

### Building the Max Heap
- We perform `heapifyDown` on roughly `n/2` internal nodes.
- Cost of heapify decreases as we go down the tree.
- The **overall complexity for building a heap = O(n)** (not O(n log n)).

### Sorting
- For each element extracted from the heap, we perform `heapifyDown`.
- There are `n` extractions, and each extraction takes **O(log n)**.
- Sorting step = **O(n log n)**.

### Total
- **Time Complexity = O(n) + O(n log n) ≈ O(n log n)**

---

## Time Comparison with Other Sorts
- **Heap Sort:** O(n log n), in-place, but **not stable**.
- **Merge Sort:** O(n log n), requires O(n) extra space, but **stable**.
- **Quick Sort:** O(n log n) on average, O(n²) worst case, in-place, **not stable**.

---

## Stable Sorting Algorithm
A sorting algorithm is **stable** if it maintains the **relative order of equal elements**.

### Example
```js
[
    { name: "Rahul", age: 20 },
    { name: "Akshay", age: 18 },
    { name: "Simran", age: 18 },
    { name: "Sachin", age: 30 }
]
If we sort by age in descending order:

Output with Stable Sort
js
Copy code
[
    { name: "Sachin", age: 30 },
    { name: "Rahul", age: 20 },
    { name: "Akshay", age: 18 },
    { name: "Simran", age: 18 }
]
Here, Akshay comes before Simran because that was their order in the input.
Stable sort keeps that intact.

Sorting in JavaScript
In modern JavaScript (ECMAScript 2019+), the built-in .sort() method is stable.

js
Copy code
const arr = [
    { name: "Rahul", age: 20 },
    { name: "Akshay", age: 18 },
    { name: "Simran", age: 18 },
    { name: "Sachin", age: 30 }
];

arr.sort((a, b) => b.age - a.age);

console.log(arr);
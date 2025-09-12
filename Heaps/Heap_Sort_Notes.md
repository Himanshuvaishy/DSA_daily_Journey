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

# Kth Smallest Element in a Sorted Matrix

## Problem
Given an `n x n` matrix where each row and column is sorted in ascending order, return the `k`th smallest element in the matrix.

---

## Approach 1: Brute Force

### Idea
- Flatten the matrix into a single list.
- Sort the list.
- Return the `k`th smallest element.

### Code (Brute Force)
```js
var kthSmallest = function(matrix, k) {
    let arr = [];
    for (let row of matrix) {
        for (let num of row) {
            arr.push(num);
        }
    }
    arr.sort((a, b) => a - b);
    return arr[k - 1];
};
Time Complexity
Flatten matrix → O(n^2)

Sorting → O(n^2 log(n^2)) = O(n^2 log n)

Overall: O(n^2 log n)

Space Complexity
O(n^2) for storing all elements.
-----------------------------------------------------------------------------------------------------
Approach 2: Min-Heap (Efficient)
This is similar to merging K sorted lists.

Idea
Push the first element of each row into a MinHeap.

Repeatedly extract the smallest element (k-1 times).

When extracting, push the next element in the same row into the heap (if exists).

The kth extracted element is the answer.

Code (MinHeap - LeetCode Style)
js
Copy code
var kthSmallest = function(matrix, k) {
    let n = matrix.length;

    // MinHeap with comparator on value
    let heap = new MinPriorityQueue(x => x.val);

    // Step 1: push first element of each row
    for (let i = 0; i < n; i++) {
        heap.push({ val: matrix[i][0], row: i, col: 0 });
    }

    // Step 2: extract min (k-1) times
    for (let count = 0; count < k - 1; count++) {
        let { val, row, col } = heap.pop();

        // push next element in the same row
        if (col + 1 < n) {
            heap.push({ val: matrix[row][col + 1], row: row, col: col + 1 });
        }
    }

    // Step 3: kth smallest is now at top
    return heap.pop().val;
};
Time Complexity
Heap size at most n → O(log n) per operation.

We perform k pops and up to k pushes → O(k log n).

Space Complexity
O(n) for heap storage.

Intuition: Why Heap?
Each row is sorted → treat each row like a sorted linked list.

This becomes identical to the Merge K Sorted Lists problem.

Heap ensures we always extract the smallest next candidate efficiently.
# Kth Largest Element in an Array (LeetCode - JavaScript)

## Problem Statement

Given an integer array `nums` and an integer `k`, return the `k`th
largest element in the array.

-   Example:\
    Input: `nums = [3,2,1,5,6,4], k = 2`\
    Output: `5`

------------------------------------------------------------------------

## LeetCode JavaScript Support

On **LeetCode JavaScript environment**, they provide two built-in
classes:

-   **`MinPriorityQueue`** → keeps the smallest element at the front.\
-   **`MaxPriorityQueue`** → keeps the largest element at the front.

These are not standard JavaScript classes, but **special helpers
available inside LeetCode only**.

### Available Methods

#### MinPriorityQueue / MaxPriorityQueue

-   `enqueue(value, priority)` → adds an element (optional priority,
    defaults to value).\
-   `dequeue()` → removes and returns the smallest (min-heap) or largest
    (max-heap) element.\
-   `size()` → returns the number of elements.\
-   `front()` → returns an object `{ element, priority }` representing
    the root of the heap.

------------------------------------------------------------------------

## Solution Approach (Min-Heap)

We want the `k`th largest element.\
Idea: 1. Use a **min-heap** (`MinPriorityQueue`) to keep the top `k`
largest numbers.\
2. Traverse all numbers in `nums`.\
- Insert each number into the heap.\
- If heap size \> `k`, remove the smallest element (`dequeue`).\
3. At the end, the heap contains only `k` largest numbers, and the root
(`front().element`) is the `k`th largest.

------------------------------------------------------------------------

## Code (JavaScript - LeetCode)

``` js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    let pq = new MinPriorityQueue();

    for (let num of nums) {
        pq.enqueue(num);
        if (pq.size() > k) {
            pq.dequeue(); // remove smallest to maintain size k
        }
    }

    return pq.front().element; // kth largest
};
```

------------------------------------------------------------------------

## Key Notes

-   On LeetCode, `pq.front()` returns an **object** → use `.element` to
    get the value.\
-   Using `MinPriorityQueue` ensures efficient handling of `k` largest
    elements.\
-   Time Complexity: **O(n log k)**\
-   Space Complexity: **O(k)**

------------------------------------------------------------------------

✅ This is why in LeetCode's JavaScript code you often see
`MinPriorityQueue` or `MaxPriorityQueue` instead of writing custom heap
classes.

```js 
🔹 Approach 2: Using Sorting (Simple but slower)
Idea:

Sort the array in descending order.

The element at index k-1 is the kth largest.

Time Complexity:

Sorting → O(n log n)

Space Complexity → O(1) (in-place sort)

Code (JavaScript):
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
    nums.sort((a, b) => b - a);
    return nums[k - 1];
};

// Example
console.log(findKthLargest([3,2,1,5,6,4], 2)); // Output: 5
console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // Output: 4

🔹 Summary Comparison
Approach	Time Complexity	Space Complexity	Best For
Sorting	O(n log n)	O(1)	Small/medium input size
Min Heap	O(n log k)	O(k)	Large input size, smaller k

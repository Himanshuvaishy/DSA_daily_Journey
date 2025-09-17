# Kth Largest Element in a Stream (LeetCode #703)

## Problem Statement
Design a class that maintains the **kth largest element** in a stream of integers. The class is initialized with an integer `k` and an initial array `nums`. Each time a new number is added via `add(val)`, the function should return the current `k`th largest element.

---

## LeetCode JavaScript (Built-in helpers)
LeetCode’s JavaScript environment provides `MinPriorityQueue` and `MaxPriorityQueue` classes. For this problem we typically use a **MinPriorityQueue** of fixed size `k` to keep the `k` largest elements seen so far. On LeetCode, note that:
- `pq.enqueue(value)` inserts a value (you can also pass a custom priority).
- `pq.dequeue()` removes the root (smallest for `MinPriorityQueue`).
- `pq.size()` returns the number of elements.
- `pq.front()` returns an object like `{ element, priority }`. Use `.element` to get the actual value.

---

## Approach (Recommended): Maintain a Min-Heap of size k

### Idea
- Keep a **min-heap** (priority queue) that stores at most `k` largest elements at any time.
- For each incoming number `x`:
  - Insert `x` into the min-heap.
  - If heap size becomes greater than `k`, remove the smallest element (the heap root).
- After this, the heap root is the **kth largest** element among all seen elements.

### JavaScript (LeetCode-ready) Implementation
```javascript
var KthLargest = function (k, nums) {
    this.k = k;
    this.pq = new MinPriorityQueue();

    // Build initial heap using add to keep size <= k
    for (let num of nums) {
        this.add(num);
    }
};

/** 
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
    this.pq.enqueue(val);
    if (this.pq.size() > this.k) {
        this.pq.dequeue();
    }
    // pq.front() returns { element, priority }
    return this.pq.front().element;
};
```

### Example
```
k = 3, nums = [4,5,8,2]

Actions:
- init: insert 4,5,8,2 -> heap keeps [4,5,8] (min-root = 4)
- add(3) -> heap [4,5,8], return 4
- add(5) -> heap [5,5,8], return 5
- add(10)-> heap [5,8,10], return 5
- add(9) -> heap [8,9,10], return 8
- add(4) -> heap [8,9,10], return 8
```

---

## Time & Space Complexity (In-depth)

### Using Min-Heap of size `k` (efficient approach)
- Let `n` = number of initial elements in `nums` used during construction.
- Each `add(val)` operation (and each insertion during initialization) performs:
  - `enqueue` → insert into heap (cost: `O(log h)` where `h` is current heap size)
  - possibly `dequeue` → remove root (cost: `O(log h)`)
  - But we **always** keep `h <= k`. So each insert/pop is `O(log k)` in the worst case.

**Building the initial heap** by inserting `n` elements using `add()` takes:  
- `n` insertions × `O(log k)` each = **O(n · log k)**.

**Single `add(val)` call** after initialization:  
- At most one insertion and one possible removal → **O(log k)**.

**If there are `m` additional `add()` calls** after init, that part costs **O(m · log k)**.  
So full cost (init + m adds) = **O((n + m) · log k)**.

**Space Complexity:** `O(k)` — heap stores at most `k` elements.

#### Why O(log k) per insertion?
A binary heap is a complete binary tree stored in an array. When you insert or remove the root, you perform at most one "bubble-up" or "bubble-down" operation. The tree height is `O(log h)` where `h` is number of nodes in the heap. Since `h ≤ k`, the height is `O(log k)`. Each swap moves the element one level, so the operation is `O(log k)`.

---

### Sorting-based approach (not recommended for stream)
If you did not use a heap and instead **kept all seen elements sorted**, each `add(val)` would require inserting `val` into a sorted array or re-sorting:

1. **Re-sorting entire array** after every insertion: inserting one element and calling sort takes `O(t log t)` where `t` is current total number of seen elements. Over many `m` additions, this can be **very expensive** (roughly `O(m^2 log m)` worst-case if done naively).

2. **Binary-search + insertion into array**: you can find insertion position in `O(log t)` using binary search, but inserting requires shifting elements and costs `O(t)` in the worst case. So one add becomes `O(t)` (where `t` grows), overall cost across many adds is `O(m^2)` in the worst case.

3. **Sorting once (offline)**:
   - If you only needed the answer once for a fixed final array, sorting the array of size `N` costs `O(N log N)`. That is why the static “Kth Largest in an Array” problem (no stream) is solved by sorting in `O(N log N)` time.

#### Why `O(N log N)` for sorting?
Most comparison-based sorting algorithms (like QuickSort, MergeSort, HeapSort) take `O(N log N)` time on average because they perform on the order of `N` items and each item needs to be compared across `log N` levels of a decision tree (intuition: a balanced binary decision tree of height `log N` can distinguish `2^{N}` permutations; more formal information-theoretic proofs exist showing `Ω(N log N)` lower bound for comparison sorting).

---

## When to use which approach? (Practical advice)
- **Stream / online updates (KthLargest class)** → use the **Min-Heap of size k**. Complexity: `O(log k)` per add. Best when `k` is small relative to the number of elements.
- **Single-shot query (Kth largest in a static array)** → sorting (`O(N log N)`) is simplest and often good enough.
- **If `k` is large and close to N**, sorting could be competitive / even better depending on constants. Quickselect is another option for `O(N)` average time if you want to avoid extra memory.

---

## Summary
- `KthLargest` (stream): Use a Min-Heap of size `k`. Initialization: **O(n log k)**, each `add`: **O(log k)**, space: **O(k)**.
- Sorting-based static approach: **O(N log N)** time and **O(1)** extra space (in-place). Not suitable for frequent streaming inserts.

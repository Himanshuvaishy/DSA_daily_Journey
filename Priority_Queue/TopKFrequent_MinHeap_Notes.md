# 🧑‍💻 Top K Frequent Elements (JS with Min Heap)

## 🔹 Problem Statement
Given an integer array `nums` and an integer `k`, return the `k` most frequent elements.  
You must write an algorithm that runs in **better than O(n log n)** time.

---

## 🔹 Approach 1: Hashing + Sorting

### Idea
1. Count the frequency of each element using a hash map.  
2. Sort by frequency in descending order.  
3. Return the first `k` elements.  

### Code
```js
var topKFrequent = function(nums, k) {
    let freqMap = new Map();
    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    let sorted = [...freqMap.entries()].sort((a, b) => b[1] - a[1]);
    return sorted.slice(0, k).map(entry => entry[0]);
};
```

### Complexity
- Build map → O(n)  
- Sort → O(n log n)  
- Extract k → O(k)  
✅ **Total = O(n log n)**

---

## 🔹 Approach 2: Hashing + Min Heap (Priority Queue)

### Idea
Instead of sorting the entire array of frequencies, we only maintain the **top k elements** using a **Min Heap**.  
- Insert `(value, frequency)` into heap.  
- If heap size > k, remove smallest frequency.  
- Remaining elements in heap = answer.  

This reduces complexity to **O(n log k)**.

---

## 🔹 Code with Line-by-Line Explanation

```js
var topKFrequent = function(arr, k) {
    // Step 1: Count frequencies O(n)
    let map = {};
    for (let i = 0; i < arr.length; ++i) {
        if (!map[arr[i]]) map[arr[i]] = 0;  // if element not in map, init with 0
        ++map[arr[i]];                       // increment frequency
    }

    // Step 2: MinHeap (priority queue) based on frequency
    let pq = new MinPriorityQueue(x => x.freq);

    for (let key in map) {
        pq.push({ val: key, freq: map[key] }); // insert element into heap

        if (pq.size() > k) {
            pq.pop(); // remove least frequent element (log k)
        }
    }

    // Step 3: Extract all elements from heap → result
    return pq.toArray().map(x => Number(x.val));
};
```

---

## 🔹 Variations of Writing the Same Logic

### Variation 1: Using `enqueue` & `dequeue`
```js
var topKFrequent = function(nums, k) {
    let freqMap = new Map();
    for (let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    }

    let pq = new MinPriorityQueue({ priority: (item) => item[1] });

    for (let [num, freq] of freqMap.entries()) {
        pq.enqueue([num, freq]);
        if (pq.size() > k) {
            pq.dequeue();
        }
    }

    return pq.toArray().map(item => item.element[0]);
};
```

### Variation 2: Build Heap from Array (if library supports `fromArray`)
```js
var topKFrequent = function(nums, k) {
    let freqMap = {};
    for (let num of nums) {
        freqMap[num] = (freqMap[num] || 0) + 1;
    }

    // Convert freqMap to array of objects
    let items = Object.keys(freqMap).map(key => ({ val: key, freq: freqMap[key] }));

    // Build MinHeap directly
    let pq = MinPriorityQueue.fromArray(items, x => x.freq);

    while (pq.size() > k) pq.pop();

    return pq.toArray().map(x => Number(x.val));
};
```

### Variation 3: Use `push`/`pop` with Objects
```js
var topKFrequent = function(nums, k) {
    let map = {};
    for (let num of nums) {
        map[num] = (map[num] || 0) + 1;
    }

    let pq = new MinPriorityQueue(x => x.freq);
    Object.entries(map).forEach(([val, freq]) => {
        pq.push({ val, freq });
        if (pq.size() > k) pq.pop();
    });

    return pq.toArray().map(x => Number(x.val));
};
```

---

## 🔹 Why Use Heap Instead of Sorting?

- Sorting entire array of unique elements = **O(n log n)**.  
- But we only need **top k elements**, not a full order.  
- A **Min Heap of size k**:  
  - Ensures we only keep the top k frequent elements.  
  - Each insertion/removal costs **O(log k)**.  
- So total = **O(n log k)**, which is better when `k << n`.  

---

## 🔹 Time Complexity Summary

- **Hashing + Sorting** → O(n log n)  
- **Hashing + Min Heap** → O(n log k)  

✅ Use **Heap** when `k` is small compared to `n`.  
✅ Use **Sorting** when `k` is close to `n` (simpler).  

---

## 🔹 Conclusion
- Two main solutions: Sorting (simple) vs Min Heap (efficient).  
- In interviews/LeetCode, **Min Heap solution is preferred** since it meets O(n log k).  

# 🪨 Last Stone Weight Problem (LeetCode)

---

## 🔹 Problem Statement
We are given an array of stones where each stone has a positive integer weight.  
In each turn, pick the **two heaviest stones** and smash them together:

- If the stones are **equal**, both are destroyed.  
- If they are **different**, the smaller one is destroyed, and the larger one is reduced by the smaller one's weight.  
- Repeat until at most one stone remains.

Return the weight of the last stone, or `0` if none remain.

---

## 🔹 Approaches

### 1. Brute Force (Traversal)
- Repeatedly traverse the array to find the two largest stones.  
- Smash them, update the array, and continue.  

#### Code (Brute Force)
```javascript
var lastStoneWeight = function(stones) {
    while (stones.length > 1) {
        // Sort descending to find two largest
        stones.sort((a, b) => b - a);
        let y = stones.shift();
        let x = stones.shift();

        if (y !== x) {
            stones.push(y - x);
        }
    }
    return stones[0] || 0;
};
```

#### Complexity
- Sorting in each step: `O(n log n)`  
- Up to `n` smashes → **`O(n² log n)`** (inefficient).

---

### 2. Sorting Approach (Better Brute Force)
Instead of traversing manually:
- Sort the array once in descending order.  
- Re-insert the difference at the right place.

But still inefficient for large input.

#### Code (Sorting)
```javascript
var lastStoneWeight = function(stones) {
    while (stones.length > 1) {
        stones.sort((a, b) => b - a);
        let y = stones.shift();
        let x = stones.shift();
        if (y !== x) stones.push(y - x);
    }
    return stones[0] || 0;
};
```

#### Complexity
- Sorting each time: `O(n log n)` per smash  
- Up to `n` smashes → **`O(n² log n)`**.

---

### 3. Heap Approach (Efficient)
Heap allows **always getting the largest two elements in `O(log n)`** time.

👉 Intuition:  
- At every step, we only care about the **two largest stones**.  
- A **Max Heap** efficiently provides this in `O(log n)` per operation.  
- This reduces total complexity to `O(n log n)`.

---

#### 3.1 Using `MaxPriorityQueue` (enqueue/dequeue)
```javascript
var lastStoneWeight = function(stones) {
    let pq = new MaxPriorityQueue({ priority: (val) => val });

    for (let stone of stones) pq.enqueue(stone);

    while (pq.size() > 1) {
        let y = pq.dequeue().element; // largest
        let x = pq.dequeue().element; // 2nd largest
        if (y !== x) pq.enqueue(y - x);
    }

    return pq.isEmpty() ? 0 : pq.front().element;
};
```

---

#### 3.2 Shorter Version
```javascript
var lastStoneWeight = function(stones) {
    let pq = new MaxPriorityQueue();
    for (let stone of stones) pq.enqueue(stone);

    while (pq.size() > 1) {
        let y = pq.dequeue();
        let x = pq.dequeue();
        if (y - x > 0) pq.enqueue(y - x);
    }

    return pq.dequeue() || 0;
};
```

---

#### 3.3 Using `fromArray`
```javascript
var lastStoneWeight = function(stones) {
    let pq = MaxPriorityQueue.fromArray(stones);

    while (pq.size() > 1) {
        let y = pq.dequeue();
        let x = pq.dequeue();
        if (y > x) pq.enqueue(y - x);
    }

    return pq.dequeue() || 0;
};
```

---

#### 3.4 Using `push` and `pop`
```javascript
var lastStoneWeight = function(stones) {
    let pq = new MaxPriorityQueue();
    stones.forEach(stone => pq.push(stone));

    while (pq.size() > 1) {
        let y = pq.pop();
        let x = pq.pop();
        if (y > x) pq.push(y - x);
    }

    return pq.pop() || 0;
};
```

---

## 🔹 Time Complexity Analysis

### Brute Force / Sorting
- Sorting each round: `O(n log n)`  
- Up to `n` rounds → **`O(n² log n)`**

### Heap Approach
- Building heap: `O(n)`  
- Each smash involves 2 `pop`s + optional `push`: `O(log n)`  
- At most `n` smashes → **`O(n log n)`** ✅

---

## 🔹 Space Complexity
- Brute force: `O(1)` extra  
- Heap: `O(n)` for heap storage

---

## ✅ Conclusion
- **Brute Force / Sorting** is simple but too slow.  
- **Heap approach** is optimal: **`O(n log n)`**.  
- In JavaScript (LeetCode), we can use `MaxPriorityQueue` with:  
  - `enqueue/dequeue`  
  - `fromArray`  
  - `push/pop`  

# Monotonic Decreasing Queue

**Monotonic** means always going in one direction (either always increasing or always decreasing).

**Decreasing Queue** means the elements inside the queue are always arranged in **decreasing order** from **front → back**.

So in our case:
👉 At any moment, the queue looks like:
```
q[0] ≥ q[1] ≥ q[2] ≥ ...
```

---

## Why we want it decreasing?

Because:

- The **front (q[0])** will always be the **largest element in the current window**.
- That’s exactly what we need to answer the sliding window maximum problem quickly.

---

## How we maintain it

Every time we push a new element `arr[j]`:

1. While the **back of queue** is smaller than `arr[j]`, **pop it**.  
   (Because a smaller element behind a bigger one can never be the max later.)
2. Then push `arr[j]`.

This guarantees the queue is **monotonic decreasing**.

---

## ✅ Example: `arr = [3, 1, 5]`, `k = 2`

Step by step:

- Start: `q = []`
- Add 3 → `q = [3]`
- Add 1 → `1 < 3`, so keep → `q = [3, 1]` (still decreasing)
- Add 5 → `5 > 1` pop → `q = [3]` → `5 > 3` pop → `q = []` → push 5 → `q = [5]`

👉 Notice queue always keeps **decreasing order**.

# Deque Approach in Algorithms--maximu sliding window 

## 1️⃣ First: What is a Deque?

**Deque** stands for **Double-Ended Queue** (pronounced “deck”).  
It’s like a line of people where you can add or remove from **both ends**.

**Operations allowed:**
- `push_front` → add to the front
- `push_back` → add to the back
- `pop_front` → remove from the front
- `pop_back` → remove from the back

**In many languages:**
- Python → `collections.deque`
- Java → `ArrayDeque`
- JavaScript → usually use an array with `shift()` and `pop()`

---

## 2️⃣ Why is it useful in algorithms?

Normal queues are FIFO (**First In First Out**), but:
- **Deque** lets you control **both ends**.

This extra flexibility means you can:
- Maintain elements in sorted order while processing a stream.
- Keep only the elements you actually need (e.g., current sliding window).
- Remove outdated or useless elements fast.

---

## 3️⃣ What does "Deque approach" mean in problems like sliding window?

When people say **Deque approach** for a problem, they mean:
- Use a deque as a **special helper data structure** to store elements (or their indexes) efficiently.
- Allows **O(1)** retrieval of max/min in a range while processing in **O(n)** total time.

**Example: Maximum Sliding Window problem**

We don’t store all elements in the window in the deque. Instead:
1. Keep it **in decreasing order of values**.
2. Remove from **front** when an element goes out of the window.
3. Remove from **back** when a new element is bigger than the ones before it.

---

## 4️⃣ Why is it faster?

Without deque:
- You might re-check many elements every time the window slides → **O(n × k)**.

With deque:
- Each element is added once and removed once → **O(n)** total.
- Getting the max = **O(1)** (peek front).

---

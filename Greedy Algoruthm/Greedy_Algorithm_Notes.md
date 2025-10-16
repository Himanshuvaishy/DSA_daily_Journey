
# 🧠 Greedy Algorithm — Complete Notes

---

## 🔹 What is Greedy Algorithm?

A **Greedy Algorithm** builds the solution **step-by-step**, always choosing the option that looks **best at the moment (locally optimal)** — expecting that this path will lead to the **globally optimal** result.

> “Pick the best option right now and don’t look back.”

---

## 🧩 Types of Greedy Problems

---

### 1️⃣ Optimization Problems (Minimize or Maximize Result)

**Goal:** Find the **maximum or minimum** value like profit, number of tasks, distance, etc.

**Examples:**
- Minimum number of coins (to make a given amount)
- Maximize profit (selecting items/jobs)
- Minimize cost (network, transportation)

**Approach:**
- Define a greedy rule (e.g., smallest coin, highest value/weight).
- Apply until the goal is reached.

**Greedy Property:** Each local decision should lead toward a global optimum.

---

### 2️⃣ Activity Selection / Interval Scheduling Problem

**Problem:** Given activities with start and end times — schedule the **maximum number of non-overlapping activities**.

```text
Start = [1, 3, 0, 5, 8, 5]
End   = [2, 4, 6, 7, 9, 9]
```

**Steps:**
1. Sort by **end time**.
2. Pick first activity.
3. For each next, if `start >= lastEnd`, select it.

✅ **Greedy Choice:** Pick activity that **finishes earliest**.

**Result:** Maximum 4 activities.

---

### 3️⃣ Fractional Knapsack Problem

**Problem:** Given capacity `W`, and items with `value` & `weight`. Take **fractions** of items to maximize total value.

**Steps:**
1. Compute `value/weight` ratio.
2. Sort in descending order.
3. Pick until full, last item fractionally.

✅ **Greedy Choice:** Choose items with **highest value per weight**.

⚠️ Works only when **fractions allowed** (not 0/1 Knapsack).

---

### 4️⃣ Job Sequencing with Deadlines

**Problem:** Each job has:
- Deadline (latest time it can be done)
- Profit (if done before deadline)

Goal: **Schedule jobs for max profit.**

**Steps:**
1. Sort by **profit (descending)**.
2. For each job, place in the latest free slot before its deadline.

✅ **Greedy Choice:** Pick **most profitable** job available first.

---

### 5️⃣ Graph Problems

#### 🪜 Minimum Spanning Tree (MST)

Goal: Connect all vertices with **minimum total edge weight**.

**Kruskal’s Algorithm:**
1. Sort edges by weight.
2. Pick smallest edge that doesn’t form cycle.
3. Use Disjoint Set (Union-Find).

✅ Greedy Choice: **Pick smallest edge**.

**Prim’s Algorithm:**
1. Start with any node.
2. Add smallest edge connecting new vertex.

✅ Greedy Choice: **Expand with smallest edge.**

---

#### 🚦 Shortest Path (Dijkstra’s Algorithm)

**Goal:** Find shortest distance from source to all vertices.

**Steps:**
1. Start from source.
2. Pick node with **minimum current distance**.
3. Update neighbors.

✅ **Greedy Choice:** Choose **nearest unvisited vertex**.

⚠️ Works only for **non-negative weights**.

---

### 6️⃣ Scheduling Problems

#### 🧭 CPU Scheduling (Shortest Job First)

**Goal:** Minimize average waiting time.

**Steps:**
1. Sort jobs by **burst time**.
2. Execute shortest first.

✅ **Greedy Choice:** Execute **shortest job next**.

---

### 7️⃣ Games / Puzzles and Miscellaneous

**Examples:**
- Coin Change Problem
- Egyptian Fractions
- Minimum Platforms at station
- Huffman Encoding (compression)

✅ **Greedy Choice:** Pick smallest/largest element to minimize cost or maximize gain.

---

## 💡 Greedy Problem Hints — How to Identify

| Hint Phrase | Likely Problem Type |
|--------------|--------------------|
| Maximum number of ... | Activity selection, job scheduling |
| Minimum Cost / Maximum Profit | Knapsack, MST |
| Schedule / allocate / assign efficiently | Scheduling problems |
| Shortest / Smallest / Largest / Longest (with constraints) | Shortest Path, MST |
| Non-overlapping intervals | Activity selection, interval merging |

---

## 🧩 Summary Table

| Category | Example | Greedy Choice | Result |
|-----------|----------|---------------|---------|
| Interval Scheduling | Activity Selection | Earliest finish time | Max activities |
| Fractional Knapsack | Item selection | Highest value/weight | Max profit |
| Job Scheduling | Job with profit | Max profit first | Max profit |
| MST | Kruskal / Prim | Smallest edge | Min cost tree |
| Shortest Path | Dijkstra | Closest node | Min distance |
| Scheduling | CPU shortest job | Shortest next | Min wait time |

---

### 🧠 Key Takeaways
- Greedy algorithms are fast and intuitive.
- Always find **local optimum** → check if it leads to **global optimum**.
- Works best for problems with **optimal substructure** and **greedy choice property**.

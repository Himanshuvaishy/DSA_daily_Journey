
# 🍊 Rotting Oranges - Problem and Solution

## Problem Summary

You are given a `m x n` grid where each cell can be:
- `0`: empty
- `1`: fresh orange
- `2`: rotten orange

Each minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return the **minimum number of minutes** that must elapse until **no cell has a fresh orange**. If this is impossible, return `-1`.

---

## ✅ Why BFS is the Best Approach

### 1. BFS = Level by Level

The rot spreads **to all neighbors in 1 minute**, which matches BFS perfectly:
- Each level in BFS = 1 minute.
- All oranges rotted at time `t` will infect others at time `t + 1`.

### 2. BFS Handles Multiple Sources

There can be **multiple rotten oranges** at the start. BFS handles this by pushing **all rotten oranges initially into the queue**.

### 3. Easy Time Tracking

Attach the time level to each node `(i, j, time)` in the queue to keep track of when each orange rots.

---

## 🔁 BFS Logic

1. Put all rotten oranges `(value = 2)` in the queue with time = 0.
2. For each orange popped from the queue:
   - Check its 4 directions.
   - If neighbor is fresh `(value = 1)`, mark it rotten and push to queue with `time + 1`.
3. Track the max time.
4. After BFS ends, scan grid:
   - If any `1` (fresh) orange is left → return `-1`
   - Otherwise, return the max time.

---

## ✅ Beginner-Friendly Code

```javascript
var orangesRotting = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let queue = [];
    
    // Step 1: Add all initial rotten oranges to the queue
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j, 0]);
            }
        }
    }

    let maxMinutes = 0;

    // Step 2: BFS - spread the rot
    while (queue.length) {
        let [x, y, level] = queue.shift();

        // 4-directional movement
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (let [dx, dy] of directions) {
            let newX = x + dx;
            let newY = y + dy;

            if (newX >= 0 && newX < m && newY >= 0 && newY < n && grid[newX][newY] === 1) {
                grid[newX][newY] = 2; // Make it rotten
                queue.push([newX, newY, level + 1]);
            }
        }

        maxMinutes = Math.max(maxMinutes, level);
    }

    // Step 3: Check if any fresh orange remains
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                return -1;
            }
        }
    }

    return maxMinutes;
};
```

---

## 🤔 Why Not DFS or Brute Force?

| Approach | Reason it's not ideal |
|---------|------------------------|
| DFS     | Does not simulate "spread over time" well. Goes deep instead of wide. |
| Brute Force | Inefficient. May rescan the grid repeatedly. Can lead to TLE (Time Limit Exceeded). |
| BFS     | ✅ Best fit. Spreads rot layer-by-layer and tracks time easily. |

---

## 🔚 Summary

- We use **BFS** because rot spreads like a **wave**.
- BFS simulates **simultaneous** rotting and can handle **multiple rotten sources**.
- Time is tracked easily by associating level (minutes) with each rotting event.


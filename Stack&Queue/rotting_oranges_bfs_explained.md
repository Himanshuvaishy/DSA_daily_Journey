# 🍊 Rotting Oranges - BFS Approach (Beginner Friendly)

## ✅ Problem Summary

Each minute, any fresh orange (`1`) that is **4-directionally adjacent** to a rotten one (`2`) becomes rotten.

You must calculate the **minimum number of minutes** required to rot all oranges. If impossible, return `-1`.

---

## 📌 BFS Code with Explanation

```javascript
var orangesRotting = function(grid) {
    let m = grid.length;         // number of rows
    let n = grid[0].length;      // number of columns
    let queue = [];              // for storing rotten oranges

    // Step 1: Collect all initially rotten oranges
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 2) {
                queue.push([i, j, 0]); // (row, col, time/minute)
            }
        }
    }

    let maxMinutes = 0;

    // Step 2: BFS to rot adjacent fresh oranges
    while (queue.length) {
        let [x, y, level] = queue.shift();

        // up
        if (x > 0 && grid[x - 1][y] === 1) {
            grid[x - 1][y] = 2;
            queue.push([x - 1, y, level + 1]);
        }

        // down
        if (x < m - 1 && grid[x + 1][y] === 1) {
            grid[x + 1][y] = 2;
            queue.push([x + 1, y, level + 1]);
        }

        // right
        if (y < n - 1 && grid[x][y + 1] === 1) {
            grid[x][y + 1] = 2;
            queue.push([x, y + 1, level + 1]);
        }

        // left
        if (y > 0 && grid[x][y - 1] === 1) {
            grid[x][y - 1] = 2;
            queue.push([x, y - 1, level + 1]);
        }

        maxMinutes = Math.max(level, maxMinutes);
    }

    // Step 3: Final check if any fresh orange is left
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                return -1; // impossible to rot all oranges
            }
        }
    }

    return maxMinutes;
};
```

---

## 🧪 Dry Run Example

### Input:
```js
grid = [
  [2,1,1],
  [1,1,0],
  [0,1,1]
]
```

### Step-by-step (minute-by-minute):
- **Minute 0:** Rotten at (0,0)
- **Minute 1:** Rots (0,1), (1,0)
- **Minute 2:** Rots (0,2), (1,1)
- **Minute 3:** Rots (2,1)
- **Minute 4:** Rots (2,2)

### ✅ Total Time = 4 minutes

---

## 🎯 Final Return:
- `return maxMinutes;` → `4`

---

## 💡 Notes:
- We use BFS because it explores **level by level** — perfect for tracking **time steps**.
- The `queue` stores oranges with their rot time (`level`).
- At each level, we rot all adjacent fresh oranges.
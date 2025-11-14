# 🚗 Car Pooling — Full Explanation, Code & Dry Run (Greedy + Difference Array)

## 📌 Problem Summary
You are given several trips, each represented as:
```
[numPassengers, startLocation, endLocation]
```
A car with fixed `capacity` travels only east (increasing location order).

**Goal:** Check if all trips can be completed without the number of passengers ever exceeding the car’s capacity.

Return:
- ✅ `true` if all trips can be completed safely
- ❌ `false` otherwise

---

## 💡 Key Intuition (Easy Explanation)
Instead of simulating movement trip-by-trip:
- At `startLocation`, passengers **enter** the car.
- At `endLocation`, passengers **leave** the car.

We track **changes in passengers**, not the movement.

This is perfect for a **difference array**:
- `diff[start] += passengers`
- `diff[end] -= passengers`

Then we compute a running sum (prefix sum) to find out how many passengers are in the car at each location.

If at **any point** the car has more passengers than `capacity`, we return `false`.

---

## 🧠 Why Difference Array Works
Difference array means:
- We store only where the passenger count changes
- Prefix sum recreates actual passenger count as the car moves

Efficient:
- Time: `O(n + 1000)` (excellent)
- Space: `O(1000)`

---

## 🧾 JavaScript Code (Efficient & Clean)
```javascript
var carPooling = function(trips, capacity) {
    const diff = new Array(1001).fill(0);

    for (let [pass, start, end] of trips) {
        diff[start] += pass;   // people enter at 'start'
        diff[end] -= pass;     // people exit at 'end'
    }

    let curr = 0; // current passenger count

    for (let i = 0; i < 1001; i++) {
        curr += diff[i];       // build the passenger count

        if (curr > capacity)   // car overloaded?
            return false;
    }

    return true;
};
```

---

# 🧪 Dry Run Example 1 (Output = false)
### **Input:**
```
trips = [
  [2, 1, 5],  // 2 passengers from 1 to 5
  [3, 3, 7]   // 3 passengers from 3 to 7
]
capacity = 4
```

### 🏗 Step 1: Build diff array
```
diff[1] += 2
diff[5] -= 2

diff[3] += 3
diff[7] -= 3
```

Non-zero diff entries:
```
1 : +2
3 : +3
5 : -2
7 : -3
```

---

### 🚙 Step 2: Prefix Sum Simulation
| Location | Change | Current Passengers |
|----------|--------|--------------------|
| 0 | 0 | 0 |
| 1 | +2 | 2 |
| 2 | 0 | 2 |
| 3 | +3 | **5 ❌ (capacity exceeded)** |

**Result: `false`**

---

# 🧪 Dry Run Example 2 (Output = true)
### **Input:**
```
trips = [
  [2, 1, 5],
  [1, 3, 7]
]
capacity = 4
```

### diff events:
```
1 : +2
3 : +1
5 : -2
7 : -1
```

### prefix simulation:
```
loc 1 -> 2
loc 3 -> 3
loc 5 -> 1
loc 7 -> 0
```

Passenger count **never exceeds capacity 4** → OK

**Result: `true`**

---

# ✔ Final Notes
- Difference array is the fastest approach.
- Avoid sorting or simulating trip-by-trip; it becomes slower.
- This is similar in thinking to "Meeting Rooms II" or "Minimum Platforms" problems.

---

If you want, I can also create:
- 📄 A PDF version
- 📝 A problem + solution cheat sheet
- 🧮 A version using priority queue (for learning)
- 🧊 Visual diag
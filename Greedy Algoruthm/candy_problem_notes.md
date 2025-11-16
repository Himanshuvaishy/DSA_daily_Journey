# 🍬 Candy Problem (LeetCode 135) — Full Notes & Clear Explanation

## 📌 Problem Summary
You are given an array `arr` where:
- `arr[i]` = rating of the *i-th child*
- Every child must get **at least 1 candy**
- A child with **higher rating than a neighbor** must get **more candies** than that neighbor

🎯 **Goal:** Return the *minimum total number of candies* required.

---

# ✔ Key Idea (Greedy + Two Pass Solution)
A single pass cannot satisfy both left and right neighbor relationships.  
So we use a **two-pass greedy approach**:

### **1️⃣ First Pass: Left → Right (LTR)**
- Fix the rule:  
  **If arr[i] > arr[i-1], then candies[i] = candies[i-1] + 1**
- This ensures each child has more candies than the left neighbor when their rating is higher.

### **2️⃣ Second Pass: Right → Left (RTL)**
- Fix the rule:  
  **If arr[i] > arr[i+1], then candies[i] = candies[i+1] + 1**
- This ensures each child has more candies than the right neighbor when their rating is higher.

### **3️⃣ Combine Both Results Using:**
```
candies[i] = max(ltr[i], rtl[i])
```
Why **max**?  
Because the child must satisfy **both** left and right conditions, so we take whichever requires more.

Finally sum all candies.

---

# 🧠 Why Two Arrays?
Because neighbor conditions apply from **both sides**, but at different times.

Example:
```
Ratings: [1, 3, 2]
```
- LTR ensures child 1 gets more than left neighbor
- RTL ensures child 1 gets more than right neighbor

Only using one direction would break the other.

Thus we keep two arrays, apply both rules, and choose the strictest.

---

# 🧾 Code Used in Explanation
```javascript
var candy = function (arr) {
    let n = arr.length;

    // Left-to-right
    let ltr = Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        if (arr[i] > arr[i - 1]) {
            ltr[i] = ltr[i - 1] + 1;
        }
    }

    // Right-to-left
    let rtl = Array(n).fill(1);
    for (let i = n - 2; i >= 0; i--) {
        if (arr[i] > arr[i + 1]) {
            rtl[i] = rtl[i + 1] + 1;
        }
    }

    // Combine both results
    let ans = 0;
    for (let i = 0; i < n; i++) {
        ans += Math.max(ltr[i], rtl[i]);
    }

    return ans;
};
```

---

# 🔍 Step-by-Step Walkthrough (Dry Run)
## Example:
```
Ratings: [1, 3, 4, 5, 2]
```

### **Step 1: Left to Right (LTR)**
Initial: `[1,1,1,1,1]`
- arr[1] > arr[0] → ltr[1] = 2
- arr[2] > arr[1] → ltr[2] = 3
- arr[3] > arr[2] → ltr[3] = 4
- arr[4] < arr[3] → stays 1

LTR result:
```
[1, 2, 3, 4, 1]
```

### **Step 2: Right to Left (RTL)**
Initial: `[1,1,1,1,1]`
- arr[3] > arr[4] → rtl[3] = 2
- arr[2] > arr[3]? No → stays
- arr[1] > arr[2]? No → stays
- arr[0] < arr[1] → stays

RTL result:
```
[1, 1, 1, 2, 1]
```

### **Step 3: Combine max(ltr, rtl)**
```
max: [1, 2, 3, 4, 1]
```

### **Total = 1 + 2 + 3 + 4 + 1 = 11 candies**

---

# 📚 Important Notes
### ✔ Why `max(ltr[i], rtl[i])`?
Because:
- LTR fixes left rule
- RTL fixes right rule
- Child must satisfy *both* rules

Taking max ensures the child gets enough candies to satisfy both neighbors.

### ✔ Time Complexity: **O(n)**
- Two passes through the array
- One pass to calculate the final sum

### ✔ Space Complexity: **O(n)**
- Two arrays `ltr` and `rtl`

---

# 🧠 Visual Intuition (Very Easy)
Think of ratings as forming **mountains**:
```
   /
  /
 /
/   \
```
- LTR catches the **ascending slopes**
- RTL catches the **descending slopes**
- Children at peaks need the most candies → max(ltr, rtl)

---

# 🎯 Final Summary
- Use two arrays to track candy requirements from both sides.
- Left pass handles increasing ratings from left.
- Right pass handles increasing ratings from right.
- Final answer is sum of max values from both arrays.
- This guarantees minimal candies while satisfying all rules.

This is the **standard optimal solution** accepted in interviews & LeetCode.

---


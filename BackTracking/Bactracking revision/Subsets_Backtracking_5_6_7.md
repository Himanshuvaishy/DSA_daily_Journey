# Subsets Backtracking (Call Stack + Loop Execution) — arr = [5,6,7]

We use `arr = [5,6,7]` to demonstrate.  
The goal: generate all subsets using backtracking.

---

## Core Idea

- Each recursive call has its own `i` loop starting from `start`.
- After recursion returns, execution continues right after the recursive call.
- `path.pop()` undoes the last choice, but **`i` does not reset**.
- The caller’s loop then continues with the next `i`.

---

## Step-by-Step Execution

### **Step 1: Start**
`backtrack([],0)`  
- Path = `[]`, start = 0  
- Loop runs `i = 0..2`

---

### **Step 2: i=0 → push 5**
Path → `[5]`  
Call → `backtrack([5],1)`

---

### **Step 3: Inside backtrack([5],1)**
Loop runs `i = 1..2`  
- `i = 1` → push 6 → `backtrack([5,6],2)`

---

### **Step 4: Inside backtrack([5,6],2)**
Loop runs `i = 2..2`  
- `i = 2` → push 7 → `backtrack([5,6,7],3)`

---

### **Step 5: Inside backtrack([5,6,7],3)**
Loop does not run (3 < 3 is false)  
Return.

---

### **Step 6: Return to backtrack([5,6],2)**

```js
path.pop(); // → [5,6]
```

Loop ends → return.

---

### **Step 7: Back to backtrack([5],1)**

```js
path.pop(); // → [5]
```

Loop continues with `i = 2`  
Push 7 → `backtrack([5,7],3)`

---

### **Step 8: Inside backtrack([5,7],3)**

- Loop does not run  
- Return  
- Pop 7 → Path = `[5]`  
- Loop ends → Return

---

### **Step 9: Back to backtrack([],0)**

```js
path.pop(); // removes 5 → []
```

Loop continues: `i = 1`  
Push 6 → `backtrack([6],2)`

---

### **Step 10: Inside backtrack([6],2)**

- Loop: `i = 2`  
- Push 7 → `backtrack([6,7],3)`  
- Return → Pop 7 → `[6]`  
- Loop ends → Return

---

### **Step 11: Back to backtrack([],0)**

Loop continues: `i = 2`  
Push 7 → `backtrack([7],3)`  
Return → Pop → `[]`  

---

# Flow Diagram (Execution Tree)

```
backtrack([],0)
 ├─ i=0 → push 5 → backtrack([5],1)
 │    ├─ i=1 → push 6 → backtrack([5,6],2)
 │    │    └─ i=2 → push 7 → backtrack([5,6,7],3)
 │    │           ↩ return → pop(7)
 │    │    ↩ return → pop(6)
 │    └─ i=2 → push 7 → backtrack([5,7],3)
 │           ↩ return → pop(7)
 │    ↩ return → pop(5)
 ├─ i=1 → push 6 → backtrack([6],2)
 │    └─ i=2 → push 7 → backtrack([6,7],3)
 │           ↩ return → pop(7)
 │    ↩ return → pop(6)
 └─ i=2 → push 7 → backtrack([7],3)
      ↩ return → pop(7)
```

---

# Key Takeaways

- Each recursive call has an independent loop.
- After returning from recursion, execution continues at **path.pop()**.
- `i` resumes from where it left — **loops do NOT restart**.
- `pop()` undoes the last decision.

---

# JavaScript Code Example

```js
function subsets(arr) { 
    const ans = [];
    const path = [];

    function backtrack(start) {
        ans.push([...path]);

        for (let i = start; i < arr.length; i++) {
            path.push(arr[i]);
            backtrack(i + 1);
            path.pop();
        }
    }

    backtrack(0);
    return ans;
}

console.log(subsets([5,6,7]));
```


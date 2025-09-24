# Subsets Backtracking (Call Stack + Loop Execution)

We use `arr = [1,2,3]` to demonstrate.  
The goal: generate all subsets using backtracking.

---

## Core Idea

- Each recursive call has its own `i` loop starting from `start`.
- After recursion returns, execution continues right after the recursive call.
- `path.pop()` undoes the last choice, but **`i` does not reset**.
- The caller’s loop then continues with the next `i`.

---

## Step-by-Step Execution

### Step 1: Start
Call: `backtrack([],0)`  
- Path = `[]`, start = 0  
Loop runs `i=0..2`.

---

### Step 2: i=0 → push 1
- Path = `[1]`  
- Call `backtrack([1],1)`.

---

### Step 3: Inside `backtrack([1],1)`
- Path = `[1]`, start = 1  
Loop runs `i=1..2`.  

➡️ First `i=1`: push 2 → `backtrack([1,2],2)`

---

### Step 4: Inside `backtrack([1,2],2)`
- Path = `[1,2]`, start=2  
Loop runs `i=2..2`.  

➡️ First `i=2`: push 3 → `backtrack([1,2,3],3)`

---

### Step 5: Inside `backtrack([1,2,3],3)`
- Path = `[1,2,3]`, start=3  
Loop: `for(i=3; i<3)` → does not run.  
Function **returns immediately**.

---

### Step 6: Return to `backtrack([1,2],2)`
We continue after the recursive call:

```js
path.pop(); // removes 3 → Path = [1,2]
```

Loop ends (`i=2` was last).  
So return to caller: `backtrack([1],1)`.

---

### Step 7: Return to `backtrack([1],1)`
We continue after recursive call with `i=1`:  

```js
path.pop(); // removes 2 → Path = [1]
```

Loop continues with `i=2`.  
Push 3 → call `backtrack([1,3],3)`.

---

### Step 8: Inside `backtrack([1,3],3)`
- Path = `[1,3]`, start=3  
Loop: `for(i=3; i<3)` → does not run.  
Return immediately.

Back to `backtrack([1],1)`:  
```js
path.pop(); // removes 3 → Path = [1]
```

Loop ends. Return to `backtrack([],0)`.

---

### Step 9: Back to `backtrack([],0)`
We continue after recursive call with `i=0`:  

```js
path.pop(); // removes 1 → Path = []
```

Loop continues with `i=1`.  
Push 2 → call `backtrack([2],2)`.

---

### Step 10: Inside `backtrack([2],2)`
- Path = `[2]`, start=2  
Loop runs `i=2`: push 3 → call `backtrack([2,3],3)`.

Inside `[2,3],3`: loop does not run → return.  
Pop 3 → Path = `[2]`.  
Loop ends. Return.

---

### Step 11: Back to `backtrack([],0)` again
Continue loop: `i=2`  
Push 3 → call `backtrack([3],3)`.

Inside `[3],3`: loop does not run → return.  
Pop → Path = []. Loop ends. Return.

---

# Flow Diagram (Execution Tree with Backtracking)

Below is a flow-like tree with arrows showing recursive calls and returns:

```
backtrack([],0)
 ├─ i=0 → push 1 → backtrack([1],1)
 │    ├─ i=1 → push 2 → backtrack([1,2],2)
 │    │    └─ i=2 → push 3 → backtrack([1,2,3],3)
 │    │           ↩ return → pop(3) → [1,2]
 │    │    ↩ loop ends → return → pop(2) → [1]
 │    └─ i=2 → push 3 → backtrack([1,3],3)
 │           ↩ return → pop(3) → [1]
 │    ↩ loop ends → return → pop(1) → []
 ├─ i=1 → push 2 → backtrack([2],2)
 │    └─ i=2 → push 3 → backtrack([2,3],3)
 │           ↩ return → pop(3) → [2]
 │    ↩ loop ends → return → pop(2) → []
 └─ i=2 → push 3 → backtrack([3],3)
      ↩ return → pop(3) → []
↩ loop ends → all done
```

---

# Key Takeaways

- **Every recursive call owns its loop** starting at `start`.
- When a call ends, control returns to the caller *right after the recursive call*.
- The `pop()` undoes the last push, restoring `path` before trying next `i`.
- The loop index `i` does **not reset** after return — it continues naturally.

```js

Subsets Backtracking Execution
Step 1: Start

Call: backtrack([],0)

path = []

start = 0

Code in action:

for (let i = 0; i < 3; i++) {
    path.push(arr[i]);
    backtrack(path, i+1);
    path.pop();
}


So the loop starts with i=0.

Step 2: i=0 → push 1

Path = [1]

Recursive call: backtrack([1],1)

Step 3: Inside backtrack([1],1)

Path = [1]

Loop runs from i=1..2

➡️ First iteration: i=1

path.push(2);   // path = [1,2]
backtrack([1,2],2);
path.pop();

Step 4: Inside backtrack([1,2],2)

Path = [1,2]

Loop runs from i=2..2

➡️ First iteration: i=2

path.push(3);   // path = [1,2,3]
backtrack([1,2,3],3);
path.pop();

Step 5: Inside backtrack([1,2,3],3)

Path = [1,2,3]

Loop is:

for (let i=3; i<3; i++) { ... }


But since i=3 is not <3, loop doesn’t run.
So function returns immediately.
Stack pops back to caller.

Step 6: Back to backtrack([1,2],2)

We left off here:

path.push(3);
backtrack([1,2,3],3);   // ← just returned
path.pop();             // ← now runs


So:

Pop → Path = [1,2]

Loop check: was i=2, no more elements → loop ends.

Function returns to its caller backtrack([1],1).

Step 7: Back to backtrack([1],1)

We left off here:

path.push(2);
backtrack([1,2],2);  // ← just returned
path.pop();          // ← now runs


So:

Pop → Path = [1]

Loop continues → next i=2.

Step 8: i=2 in backtrack([1],1)
path.push(3);   // Path = [1,3]
backtrack([1,3],3);
path.pop();

Step 9: Inside backtrack([1,3],3)

Path = [1,3]

Loop: for (i=3; i<3; i++) → doesn’t run

Function returns.

Back to backtrack([1],1):

Execute path.pop() → Path = [1]

Loop ends (since last i=2).

Function returns to caller backtrack([],0).

Step 10: Back to backtrack([],0)

We left off at:

path.push(1);
backtrack([1],1);   // ← just returned
path.pop();         // ← now runs


So:

Pop → Path = []

Loop continues → next i=1.

Step 11: i=1 in backtrack([],0)
path.push(2);   // Path = [2]
backtrack([2],2);
path.pop();


➡️ This repeats similar logic as before, generating [2,3] and [3].

🔑 Big Takeaway

Each recursive call has its own i loop, starting at start.

When a recursive call finishes:

Execution continues at the next line after the call (the path.pop()).

Then the caller’s for loop checks the next i.

Backtracking = pop() undoing the last choice, but i doesn’t reset.

So the call stack + loop index control where we return and what we explore next.
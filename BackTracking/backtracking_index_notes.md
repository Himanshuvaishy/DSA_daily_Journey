# Backtracking & Loop Index Visualization

This note explains **how backtracking works internally with loop index `i`** using the subsets problem (`Power Set`).

---

## 🚀 Cheat-Sheet (Quick Reference)

- Each recursive call has its **own loop index `i`**, starting at the given `start` parameter.
- When recursion returns, the **caller’s loop continues from the next `i`**, not from the beginning.
- `path.pop()` **removes the last element** but does **not reset `i`**.
- Because each level has its own `i`, the recursion tree naturally explores all subsets.

**Mini Example:**

```js
arr = [1,2,3]
subsets(arr)
```

- `backtrack([],0)` → `i=0,1,2`
- `backtrack([1],1)` → `i=1,2`
- `backtrack([1,2],2)` → `i=2`
- `backtrack([1,2,3],3)` → loop ends (start=3)
- Return → back to `[1,2]`, pop → `[1]`, continue loop at `i=2`
- … and so on.

---

## 📝 Detailed Notes

### Code with Logging
```js
var subsets = function(arr) {
    let result = [];
    let backtrack = (path, start) => {
        console.log("Enter:", path, " start=", start);
        result.push([...path]);

        for (let i = start; i < arr.length; i++) {
            console.log(" Loop i =", i, " push", arr[i]);
            path.push(arr[i]);
            backtrack(path, i+1);
            console.log(" Backtrack: pop", path[path.length-1]);
            path.pop();
        }

        console.log("Exit:", path, " start=", start);
    };

    backtrack([], 0);
    return result;
};
```

---

### Sample Trace (`arr=[1,2,3]`)

```
Enter: [] start=0
 Loop i=0 push 1
    Enter: [1] start=1
     Loop i=1 push 2
        Enter: [1,2] start=2
         Loop i=2 push 3
            Enter: [1,2,3] start=3
            Exit: [1,2,3] start=3
         Backtrack: pop 3
        Exit: [1,2] start=2
     Backtrack: pop 2
     Loop i=2 push 3
        Enter: [1,3] start=3
        Exit: [1,3] start=3
     Backtrack: pop 3
    Exit: [1] start=1
 Backtrack: pop 1
 Loop i=1 push 2
    Enter: [2] start=2
     Loop i=2 push 3
        Enter: [2,3] start=3
        Exit: [2,3] start=3
     Backtrack: pop 3
    Exit: [2] start=2
 Backtrack: pop 2
 Loop i=2 push 3
    Enter: [3] start=3
    Exit: [3] start=3
 Backtrack: pop 3
Exit: [] start=0
```

---

### 🔑 How to Read This Trace

- **"Enter"** shows a new recursive call with its own `start` index.  
- **Loop i=...** means we’re about to explore that element.  
- **Backtrack: pop** → element removed, returning to caller’s loop.  
- **Exit** → loop at this level finished, return to caller.  

---

## ✅ Key Takeaways

1. **Each recursive call has its own loop counter `i`.**
2. When recursion returns, execution resumes in the caller’s loop **at the next `i`**.  
3. `pop()` only cleans the `path`, so the next iteration can try a different element.  
4. This mechanism ensures **all subsets** are generated systematically.

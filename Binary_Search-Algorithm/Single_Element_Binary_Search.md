
# 🧠 Single Element in a Sorted Array – Binary Search Approach

## ✅ Problem Statement

> Given a **sorted** array where every element appears **exactly twice** except for one unique element, find that single element in **O(log n)** time and **O(1)** space.

---

## ✅ Full Code

```js
var singleNonDuplicate = function (arr) {
    let l = 0;
    let r = arr.length - 1;

    while (l <= r) {
        let m = Math.floor(l + (r - l) / 2);

        if (arr[m] === arr[m - 1]) {
            let leftCount = m - 1 - l;
            if (leftCount % 2 === 1) {
                r = m - 2;
            } else {
                l = m + 1;
            }
        } else if (arr[m] === arr[m + 1]) {
            let leftCount = m - l;
            if (leftCount % 2 === 1) {
                r = m - 1;
            } else {
                l = m + 2;
            }
        } else {
            return arr[m];
        }
    }
};
```

---

## 🔍 Step-by-Step Explanation

### 🎯 Key Observations

1. The array is **sorted** and all elements appear in pairs.
2. Only **one element appears once**.
3. Binary Search helps eliminate half the array.

---

### 🔧 Condition 1: `arr[m] == arr[m - 1]`

- Means current pair is on the **left** side of `m`.
- Count how many elements are on the **left of the pair**:  
  `leftCount = m - 1 - l`

#### Logic:

- If `leftCount` is **odd** → single lies **left** → `r = m - 2`
- If `leftCount` is **even** → single lies **right** → `l = m + 1`

---

### 🔧 Condition 2: `arr[m] == arr[m + 1]`

- Means current pair is on the **right** side of `m`.
- Count elements on the **left of m**:  
  `leftCount = m - l`

#### Logic:

- If `leftCount` is **odd** → single lies **left** → `r = m - 1`
- If `leftCount` is **even** → single lies **right** → `l = m + 2`

---

### ✅ Condition 3: `arr[m] != arr[m-1]` and `arr[m] != arr[m+1]`

- `arr[m]` is the single element.  
  → Return it.

---

## 🔁 Difference from Standard Even-Odd Index Method

| Your Approach                                | Standard Even-Odd Index Method             |
|---------------------------------------------|-------------------------------------------|
| Based on **count of elements to the left**  | Based on **mid index being even or odd**  |
| More intuitive                              | Slightly shorter                          |
| Easy to understand                          | Uses index parity rules                   |
| Checks `arr[m-1]` and `arr[m+1]` safely     | Relies on parity matching                 |

---

## 🔍 Visual Dry Run

Array: `[1,1,2,3,3,4,4,8,8]`

```
Initial: l = 0, r = 8
m = 4 → arr[4] = 3, arr[3] = 3 → Pair found to the left
leftCount = 4 - 1 - 0 = 3 (odd) → Move to left → r = 2

Next: l = 0, r = 2
m = 1 → arr[1] = 1, arr[0] = 1 → Pair found to the left
leftCount = 1 - 1 - 0 = 0 (even) → Move to right → l = 2

Now: l = 2, r = 2
m = 2 → arr[2] = 2 → Not equal to neighbors → ✅ Single element found!
```

✅ **Answer = 2**

---

## 🏁 Conclusion

- Efficient O(log n) time.
- No extra space.
- Intuitive breakdown by counting elements on left.

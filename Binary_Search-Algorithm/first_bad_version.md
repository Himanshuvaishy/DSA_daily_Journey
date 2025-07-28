
# 🧪 First Bad Version - Binary Search Solutions

## 🧩 Problem Statement

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous one, all the versions after a bad version are also bad.

You are given an API `bool isBadVersion(version)` which will return whether `version` is bad.

Implement a function to find the first bad version. You should minimize the number of calls to the API.

---

## ✅ Approach 1: Store Mid When Bad

```js
var solution = function(isBadVersion) {
    return function(n) {
        let l = 1;
        let r = n;
        let firstBad = -1;

        while (l <= r) {
            let mid = Math.floor(l + (r - l) / 2);
            if (isBadVersion(mid)) {
                firstBad = mid;
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return firstBad;
    };
};
```

### 🔍 Explanation

- Store `mid` when `isBadVersion(mid)` is true.
- Move `r` to `mid - 1` to search for earlier bad versions.
- Final result stored in `firstBad`.

---

## ✅ Approach 2: Direct Return with `l <= r`

```js
var solution = function(isBadVersion) {
    return function(n) {
        let l = 1;
        let r = n;

        while (l <= r) {
            let mid = Math.floor(l + (r - l) / 2);
            if (isBadVersion(mid)) {
                r = mid - 1;
            } else {
                l = mid + 1;
            }
        }

        return l;
    };
};
```

### 🔍 Explanation

- When version is bad, shift `r` to `mid - 1`.
- When version is good, move `l` to `mid + 1`.
- First bad version will be at position `l` when loop ends.

---

## ✅ Approach 3 (Best): Using `l < r`

```js
var solution = function(isBadVersion) {
    return function(n) {
        let l = 1;
        let r = n;

        while (l < r) {
            let mid = Math.floor(l + (r - l) / 2);
            if (isBadVersion(mid)) {
                r = mid;
            } else {
                l = mid + 1;
            }
        }

        return l;
    };
};
```

### 🔍 Explanation

- Only loop while `l < r` to ensure no off-by-one errors.
- If version is bad, `r = mid` (don’t discard mid).
- If version is good, discard it with `l = mid + 1`.
- Loop ends when `l === r` → the first bad version.

---

## 🧠 Dry Run Example

Assume `n = 7` and `first bad = 4`.

- l=1, r=7 → mid=4 → isBad(4)=true → r=4
- l=1, r=4 → mid=2 → isBad(2)=false → l=3
- l=3, r=4 → mid=3 → isBad(3)=false → l=4

Now `l === r === 4` → first bad version = 4 ✅

---

## 📊 Comparison Table

| Approach | Loop Condition | Bad Version Found? | Result Logic       | Notes |
|---------|----------------|--------------------|--------------------|-------|
| 1       | `while (l <= r)` | Store in `firstBad` | Return `firstBad`  | Explicit tracking |
| 2       | `while (l <= r)` | Return directly     | Return `l`    | Classic approach |
| 3 ✅    | `while (l < r)`  | Narrow range        | Return `l` or `r`   | Most optimized |

---

## 📦 Conclusion

Approach 3 is the most optimized and cleanest solution. It uses `while (l < r)` and always converges to the correct answer with fewer comparisons.



# 🐞 Why `while (l <= r)` with `r = mid` Causes TLE (Time Limit Exceeded)

When using **binary search**, especially in the *First Bad Version* problem, it's important to carefully choose your loop condition and how you update the pointers.

---

## ❌ Problem Code (TLE)

```js
while (l <= r) {
    let mid = l + Math.floor((r - l) / 2);
    if (isBadVersion(mid)) {
        r = mid;  // ❌ doesn't shrink range if mid == r
    } else {
        l = mid + 1;
    }
}
return l;
❗ Why This Causes TLE
When l == r, we get:

mid = l = r

If isBadVersion(mid) is true, then r = mid

So r remains the same → infinite loop

This results in no progress, and the loop keeps running forever or until the time limit is exceeded.


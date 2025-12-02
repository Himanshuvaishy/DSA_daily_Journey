# Word Break — Notes (brute → recursion → top-down DP → bottom-up DP)

**Style:** I used your variable naming and code style (`var wordBreak = function (s, wordDict) { ... }`, `fn`, `remS`, `dp`, `res`, `substr`) so you can paste directly into your editor.

---

## Quick problem statement
Given a string `s` and a list `wordDict`, return `true` if `s` can be segmented into a sequence of one or more dictionary words.

---

## 1) Brute force (backtracking — try every cut)
```js
var wordBreak = function (s, wordDict) {
  let dict = new Set(wordDict);

  // fn(remS) -> can remS be segmented?
  let fn = (remS) => {
    if (remS === "") return true; // empty remainder is valid

    // try every prefix
    for (let i = 0; i < remS.length; i++) {
      let substr = remS.substring(0, i + 1);
      if (dict.has(substr)) {
        if (fn(remS.substring(i + 1))) return true;
      }
    }

    return false;
  };

  return fn(s);
};
```

**Key variables**
- `s` — input string
- `wordDict` — array of words
- `dict` — `Set(wordDict)` for O(1) check
- `remS` — remaining suffix being solved
- `i` — cut index
- `substr` — prefix candidate from `remS`

**Complexity**
- Time: exponential (roughly O(2^n) in worst case)
- Space: O(n) recursion depth

**Dry run** (`s = "leet"`, `wordDict = ["l","leet"]`)
- `fn("leet")` tries prefixes:
  - `i=0` → `substr = "l"` in dict → call `fn("eet")`
    - `fn("eet")` tries prefixes -> none lead to empty → returns `false`
  - `i=1` → `substr = "le"` not in dict
  - `i=2` → `substr = "lee"` not in dict
  - `i=3` → `substr = "leet"` in dict -> `fn("")` => `true` -> propagate `true`

Result: `true` (found partition `"leet"`)

---

## 2) Recursion (index-based, same brute idea but using index `pos` — fewer string allocations)
```js
var wordBreak = function (s, wordDict) {
  let dict = new Set(wordDict);

  // fn(pos) -> can s[pos..end] be segmented?
  let fn = (pos) => {
    if (pos === s.length) return true;

    for (let i = pos; i < s.length; i++) {
      let substr = s.substring(pos, i + 1);
      if (dict.has(substr) && fn(i + 1)) {
        return true;
      }
    }

    return false;
  };

  return fn(0);
};
```

**Key variables**
- `pos` — current start index inside `s`
- `i` — end index for the candidate word (inclusive in code above)
- `substr` — `s.substring(pos, i+1)`

**Complexity**
- Time: exponential (same as brute without memo)
- Space: O(n) recursion depth

**Dry run** (`s = "cats"`, `wordDict = ["cat","cats","s"]`)
- `fn(0)` → try i=0..3
  - i=2: substr=`s[0..2] = "cat"`, dict.has -> call `fn(3)`
    - `fn(3)` pos=3 → try i=3 -> substr=`s[3..3] = "s"` in dict -> `fn(4)` -> pos===len -> true -> propagate true

Result: true (`"cat" + "s")

---

## 3) Top-down DP (recursion + memo) — your dp object style
This is very similar to your first screenshot where you memoize by remaining string. Below I use memo indexed by position (recommended) but I also include the `remS`-memo version after.

### Preferred (pos-index memo):
```js
var wordBreak = function (s, wordDict) {
  let dict = new Set(wordDict);
  let dp = new Array(s.length).fill(undefined); // undefined -> uncomputed

  let fn = (pos) => {
    if (pos === s.length) return true;
    if (dp[pos] !== undefined) return dp[pos];

    let res = false;
    for (let i = pos; i < s.length; i++) {
      let substr = s.substring(pos, i + 1);
      if (dict.has(substr) && fn(i + 1)) {
        res = true;
        break;
      }
    }

    dp[pos] = res;
    return res;
  };

  return fn(0);
};
```

### Alternate (string-keyed memo like your screenshot):
```js
var wordBreak = function (s, wordDict) {
  let dict = new Set(wordDict);
  let dp = {}; // dp[remS] = true/false

  let fn = (remS) => {
    if (remS === "") return true;
    if (remS in dp) return dp[remS];

    let res = false;
    for (let i = 0; i < remS.length; i++) {
      let substr = remS.substring(0, i + 1);
      if (dict.has(substr) && fn(remS.substring(i + 1))) {
        res = true;
        break;
      }
    }

    dp[remS] = res;
    return res;
  };

  return fn(s);
};
```

**Key variables**
- `dp` (array or object) — memo to save previously computed positions or remaining strings
- `pos` / `remS` — state
- `res` — boolean outcome for that state

**Complexity**
- Time: O(n^2 * L) roughly (n positions × n checks × substring cost), but dramatically faster than brute in practice
- Space: O(n)

**Dry run (pos-memo) — `s = "leetcode"`, `wordDict = ["leet","code"]`
- Start: dp = [undefined × 8]
- fn(0): try i from 0..7
  - i=3 substr="leet" in dict -> call fn(4)
    - fn(4): try i=4..7
      - i=7 substr="code" in dict -> call fn(8)
        - fn(8): pos===len -> true -> store dp[4] = true, dp[0] = true

Memoization prevents exploring other useless partitions.

---

## 4) Bottom-up DP (iterative) — dp by prefix length (your style adapted)
```js
var wordBreak = function (s, wordDict) {
  let dict = new Set(wordDict);
  let n = s.length;
  let dp = new Array(n + 1).fill(false);
  dp[0] = true; // empty prefix

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      // check prefix s[0..j-1] and word s[j..i-1]
      if (dp[j]) {
        let substr = s.substring(j, i);
        if (dict.has(substr)) {
          dp[i] = true;
          break;
        }
      }
    }
  }

  return dp[n];
};
```

**Key variables**
- `dp` — boolean array of length `n+1`, `dp[i]` indicates `s[0..i-1]` segmentable
- `i` — current prefix length being solved (1..n)
- `j` — split point in prefix
- `substr` — candidate `s[j..i-1]`

**Complexity**
- Time: O(n^2 * L) (two loops, substring checks)
- Space: O(n)

**Dry run** (`s = "leetcode"`, `wordDict = ["leet","code"]`)
- dp initial: [true, false, false, false, false, false, false, false, false]
- i=1..3 -> no j sets dp[i]
- i=4 -> j=0: dp[0]=true and substr=s.substring(0,4)='leet' in dict -> dp[4]=true
- i=5..7 no changes
- i=8 -> j=4 dp[4]=true and substr=s.substring(4,8)='code' in dict -> dp[8]=true -> return true

---

## Demo snippet (run all approaches)
```js
var s = "leetcode";
var wordDict = ["leet", "code"];
console.log('Brute:', /* paste brute force function and call */);
console.log('Recursion:', /* paste recursion function and call */);
console.log('TopDown:', /* paste top-down function and call */);
console.log('BottomUp:', /* paste bottom-up function and call */);
```

---

## Presentation / demonstration tips
- Use small strings like `"cats"`, `"leetcode"`, `"applepenapple"` to show the difference.
- For brute force: show full recursion tree (text or sketch) to emphasize exponential branches.
- For top-down: show tree again but gray-out subtrees pruned by memo (show dp values as they fill).
- For bottom-up: show `dp` array after each `i` iteration to visualize progress.
- Logging: insert `console.log` inside `fn` (pos or remS) showing `pos`, `substr`, and `dp` state for live demo.

---

## Summary
- Start with brute to communicate the idea: try every cut.
- Move to recursion with index to avoid repeated substring allocations.
- Add memo (top-down) to prune repeated states — huge speedup.
- Bottom-up is a table-based view that's intuitive for demonstrations and easy to visualize.

---

*End of notes.*


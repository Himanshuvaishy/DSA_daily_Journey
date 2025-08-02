
# 🧠 Two Sum Problem - JavaScript Solutions

This markdown file covers all major approaches to solving the classic Two Sum problem in JavaScript, from brute-force to optimal one-pass solution using `Map`.

---

## ✅ Problem Statement

Given an array of integers `nums` and an integer `target`, return **indices** of the two numbers such that they add up to the target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:
```js
Input: nums = [2, 7, 11, 15], target = 9  
Output: [0, 1]
```

---

## 🔴 1. Brute Force Approach

```js
var twoSum = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
};
```

- **Time Complexity:** O(n²)
- **Space Complexity:** O(1)

---
💡 Intuition: Why Find a Complement?
Let's say you're given:

js
Copy
Edit
arr = [2, 7, 11, 15], target = 9
You're looking for two numbers that add up to 9.

Instead of checking every possible pair (which is what brute force does), you ask:

"If I already know one number, what number do I need to complete the sum?"

That needed number is called the complement.

🧠 Real-World Analogy
Imagine you're at a party and you want to find a person whose age, when added to yours, equals 50.

You don’t check every person one by one with everyone else.

Instead, you go around saying:

"I’m 30 → I need someone who is 20."

"I’m 25 → I need someone who is 25."

So every time you meet someone, you check:
"Have I already seen the person who completes my sum?"

🔁 Applying to Code
Let’s walk through the one-pass logic:

js
Copy
Edit
let map = new Map();
for (let i = 0; i < arr.length; i++) {
    let pairToFind = target - arr[i];

    if (map.has(pairToFind)) {
        return [map.get(pairToFind), i];
    }

    map.set(arr[i], i);
}
Step-by-step:
You're at index i, value = arr[i].

You ask:
👉 “What number do I need to reach the target?” → pairToFind = target - arr[i]

You look into the map:
👉 “Have I already seen pairToFind before?”

If yes, you found the pair:
👉 Return their indices.

If not, save the current number and its index for future use.

🔁 Example:
js
Copy
Edit
arr = [2, 7, 11, 15], target = 9
i	arr[i]	pairToFind	map before check	Found?
0	2	9 - 2 = 7	{}	❌ No
1	7	9 - 7 = 2	{2: 0}	✅ Yes! → [0, 1]

🧠 Why It’s Efficient:
Each element is checked once.

You always ask:
"Can this number complete a pair with someone I’ve already seen?"

That’s why we search first, then insert into the map.

✅ Key Takeaway:
The complement is your missing puzzle piece.
You don’t need to compare every pair—just store what you’ve seen, and ask:
“What do I need to complete the sum?”

## 🟠 2. Using Plain Object (Two-Pass)

```js
var twoSum = function(arr, target) {
    let map = {};

    for (let i = 0; i < arr.length; i++) {
        map[arr[i]] = i;
    }

    for (let i = 0; i < arr.length; i++) {
        let pairToFind = target - arr[i];
        if (map[pairToFind] !== undefined && map[pairToFind] !== i) {
            return [i, map[pairToFind]];
        }
    }
};
```

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)
- ⚠️ Be careful with falsy values like 0

---

## 🟡 3. Using JavaScript Map Class (Two-Pass)

```js
var twoSum = function(arr, target) {
    let map = new Map();

    for (let i = 0; i < arr.length; i++) {
        map.set(arr[i], i);
    }

    for (let i = 0; i < arr.length; i++) {
        let pairToFind = target - arr[i];
        if (map.has(pairToFind) && map.get(pairToFind) !== i) {
            return [i, map.get(pairToFind)];
        }
    }
};
```

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)
- ✅ Safer and cleaner than using plain object

---

## 🟢 4. One-Pass Optimal Solution using Map

```js
var twoSum = function(arr, target) {
    let map = new Map();

    for (let i = 0; i < arr.length; i++) {
        let pairToFind = target - arr[i];
        if (map.has(pairToFind)) {
            return [map.get(pairToFind), i];
        }
        map.set(arr[i], i);
    }
};
```

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)
- ✅ Most efficient and cleanest solution
🔁 Explanation (One-pass approach):
At each index i, you're:

Checking if the complement (i.e., target - arr[i]) is already in the map.

Then adding arr[i] to the map after the check.

🧠 Intuition:
Since you're only adding the current value to the map after checking for its pair, it's impossible for the map to contain the current index i as a pair before that point.

⚡ So, no chance of matching with itself.
✅ Example:
Let’s dry run arr = [1, 2, 3, 0], target = 1

i	arr[i]	pairToFind	map	Action
0	1	0	{}	Not in map
{ 1: 0 }	Add to map
1	2	-1	{ 1: 0 }	Not in map
{ 1: 0, 2: 1 }	Add to map
2	3	-2	{ 1: 0, 2: 1 }	Not in map
{ 1: 0, 2: 1, 3: 2 }	Add to map
3	0	1	{ 1: 0, 2: 1, 3: 2 }	✅ Found! return [3, 0]

No way it could return [3, 3] or match with itself.

✅ Summary:
You check for the pair before inserting the current value.

So you never match with yourself, and i !== map[...] check is unnecessary.
---

## ✅ Summary

| Approach        | Time Complexity | Space Complexity | Notes                         |
|----------------|------------------|------------------|-------------------------------|
| Brute Force     | O(n²)            | O(1)             | Simple but inefficient        |
| Plain Object    | O(n)             | O(n)             | Works but needs caution       |
| JS `Map` Class  | O(n)             | O(n)             | Safe and clean                |
| One-Pass `Map`  | O(n)             | O(n)             | 🔥 Optimal and recommended     |

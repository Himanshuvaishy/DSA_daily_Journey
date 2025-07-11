✅ Problem: Valid Anagram

Determine if two strings are anagrams of each other. Two strings are anagrams if they contain the same characters in the same frequency.

🔹 Approach 1: Using Map (without deleting keys)

var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

    let map = new Map();

    for (let ch of s) {
        map.set(ch, (map.get(ch) || 0) + 1);
    }

    for (let ch of t) {
        if (!map.has(ch) || map.get(ch) === 0) {
            return false;
        }
        map.set(ch, map.get(ch) - 1);
    }

    return true;
};

✅ Time Complexity:

O(n) where n is the length of the strings

✅ Space Complexity:

O(n) for the frequency map

🔹 Approach 2: Using Map (with deleting keys when count becomes 0)

var isAnagram = function(s, t) {
    if (s.length !== t.length) return false;

    let map = new Map();

    for (let ch of s) {
        map.set(ch, (map.get(ch) || 0) + 1);
    }

    for (let ch of t) {
        if (!map.has(ch)) return false;

        map.set(ch, map.get(ch) - 1);
        if (map.get(ch) === 0) {
            map.delete(ch);
        }
    }

    return map.size === 0;
};

✅ Time Complexity:

O(n)

✅ Space Complexity:

Still O(n) — but map size reduces as we go

🔍 Key Line Explanation

map.set(ch, (map.get(ch) || 0) + 1);

If the character ch is not yet in the map, map.get(ch) returns undefined

undefined || 0 evaluates to 0

Add 1 → stores the updated frequency

🎯 Summary

Feature

Approach 1 (No delete)

Approach 2 (With delete)

Simplicity

✅ Simpler

❌ Slightly more verbose

Cleanup

❌ Leaves 0 values

✅ Cleans map with delete

Final check

No need

map.size === 0


# ✅ String Problems Summary (Approaches + Concepts)

---

## 1. 🔁 Valid Palindrome – Approach 1 (Extra Space)
- **Idea:** Remove non-alphanumeric chars and compare reversed string.
- **Steps:**
  - Sanitize input using regex.
  - Convert to lowercase.
  - Reverse and compare.
- **Time:** O(n)
- **Space:** O(n)

---

## 2. 🔁 Valid Palindrome – Approach 2 (Two Pointers)
- **Idea:** Use two pointers from start and end.
- **Steps:**
  - Skip non-alphanumeric using regex or manual check.
  - Compare `s[left]` and `s[right]`.
- **Time:** O(n)
- **Space:** O(1)

---

## 3. 🔢 Largest Odd Number in a String
- **Idea:** Traverse from right and return substring ending with first odd digit.
- **Steps:**
  - Loop from end of string.
  - Check if char is odd using `parseInt(c) % 2 !== 0`.
- **Time:** O(n)
- **Space:** O(1)

---

## 4. 🔡 Longest Common Prefix
- **Idea:** Use horizontal scanning across all strings.
- **Steps:**
  - Start with first word.
  - Shrink prefix if mismatch occurs.
- **Time:** O(n * m)
- **Space:** O(1)

---

## 5. 🔁 Valid Anagram
- **Idea:** Count characters in both strings.
- **Steps:**
  - Frequency map or array of 26.
  - Compare counts.
- **Time:** O(n)
- **Space:** O(1) or O(n) for map

---

## 6. 🔁 Isomorphic Strings
- **Idea:** Maintain two maps s → t and t → s.
- **Steps:**
  - Traverse both strings.
  - Ensure one-to-one mapping is consistent.
- **Time:** O(n)
- **Space:** O(n)

---

## 7. 🔠 Group Anagrams – Approach 1 (Sorted Key)
- **Idea:** Use sorted string as key in map.
- **Steps:**
  - Sort characters of each string.
  - Group by sorted key.
- **Time:** O(n * k log k)
- **Space:** O(n)

---

## 8. 🧮 Group Anagrams – Approach 2 (Hashed Key)
- **Idea:** Use char frequency array as key.
- **Steps:**
  - Build freq array (size 26).
  - Convert to string key (e.g., #1#0#0#0...).
- **Time:** O(n * k)
- **Space:** O(n)

---

🧠 These problems sharpen your skills on:
- Frequency counting
- Hash maps
- Two-pointer technique
- Sorting and hashing for grouping
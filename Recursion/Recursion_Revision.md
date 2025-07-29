# 🔁 Recursion Revision

## 🔹 What is Recursion?
**Recursion** is a process in which a function **calls itself** directly or indirectly to solve a smaller version of a larger problem.

---

## 🔹 Structure of a Recursive Function
Every recursive function has:
1. **Base Case** – the condition to stop recursion.
2. **Recursive Case** – the part where the function calls itself.

```java
// Example: Factorial
int factorial(int n) {
    if (n == 0) return 1; // base case
    return n * factorial(n - 1); // recursive case
}
```

---

## 🔹 Key Concepts

| Concept        | Description |
|----------------|-------------|
| **Base Case**  | Stops the recursion. Prevents infinite loops. |
| **Stack Memory** | Each function call is stored in the stack. Deep recursion can cause a stack overflow. |
| **Recursive Tree** | Visualize recursive calls like a tree branching down. |
| **Backtracking** | After hitting the base case, the function backtracks and resolves pending calls. |

---

## 🔹 Types of Recursion

1. **Tail Recursion** – Recursive call is the last statement.
2. **Head Recursion** – Recursive call happens before any processing.
3. **Tree Recursion** – Function calls itself more than once per call.
4. **Indirect Recursion** – A calls B, B calls A.
5. **Nested Recursion** – Recursive call inside another recursive call.

---

## 🔹 Example Problems

| Problem                | Type               |
|------------------------|--------------------|
| Factorial              | Simple recursion   |
| Fibonacci Numbers      | Tree recursion     |
| Power Calculation      | Tail recursion     |
| Binary Search          | Divide & Conquer   |
| Tower of Hanoi         | Classic recursion  |
| Backtracking Problems  | Advanced recursion |

---

## 🔹 Common Mistakes to Avoid

- Not writing a base case (causes infinite recursion).
- Incorrect base case condition.
- Not reducing the problem (no progress to base case).

---

## 🔹 Practice Problems

1. Print numbers from `n` to `1` (and reverse).
2. Sum of first `n` natural numbers.
3. Check if a string is a palindrome.
4. Reverse an array using recursion.
5. Generate all subsets/subsequences of a string.
6. Permutations of a string.
7. N-Queens Problem (Backtracking).

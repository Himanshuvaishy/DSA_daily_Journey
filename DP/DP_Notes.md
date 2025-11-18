``` js 
📘 Dynamic Programming (DP) – Complete Notes
📌 Introduction

Dynamic Programming (DP) is an optimization technique and an algorithmic paradigm created by Richard Bellman in the 1950s.

DP helps solve complex problems efficiently by:

Breaking a large problem into smaller subproblems

Solving each subproblem exactly once

Storing the results

Reusing stored values instead of recalculating

DP = Intelligent Laziness

Don’t repeat work. Solve once → store → reuse.

📌 Why Dynamic Programming?

Brute force recalculates the same subproblems again and again.

DP avoids this by using storage (array, object, map).

DP saves time by:

Eliminating repeated calculations

Using results directly from memory

Reducing exponential algorithms to polynomial or linear time

📌 Real-Life Uses of DP

Google Maps shortest route

DNA Sequence Matching

String Alignment Algorithms

Stock Price Prediction

Video Games Pathfinding / AI

📌 Conditions for DP

A problem can be solved using DP if it has:

1️⃣ Overlapping Subproblems

The same smaller subproblems appear repeatedly.

Example: Fibonacci
Fib(3) appears multiple times in recursive tree.

2️⃣ Optimal Substructure

Solution to a problem can be built from solutions to its subproblems.

Example:
Fib(n) = Fib(n-1) + Fib(n-2)

If both conditions are satisfied → DP is valid.

📌 DP vs Greedy
Greedy	DP
Chooses best local option	Checks all possibilities
Fast but may fail	Always correct for DP problems
No memory	Uses memory
Simple	Structured approach
🧠 Fibonacci – The Classic DP Example
❌ Naive Recursion
Fib(n) = Fib(n-1) + Fib(n-2)


This has O(2ⁿ) time complexity — extremely slow for large n.

Because subproblems repeat:

Fib(5)
 ├─ Fib(4)
 │   ├─ Fib(3)
 │   └─ Fib(2)
 └─ Fib(3)

✔️ Top-Down Approach (Memoization)

Store results + recursion.

Code
let store = {};

var fib = function(n) {
    if (n <= 1) return n;

    if (!store[n]) {
        store[n] = fib(n - 1) + fib(n - 2);
    }

    return store[n];
};

📝 Dry Run for n = 5
Step-by-step:

fib(5) → computes fib(4) + fib(3)

fib(4) → computes fib(3) + fib(2)

fib(3) → computes fib(2) + fib(1)

fib(2) → computes fib(1) + fib(0) → stored as 1

Next time fib(2) is needed → value reused

Same for fib(3), fib(4), fib(5)

Final Answer: 5
Time Complexity: O(n)
Space Complexity: O(n) (recursion + store)
✔️ Bottom-Up Approach (Tabulation)

Build results iteratively.

Code
var fib = function(n) {
    let dp = [0, 1];

    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }

    return dp[n];
};

Time: O(n)
Space: O(n)

(No recursion → no stack issues)

📌 Top-Down vs Bottom-Up
Feature	Top-Down (Memoization)	Bottom-Up (Tabulation)
Uses	Recursion	Loops
Storage	Cache (object/map)	DP array
Risk	Stack overflow	No risk
Good for	Problems defined recursively	Straight iterative transitions
🎯 Summary of DP

Break problem into subproblems

Solve each subproblem once

Store results

Reuse stored results

Convert exponential algorithms into linear/polynomial

DP is simply optimized recursion
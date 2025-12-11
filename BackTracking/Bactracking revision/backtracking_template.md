```js

# Backtracking Problem Notes Template

1. Problem Statement
- Given:
- Return:
- Constraints:
- Type: (Subsets / Combinations / Permutations / Paths / Placement problems like N-Queens)

2. Intuition / Core Idea
- What decisions do we make at each step?
- What is the state of recursion? (path, index, visited, board…)
- What are the choices?
- When do we stop and record the answer?

3. Backtracking Definition for This Problem
State        =
Choices      =
Goal         =
Backtracking = choose → explore → un-choose

4. Backtracking Template
function backtrack(path, index) {
    if (/* base condition */) {
        ans.push([...path]);
        return;
    }

    for (let i = index; i < data.length; i++) {
        path.push(data[i]);       // choose
        backtrack(path, i + 1);   // explore
        path.pop();               // un-choose
    }
}

5. Decision Tree Diagram Example
        []
     /   |   \
   [1] [2] [3]

6. Dry Run
(Add small input dry run here)

7. Backtracking Patterns
- Subsets
- Permutations (visited[])
- Combination Sum
- N-Queens
- Maze / Paths

8. Edge Cases
- Empty input
- Duplicates
- Pruning needed
- Large n

9. Complexity
- Subsets → O(2^n)
- Permutations → O(n!)
- Combination sum → exponential

10. Summary
Short recap of approach.

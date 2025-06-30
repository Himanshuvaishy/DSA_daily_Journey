// ~Approach:
// *1. Compute the length of the list.
// *2. Adjust k using modulo: k = k % length.
//* 3. Use two pointers: move one k steps ahead, then move both until the first reaches the end.
// *4. Rewire the pointers to rotate the list, breaking it at the new tail.
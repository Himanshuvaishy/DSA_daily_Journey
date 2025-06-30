//~Approach:

// *Use a dummy node to simplify handling of the head.
// *Iterate through both lists and append the smaller value node to the merged list.
//* Once one list is exhausted, append the remaining part of the other list.
// *Return the merged list starting from dummy.next.
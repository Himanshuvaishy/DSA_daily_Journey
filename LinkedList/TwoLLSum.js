//*Q-Add Two Numbers Represented by Linked Lists?

// ?💡 Approach (Step-by-Step):
// Initialize:
// A dummy node to start building the result list.
// A current pointer to keep track of the last node.
// A carry variable to hold overflow from each digit addition.
// Traverse Both Lists:
// Loop while either l1, l2, or carry exists.
// Get Values:
// Use l1?.val || 0 and l2?.val || 0 to handle different lengths.
// Calculate Sum:
// sum = l1_val + l2_val + carry
// carry = Math.floor(sum / 10)
// digit = sum % 10
// Create New Node:
// Add digit as a new node to the result list.
// Move Pointers:
// Move l1, l2, and current to their next nodes.
// Return:
// Return dummy.next as the result (skipping the placeholder).

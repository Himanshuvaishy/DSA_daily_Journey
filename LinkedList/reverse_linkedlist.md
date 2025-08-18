
# Reverse Linked List in JavaScript

## Problem
Reverse a singly linked list.

---

## JavaScript Code

```javascript
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

function reverseLinkedList(head) {
    let prev = null;
    let curr = head;

    while (curr !== null) {
        let nextNode = curr.next; // store next
        curr.next = prev;         // reverse pointer
        prev = curr;              // move prev forward
        curr = nextNode;          // move curr forward
    }

    return prev; // new head
}
```

---

## Dry Run (Example: 1 -> 2 -> 3 -> 4 -> null)

### Initial State
```
head -> 1 -> 2 -> 3 -> 4 -> null
prev = null
curr = 1
```

### Step 1
- Store `nextNode = 2`
- Reverse `curr.next = prev` → 1 -> null
- Move `prev = 1`
- Move `curr = 2`

```
prev -> 1 -> null
curr -> 2 -> 3 -> 4 -> null
```

### Step 2
- Store `nextNode = 3`
- Reverse `curr.next = prev` → 2 -> 1 -> null
- Move `prev = 2`
- Move `curr = 3`

```
prev -> 2 -> 1 -> null
curr -> 3 -> 4 -> null
```

### Step 3
- Store `nextNode = 4`
- Reverse `curr.next = prev` → 3 -> 2 -> 1 -> null
- Move `prev = 3`
- Move `curr = 4`

```
prev -> 3 -> 2 -> 1 -> null
curr -> 4 -> null
```

### Step 4
- Store `nextNode = null`
- Reverse `curr.next = prev` → 4 -> 3 -> 2 -> 1 -> null
- Move `prev = 4`
- Move `curr = null`

```
prev -> 4 -> 3 -> 2 -> 1 -> null
curr = null
```

### End
- `curr = null`, loop ends.
- `prev` is the new head of the reversed list.

```
Final Linked List: 4 -> 3 -> 2 -> 1 -> null
```

### Brute force 

``` Node class
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// LinkedList class
class LinkedList {
  constructor() {
    this.head = null;
  }

  // Insert node at end
  insert(value) {
    let newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Traverse and store in array
  toArray() {
    let arr = [];
    let current = this.head;
    while (current) {
      arr.push(current.value);
      current = current.next;
    }
    return arr;
  }

  // Print reversed using array
  printReversed() {
    let arr = this.toArray();
    let reversed = arr.reverse();
    console.log("Reversed Linked List:", reversed.join(" -> "));
  }
}

// Usage
let list = new LinkedList();
list.insert(10);
list.insert(20);
list.insert(30);
list.insert(40);

console.log("Original Linked List:", list.toArray().join(" -> "));
list.printReversed();
```

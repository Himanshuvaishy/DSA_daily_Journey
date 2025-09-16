# 📌 Priority Queue Implementations

A **Priority Queue (PQ)** is a special type of queue where elements are served **based on priority**, not arrival order.  

---

## 🏥 Real-Life Example
- Patient A → Fever (priority 1)  
- Patient B → Accident (priority 5)  
- Patient C → Headache (priority 3)  

**Normal Queue (FIFO):** A → B → C  
**Priority Queue:** B → C → A  

---

# 1️⃣ Priority Queue using **Sorting**

### Idea
- Store elements in an array.  
- On **enqueue**, insert element and **sort array** by priority (descending).  
- On **dequeue**, remove the first element (highest priority).  

### Code (JavaScript)
```js
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(value, priority) {
        this.queue.push({ value, priority });
        this.queue.sort((a, b) => b.priority - a.priority); // Highest priority first
    }

    dequeue() {
        return this.queue.shift();  // Remove first element
    }

    peek() {
        return this.queue[0];
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

// Demo
const pq = new PriorityQueue();
pq.enqueue("Fever", 1);
pq.enqueue("Accident", 5);
pq.enqueue("Headache", 3);

console.log(pq.dequeue());  // { value: 'Accident', priority: 5 }
console.log(pq.dequeue());  // { value: 'Headache', priority: 3 }
console.log(pq.dequeue());  // { value: 'Fever', priority: 1 }
```

### Time Complexity
- **Enqueue:** `O(n log n)` (due to sorting)  
- **Dequeue:** `O(1)`  
- **Peek:** `O(1)`  

⚠️ Not efficient for large data sets.  

---

# 2️⃣ Priority Queue using **Max Heap**

### Idea
- Use a **Max Heap** where the highest priority is always at the root.  
- On **enqueue**, insert element and bubble up (heapify up).  
- On **dequeue**, remove root, replace with last element, and bubble down (heapify down).  

### Code (JavaScript)
```js
class MaxPriorityQueue {
    constructor() {
        this.heap = [];
    }

    enqueue(value, priority) {
        this.heap.push({ value, priority });
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (this.heap[index].priority <= this.heap[parent].priority) break;
            this.swap(index, parent);
            index = parent;
        }
    }

    dequeue() {
        if (this.heap.length === 0) return null;
        const max = this.heap[0];
        const end = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.heapifyDown();
        }
        return max;
    }

    heapifyDown() {
        let index = 0;
        let length = this.heap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let largest = index;

            if (left < length && this.heap[left].priority > this.heap[largest].priority) {
                largest = left;
            }
            if (right < length && this.heap[right].priority > this.heap[largest].priority) {
                largest = right;
            }
            if (largest === index) break;
            this.swap(index, largest);
            index = largest;
        }
    }

    front() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

// Demo
const maxPQ = new MaxPriorityQueue();
maxPQ.enqueue("Fever", 1);
maxPQ.enqueue("Accident", 5);
maxPQ.enqueue("Headache", 3);

console.log(maxPQ.dequeue());  // { value: 'Accident', priority: 5 }
console.log(maxPQ.dequeue());  // { value: 'Headache', priority: 3 }
console.log(maxPQ.dequeue());  // { value: 'Fever', priority: 1 }
```

### Time Complexity
- **Enqueue:** `O(log n)`  
- **Dequeue:** `O(log n)`  
- **Peek:** `O(1)`  

✅ Efficient for large datasets.  

---

# 3️⃣ Priority Queue using **Min Heap**

### Idea
- Use a **Min Heap** where the smallest priority value is at the root.  
- On **enqueue**, bubble up.  
- On **dequeue**, remove root and bubble down.  

### Code (JavaScript)
```js
class MinPriorityQueue {
    constructor() {
        this.heap = [];
    }

    enqueue(value, priority) {
        this.heap.push({ value, priority });
        this.heapifyUp();
    }

    heapifyUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parent = Math.floor((index - 1) / 2);
            if (this.heap[index].priority >= this.heap[parent].priority) break;
            this.swap(index, parent);
            index = parent;
        }
    }

    dequeue() {
        if (this.heap.length === 0) return null;
        const min = this.heap[0];
        const end = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.heapifyDown();
        }
        return min;
    }

    heapifyDown() {
        let index = 0;
        let length = this.heap.length;
        while (true) {
            let left = 2 * index + 1;
            let right = 2 * index + 2;
            let smallest = index;

            if (left < length && this.heap[left].priority < this.heap[smallest].priority) {
                smallest = left;
            }
            if (right < length && this.heap[right].priority < this.heap[smallest].priority) {
                smallest = right;
            }
            if (smallest === index) break;
            this.swap(index, smallest);
            index = smallest;
        }
    }

    front() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

// Demo
const minPQ = new MinPriorityQueue();
minPQ.enqueue("Fever", 1);
minPQ.enqueue("Accident", 5);
minPQ.enqueue("Headache", 3);

console.log(minPQ.dequeue());  // { value: 'Fever', priority: 1 }
console.log(minPQ.dequeue());  // { value: 'Headache', priority: 3 }
console.log(minPQ.dequeue());  // { value: 'Accident', priority: 5 }
```

### Time Complexity
- **Enqueue:** `O(log n)`  
- **Dequeue:** `O(log n)`  
- **Peek:** `O(1)`  

✅ Efficient and widely used in algorithms like **Dijkstra’s shortest path**.  

---

# 📝 Summary Table

| Implementation   | Enqueue      | Dequeue      | Peek | Efficiency |
|------------------|-------------|--------------|------|-------------|
| **Sorting**      | `O(n log n)` | `O(1)`       | `O(1)` | ❌ Inefficient |
| **Max Heap**     | `O(log n)`  | `O(log n)`   | `O(1)` | ✅ Efficient |
| **Min Heap**     | `O(log n)`  | `O(log n)`   | `O(1)` | ✅ Efficient |

---

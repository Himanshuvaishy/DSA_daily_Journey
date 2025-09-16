# 📌 Priority Queue

A **Priority Queue** is a type of queue which serves elements **based on priority**, not by the order they were inserted.  

---

## 🏥 Real-Life Example: Hospital Queue
- Patient A → Fever  
- Patient B → Accident  
- Patient C → Headache  

**Normal Queue (FIFO):** A → B → C  
**Priority Queue (By Priority):** B → C → A  

👉 Higher the priority → faster it is processed.  

---

## ⚡ Use Cases
- CPU Scheduling  
- Cache Systems  
- Real-Time Systems  
- Dijkstra’s Algorithm (Shortest Path)  
- Event-driven simulations  

---

## 🛠 Implementation Approaches

### 1. Using Sorting
- Each time you insert, sort the list so the highest priority element is in front.

```js
priorityQueue.push(val);
priorityQueue.sort((a, b) => b - a);  // Descending order
```

**Time Complexity:**  
- Insertion = `O(n log n)` (due to sorting)  
- Deletion (pop from front) = `O(1)`  

⚠️ Not efficient.

---

### 2. Using Heap ✅ (Efficient Way)
- A **Heap** is a data structure (not the same as priority queue).  
- Priority Queue is an **Abstract Data Type**, and we **use Heap to implement it**.  

- **Max Heap** → Highest value = Highest priority.  
- **Min Heap** → Lowest value = Highest priority.  

**Time Complexity:**  
- Insertion = `O(log n)`  
- Deletion = `O(log n)`  

---

## 🔑 Types of Priority Queue
1. **Max Priority Queue** → Highest value = served first.  
2. **Min Priority Queue** → Lowest value = served first.  

---

## 💻 Language Implementations

### Java
```java
import java.util.PriorityQueue;
import java.util.Collections;

public class PriorityQueueExample {
    public static void main(String[] args){
        // Min-Heap (default)
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.add(5);
        minHeap.add(1);
        minHeap.add(8);
        System.out.println("Min-Heap Head: " + minHeap.peek()); // 1
        System.out.println("Removed: " + minHeap.poll());       // 1

        // Max-Heap using Comparator
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        maxHeap.add(5);
        maxHeap.add(1);
        maxHeap.add(8);
        System.out.println("Max-Heap Head: " + maxHeap.peek()); // 8
        System.out.println("Removed: " + maxHeap.poll());       // 8
    }
}
```

---

### Python

#### Using `heapq` (Min-Heap)
```python
import heapq

priority_queue = []

heapq.heappush(priority_queue, (2, "Task B"))
heapq.heappush(priority_queue, (1, "Task A"))
heapq.heappush(priority_queue, (3, "Task C"))

while priority_queue:
    priority, value = heapq.heappop(priority_queue)
    print(f"Processing task: {value} (Priority: {priority})")
```

#### Using `queue.PriorityQueue` (Thread-Safe)
```python
from queue import PriorityQueue

priority_queue = PriorityQueue()
priority_queue.put((2, "Task B"))
priority_queue.put((1, "Task A"))
priority_queue.put((3, "Task C"))

while not priority_queue.empty():
    priority, value = priority_queue.get()
    print(f"Processing task: {value} (Priority: {priority})")
```

---

### C++
```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
    priority_queue<int> pq; // Max-Heap by default

    pq.push(10);
    pq.push(30);
    pq.push(28);

    cout << "Top element: " << pq.top() << endl; // 30
    pq.pop();
    cout << "New top element: " << pq.top() << endl; // 28

    return 0;
}
```

---

### JavaScript
❌ No built-in Priority Queue or Heap.  
✅ Must implement manually or use third-party libraries.  

---

## 📝 Summary
- **Priority Queue ≠ Heap** (Heap is a DS, PQ is an ADT).  
- **Sorting Implementation:** Easy but slow (`O(n log n)`).  
- **Heap Implementation:** Efficient (`O(log n)` for insert & remove).  
- **Types:** Max Priority Queue & Min Priority Queue.  

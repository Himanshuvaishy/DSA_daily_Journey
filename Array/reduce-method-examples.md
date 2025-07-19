
# JavaScript Array `reduce()` Method

The `reduce()` method executes a reducer function on each element of the array, resulting in a single output value.

---

## Syntax

```
array.reduce(callback, initialValue)
```

- **callback**: Function to execute on each element.
- **initialValue**: Optional. Value to use as the first argument to the first call of the callback.

---

## 1. Sum of Array Elements

```js
const nums = [1, 2, 3, 4];

const sum = nums.reduce((acc, curr) => acc + curr, 0);

console.log(sum); // Output: 10
```

---

## 2. Finding Maximum Value

```js
const nums = [3, 6, 2, 9, 5];

const max = nums.reduce((acc, curr) => (curr > acc ? curr : acc), nums[0]);

console.log(max); // Output: 9
```

---

## 3. Counting Frequency of Elements

```js
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

const frequency = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});

console.log(frequency); 
// Output: { apple: 3, banana: 2, orange: 1 }
```

---

## 4. Flattening an Array

```js
const nested = [[1, 2], [3, 4], [5]];

const flat = nested.reduce((acc, curr) => acc.concat(curr), []);

console.log(flat); // Output: [1, 2, 3, 4, 5]
```

---

## 5. Removing Duplicates

```js
const nums = [1, 2, 2, 3, 4, 4, 5];

const unique = nums.reduce((acc, curr) => {
  if (!acc.includes(curr)) acc.push(curr);
  return acc;
}, []);

console.log(unique); // Output: [1, 2, 3, 4, 5]
```

---

## 6. Grouping by Property

```js
const people = [
  { name: 'Alice', age: 21 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 21 },
];

const grouped = people.reduce((acc, person) => {
  const age = person.age;
  if (!acc[age]) acc[age] = [];
  acc[age].push(person);
  return acc;
}, {});

console.log(grouped);
// Output:
// {
//   21: [ { name: 'Alice', age: 21 }, { name: 'Charlie', age: 21 } ],
//   25: [ { name: 'Bob', age: 25 } ]
// }
```

---

Happy coding!

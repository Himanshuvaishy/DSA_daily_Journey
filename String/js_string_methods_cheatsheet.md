# 📌 JavaScript String Methods – Quick Revision

⚡ Remember: **Strings are immutable** → you can’t change them directly, you always create a **new string**.

---

## 1. **Length**
Returns the number of characters in a string.
```js
let str = "JavaScript";
console.log(str.length); // 10
```

---

## 2. **Accessing Characters**
```js
let str = "Hello";
console.log(str[0]);  // "H"
console.log(str.charAt(1)); // "e"
console.log(str.charCodeAt(0)); // 72 (ASCII/Unicode value)
```

---

## 3. **Changing Case**
```js
let str = "Hello World";
console.log(str.toUpperCase()); // "HELLO WORLD"
console.log(str.toLowerCase()); // "hello world"
```

---

## 4. **Searching**
```js
let str = "JavaScript is awesome";

// indexOf → first occurrence
console.log(str.indexOf("a")); // 1

// lastIndexOf → last occurrence
console.log(str.lastIndexOf("a")); // 3

// includes → true/false
console.log(str.includes("awesome")); // true

// startsWith / endsWith
console.log(str.startsWith("Java")); // true
console.log(str.endsWith("awesome")); // true
```

---

## 5. **Extracting Part of String**
```js
let str = "Hello World";

// slice(start, end)
console.log(str.slice(0, 5)); // "Hello"

// substring(start, end)
console.log(str.substring(6, 11)); // "World"

// substr(start, length) [deprecated, but used]
console.log(str.substr(6, 5)); // "World"
```

---

## 6. **Replacing**
```js
let text = "I love JavaScript";

// replace → first match only
console.log(text.replace("JavaScript", "Python")); 
// "I love Python"

// replaceAll / regex with g
let str = "apple apple apple";
console.log(str.replace(/apple/g, "mango"));
// "mango mango mango"
```

---

## 7. **Splitting & Joining**
```js
let str = "a,b,c,d";
let arr = str.split(","); 
console.log(arr); // ["a", "b", "c", "d"]

let joined = arr.join("-");
console.log(joined); // "a-b-c-d"
```

---

## 8. **Trimming Spaces**
```js
let str = "   Hello JS   ";
console.log(str.trim());      // "Hello JS"
console.log(str.trimStart()); // "Hello JS   "
console.log(str.trimEnd());   // "   Hello JS"
```

---

## 9. **Padding**
```js
let str = "5";
console.log(str.padStart(3, "0")); // "005"
console.log(str.padEnd(3, "0"));   // "500"
```

---

## 10. **Repeating**
```js
let str = "Hi! ";
console.log(str.repeat(3)); // "Hi! Hi! Hi! "
```

---

## 11. **Template Literals (Backticks ` )**
Interpolation & multi-line strings:
```js
let name = "Himanshu";
let age = 22;

let intro = `My name is ${name} and I am ${age} years old.`;
console.log(intro);
// "My name is Himanshu and I am 22 years old."
```

---

## 12. **Escape Characters**
```js
let str = "He said, \"JavaScript is fun!\"";
console.log(str); // He said, "JavaScript is fun!"

let multiLine = "Hello\nWorld"; 
console.log(multiLine);
// Hello
// World
```

---

## 13. **Match (Regex)**
```js
let str = "abc123xyz";
console.log(str.match(/\d+/)); // ["123"]
```

---

# ⚠️ Things to Remember about Strings in JS
1. **Immutable** → Can’t change characters directly, always create new strings.  
   ```js
   let str = "Hello";
   str[0] = "J"; // ❌ doesn’t work
   str = "J" + str.slice(1); // ✅ "Jello"
   ```

2. **Unicode/UTF-16 based** → Some emojis or special characters take **2 code units**, so `str.length` may not match visible characters.  

3. **Primitive vs Object** → `"abc"` is a string primitive, but JS automatically wraps it in a `String` object when you call methods.

4. **Case-sensitive** → `"Hello" !== "hello"`

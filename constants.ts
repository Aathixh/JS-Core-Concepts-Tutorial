export interface ChallengeContent {
  question: string;
  codeSnippet?: string; // Optional code snippet for the question
  options: string[];
  correctAnswer: string;
}

export interface SectionContent {
  id: string;
  title: string;
  description: string[];
  code: string;
  challenge?: ChallengeContent;
}

export const SECTIONS_DATA: SectionContent[] = [
  {
    id: "intro",
    title: "Introduction to JavaScript",
    description: [
      "JavaScript is a high-level, Object-Oriented, Multi-paradigm programming language. It is one of the core technologies of the World Wide Web, alongside HTML and CSS, responsible for making web pages interactive.",
      "Originally created to run only in browsers, JavaScript can now be used on the server-side with environments like Node.js. It enables everything from simple DOM manipulation and form validation to complex applications and even mobile apps.",
    ],
    code: `// This is a comment. Code starts here!
console.log("Hello, World!");
// Open your browser's developer console (F12 or Cmd+Opt+J) 
// to see this message printed.`,
  },
  {
    id: "variables",
    title: "Variables",
    description: [
      "Variables are containers for storing data values. In JavaScript, we have three keywords to declare variables: `var`, `let`, and `const`.",
      "`let` and `const`, introduced in ES6, are block-scoped, meaning they are confined to the block (e.g., inside an `if` statement or `for` loop) they are defined in. `let` variables can be reassigned, while `const` variables cannot.",
      "You should almost always prefer `const` by default, and only use `let` when you know a variable needs to be reassigned. `var` is function-scoped and has some hoisting behaviors that can be tricky, so it is generally avoided in modern JS.",
    ],
    code: `// 'let' can be updated
let firstname = "Manas";
firstname = "Aathish"; // This is okay
console.log(firstname); // Outputs: "Aathish"

// 'const' cannot be reassigned
const language = "JavaScript";
// language = "Python"; // This would cause a TypeError

// 'const' with objects/arrays allows modification of contents
const person = { name: "Alex" };
person.name = "Jordan"; // This is okay
console.log(person.name); // Outputs: "Jordan"`,
    challenge: {
      question:
        "Which variable declaration allows a value to be reassigned but is block-scoped?",
      options: ["var", "let", "const", "static"],
      correctAnswer: "let",
    },
  },
  {
    id: "data-types",
    title: "Data Types",
    description: [
      "JavaScript has several primitive and complex data types. A variable can hold data of any type.",
      "Primitive types are immutable (cannot be altered) and include: `String`, `Number`, `BigInt` (for integers larger than the `Number` type can hold), `Boolean`, `undefined` (a variable that has been declared but not assigned a value), `null` (an intentional absence of value), and `Symbol` (for unique identifiers).",
      "The only complex data type is `Object`. Arrays and Functions are specialized types of objects.",
    ],
    code: `const aString = "I am a string";         // String
const aNumber = 42.5;                  // Number
const aBoolean = true;                 // Boolean
const isNull = null;                   // Null
let isUndefined;                       // Undefined
const aBigInt = 1234567890123456789012345678901234567890n; // BigInt (ES2020)
`,
    challenge: {
      question: "What will be the output of `typeof null`?",
      options: ["'null'", "'undefined'", "'object'", "'string'"],
      correctAnswer: "'object'",
    },
  },
  {
    id: "operators",
    title: "Operators",
    description: [
      "Operators are used to assign values, compare values, perform arithmetic operations, and more.",
      "Common types include Arithmetic (+, -, *, /), Assignment (=, +=), Comparison (>, <), and Logical (&& for AND, || for OR, ! for NOT).",
      "A key distinction is strict equality (`===`) versus loose equality (`==`). Strict equality compares both value and type, and is almost always what you want. Loose equality performs type coercion, which can lead to unexpected results.",
    ],
    code: `// Arithmetic Operators
let sum = 10 + 5; // 15

// Comparison Operators
console.log(10 === "10"); // false (strict equality checks type and value)
console.log(10 == "10");  // true (loose equality converts string to number)

// Logical Operators
const isMorning = true;
const isRaining = false;
if (isMorning && !isRaining) {
  console.log("It's a beautiful morning!");
}`,
    challenge: {
      question: "What is the result of the following expression?",
      codeSnippet: `true && (false || true)`,
      options: ["true", "false", "undefined", "Error"],
      correctAnswer: "true",
    },
  },
  {
    id: "control-statements",
    title: "Control Statements",
    description: [
      "Control statements allow you to control the flow of your program's execution, enabling you to run code conditionally or repeatedly.",
      "Conditional statements like `if...else` and `switch` decide which path to take based on a condition. Loops like `for`, `while`, and `for...of` execute a block of code multiple times. `for` loops are great when you know the number of iterations, while `while` loops are useful when the loop continues as long as a condition is true.",
    ],
    code: `// Conditional (if/else)
      
const afroz_KnowJavaScript = true;

if (afroz_KnowJavaScript) {
  console.log("Afroz will Pass the exam!");
} else {
  console.log("Afroz is not prepared for the exam!");
}

// For Loop - traditional counter-based loop

for (let i = 0; i < 3; i++) {
  console.log(\`Count: \${i}\`);
}

// While Loop - continues while condition is true

let count = 0;
while (count < 3) {
  console.log(\`While count: \${count}\`);
  count++;
}`,
    challenge: {
      question: "Which value of `i` will be the last one printed by this loop?",
      codeSnippet: `for (let i = 0; i < 5; i++) {
  console.log(i);
}`,
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
  },
  {
    id: "functions",
    title: "Functions",
    description: [
      "Functions are blocks of reusable code designed to perform a particular task. They help organize code into logical, manageable chunks.",
      'A function can be defined as a `function declaration` or a `function expression`. A major difference is that declarations are "hoisted" (moved to the top of their scope), so you can call them before they appear in the code.',
      "ES6 introduced `arrow functions`, which provide a more concise syntax and have a different behavior for the `this` keyword, which is a more advanced topic.",
    ],
    code: `// Function Declaration
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("Aathish")); // "Hello, Aathish!"

// Function Expression
const calcAge = function(birthYear) {
    return new Date().getFullYear() - birthYear;
}; 
console.log(calcAge(2004)); // Output: 21

// Arrow Function (ES6+)
const add = (a, b) => {
  return a + b;
};
console.log(add(5, 3));      // 8
// Implicit return for single expressions (even shorter)
const subtract = (a, b) => a - b;
console.log(subtract(5, 3)); // 2`,

    challenge: {
      question:
        "Which is the most concise, correct syntax for an arrow function that squares a number `x`?",
      options: [
        "const square = (x) => { x * x }",
        "const square = x => return x * x;",
        "let square(x) = x * x",
        "const square = x => x * x;",
      ],
      correctAnswer: "const square = x => x * x;",
    },
  },
  {
    id: "whats-next",
    title: "What's Next?",
    description: [
      "Congratulations! You've covered the absolute fundamentals of JavaScript. This is the foundation upon which everything else is built. From here, you can explore more advanced topics.",
      "Consider looking into the DOM (Document Object Model) to learn how JavaScript interacts with HTML to create dynamic web pages. After that, concepts like asynchronous JavaScript (Promises, async/await) are crucial for handling tasks like fetching data from servers.",
      "Once you're comfortable, you can dive into frameworks like React, Vue, or Svelte to build powerful, modern web applications. The journey is long but rewarding. Keep coding!",
    ],
    code: `/*
  Keep exploring these topics:
  
  1. DOM Manipulation (document.querySelector)
  2. Asynchronous JS (async/await, fetch)
  3. Array Methods (.map, .filter, .reduce)
  4. ES6+ Features (Destructuring, Spread/Rest)
  5. A JavaScript Framework (React, Vue, etc.)
*/

console.log("Happy Coding! ✨");`,
  },
];

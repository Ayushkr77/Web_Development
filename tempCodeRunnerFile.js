// ================================
// // ✅ PRIMITIVE DATA TYPES IN JS
// // ================================

// // 1️⃣ String (Text values)
// let name = "Ayush";
// let greeting = "Hello, World!";
// console.log(typeof name); // "string"

// // 2️⃣ Number (Integers & Floats)
// let age = 21;
// let price = 99.99;
// console.log(typeof age); // "number"

// // 3️⃣ Boolean (True/False)
// let isStudent = true;
// let isVerified = false;
// console.log(typeof isStudent); // "boolean"

// // 4️⃣ Undefined (Variable declared but not assigned a value)
// let x;
// console.log(x); // undefined
// console.log(typeof x); // "undefined"

// // 5️⃣ Null (Represents empty or unknown value)
// let emptyValue = null;
// console.log(emptyValue); // null
// console.log(typeof emptyValue); // "object" (JavaScript quirk)

// // 6️⃣ Symbol (Unique identifiers)
// let id1 = Symbol("id");
// let id2 = Symbol("id");
// console.log(id1 === id2); // false (Symbols are always unique)

// // 7️⃣ BigInt (For very large numbers)
// let bigNumber = 9007199254740991n;
// console.log(typeof bigNumber); // "bigint"




// // ================================
// // ✅ NON-PRIMITIVE DATA TYPES
// // ================================

// // 1️⃣ Object (Key-value pairs)
// let person = { name: "Ayush", age: 21, isStudent: true };
// console.log(person.name); // "Ayush"
// console.log(typeof person); // "object"

// // 2️⃣ Array (Ordered list of values)
// let numbers = [1, 2, 3, 4, 5];
// console.log(numbers[0]); // 1. Also try out of bounds, it will give undefined
// console.log(typeof numbers); // "object"

// // 3️⃣ Function (Reusable block of code)
// function greet(name) {
//   return "Hello, " + name;
// }
// console.log(greet("Ayush")); // "Hello, Ayush"
// console.log(typeof greet); // "function"

// // 4️⃣ Date Object (For handling dates & time)
// let currentDate = new Date();
// console.log(currentDate); // Displays current date & time
// console.log(typeof currentDate); // "object"



// // ✅ Array with different data types, including a nested object
// let mixedArray = [
//     "Hello",  // String
//     42,       // Number
//     {         // Object
//       name: "Ayush",
//       details: {
//         age: 21,
//         city: "Delhi"
//       }
//     }
//   ];
  
//   // ✅ Accessing elements
//   console.log(mixedArray[0]); // "Hello"
//   console.log(mixedArray[1]); // 42
//   console.log(mixedArray[2].name); // "Ayush"
//   console.log(mixedArray[2].details.age); // 21 (Accessing nested object property)
//   console.log(mixedArray[2].details.city); // "Delhi"
  


// const users=[{
//     name:"Ayush",
//     age:21,
//     },
//     {
//         name:"Rahul",
//         age:25,
//     }
// ]
// // const temp=users.filter((x)=>{
// //     return x.age>21;
// // })
// const temp=users.filter(x=>{
//     return x.age>21;
// })
// const temp2=users.map(x=> {
//     return x.name;
// })
// const totalAge = users.reduce((i, x) => {
//     return i + x.age;
// }, 0);
// const temp3 = users.map(() => "default value");
// console.log(users);
// console.log(temp);
// console.log(temp2);
// console.log(temp3); // ["default value", "default value"]
// console.log(totalAge); // 46



// const filteredUsers = users.filter(user => user.age > 21);
// const userNames = users.map(user => user.name);
// const userCount = users.reduce(acc => acc + 1, 0);
// console.log(filteredUsers);
// console.log(userNames);  // ["Rahul"]
// console.log(userCount);  // 1



// const arr=[{
//     id:1,
//     todo:"breakfast"
// },
// {
//     id:2,
//     todo:"lunch"
// },
// {
//     id:3,
//     todo:"dinner"
// }];
// const arr2=arr.filter(x=>{
//     return x.id!=3;
// })
// console.log(arr2);


// function sum(a,b) {
//     return a+b;
// }
// function sum1(a,b) {
//     return parseInt(a)+parseInt(b);
// }
// console.log(sum(20,30));
// console.log(sum("20",30));
// console.log(sum1("20",30));




// // Can also take a and b as input

// // For Browser(Using prompt) 
// // function add(a, b) {
// //     return a + b;
// // }
// // // Taking input from user
// // let a = prompt("Enter first number:");
// // let b = prompt("Enter second number:");
// // console.log(add(a, b));  // Might concatenate if input is a string


// // For Node.js (Using readline)
// const readline = require("readline");
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// function add(a, b) {
//     return a + b;
// }
// function add1(a, b) {
//     return parseInt(a) + parseInt(b);
// }
// rl.question("Enter first number: ", (a) => {
//     rl.question("Enter second number: ", (b) => {
//         console.log("sum:", add(a, b));   // Might concatenate
//         console.log("sum1:", sum1(a, b)); // Ensures numeric addition
//         rl.close();
//     });
// });



// // Assignment 1
// // Try to create a promisified version of:
// // setTimeout
// // fetch
// // fs.readFile






// // Map Function
// const arr1=[1,2,3,4,5];
// const transform=(i)=> {
//     return i*2;
// }
// // const arrMap=arr1.map((x)=>x*2);
// // const arrMap=arr1.map(transform);
// const arrMap=arr1.map((i)=> {
//     return i*2;
// })
// console.log(arrMap); 

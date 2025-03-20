// ================================
// ✅ PRIMITIVE DATA TYPES IN JS
// ================================

// 1️⃣ String (Text values)
let name = "Ayush";
let greeting = "Hello, World!";
console.log(typeof name); // "string"

// 2️⃣ Number (Integers & Floats)
let age = 21;
let price = 99.99;
console.log(typeof age); // "number"

// 3️⃣ Boolean (True/False)
let isStudent = true;
let isVerified = false;
console.log(typeof isStudent); // "boolean"

// 4️⃣ Undefined (Variable declared but not assigned a value)
let x;
console.log(x); // undefined
console.log(typeof x); // "undefined"

// 5️⃣ Null (Represents empty or unknown value)
let emptyValue = null;
console.log(emptyValue); // null
console.log(typeof emptyValue); // "object" (JavaScript quirk)

// 6️⃣ Symbol (Unique identifiers)
let id1 = Symbol("id");
let id2 = Symbol("id");
console.log(id1 === id2); // false (Symbols are always unique)

// 7️⃣ BigInt (For very large numbers)
let bigNumber = 9007199254740991n;
console.log(typeof bigNumber); // "bigint"




// ================================
// ✅ NON-PRIMITIVE DATA TYPES
// ================================

// 1️⃣ Object (Key-value pairs)
let person = { name: "Ayush", age: 21, isStudent: true };
console.log(person.name); // "Ayush"
console.log(typeof person); // "object"

// 2️⃣ Array (Ordered list of values)
let numbers = [1, 2, 3, 4, 5];
console.log(numbers[0]); // 1. Also try out of bounds, it will give undefined
console.log(typeof numbers); // "object"

// 3️⃣ Function (Reusable block of code)
function greet(name) {
  return "Hello, " + name;
}
console.log(greet("Ayush")); // "Hello, Ayush"
console.log(typeof greet); // "function"

// 4️⃣ Date Object (For handling dates & time)
let currentDate = new Date();
console.log(currentDate); // Displays current date & time
console.log(typeof currentDate); // "object"



// ✅ Array with different data types, including a nested object
let mixedArray = [
    "Hello",  // String
    42,       // Number
    {         // Object
      name: "Ayush",
      details: {
        age: 21,
        city: "Delhi"
      }
    }
  ];
  
  // ✅ Accessing elements
  console.log(mixedArray[0]); // "Hello"
  console.log(mixedArray[1]); // 42
  console.log(mixedArray[2].name); // "Ayush"
  console.log(mixedArray[2].details.age); // 21 (Accessing nested object property)
  console.log(mixedArray[2].details.city); // "Delhi"
  


const users=[{
    name:"Ayush",
    age:21,
    },
    {
        name:"Rahul",
        age:25,
    }
]
// const temp=users.filter((x)=>{
//     return x.age>21;
// })
const temp=users.filter(x=>{
    return x.age>21;
})
const temp2=users.map(x=> {
    return x.name;
})
const totalAge = users.reduce((i, x) => {
    return i + x.age;
}, 0);
const temp3 = users.map(() => "default value");
console.log(users);
console.log(temp);
console.log(temp2);
console.log(temp3); // ["default value", "default value"]
console.log(totalAge); // 46



const filteredUsers = users.filter(user => user.age > 21);
const userNames = users.map(user => user.name);
const userCount = users.reduce(acc => acc + 1, 0);
console.log(filteredUsers);
console.log(userNames);  // ["Rahul"]
console.log(userCount);  // 1



const arr=[{
    id:1,
    todo:"breakfast"
},
{
    id:2,
    todo:"lunch"
},
{
    id:3,
    todo:"dinner"
}];
const arr2=arr.filter(x=>{
    return x.id!=3;
})
console.log(arr2);


function sum(a,b) {
    return a+b;
}
function sum1(a,b) {
    return parseInt(a)+parseInt(b);
}
console.log(sum(20,30));
console.log(sum("20",30));
console.log(sum1("20",30));




// Can also take a and b as input

// For Browser(Using prompt) 
// function add(a, b) {
//     return a + b;
// }
// // Taking input from user
// let a = prompt("Enter first number:");
// let b = prompt("Enter second number:");
// console.log(add(a, b));  // Might concatenate if input is a string


// For Node.js (Using readline)
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function add(a, b) {
    return a + b;
}
function add1(a, b) {
    return parseInt(a) + parseInt(b);
}
rl.question("Enter first number: ", (a) => {
    rl.question("Enter second number: ", (b) => {
        console.log("sum:", add(a, b));   // Might concatenate
        console.log("sum1:", sum1(a, b)); // Ensures numeric addition
        rl.close();
    });
});



// Assignment 1
// Try to create a promisified version of:
// setTimeout
// fetch
// fs.readFile






// Map Function
const arr1=[1,2,3,4,5];
const transform=(i)=> {
    return i*2;
}
// const arrMap=arr1.map((x)=>x*2);
// const arrMap=arr1.map(transform);
const arrMap=arr1.map((i)=> {
    return i*2;
})
console.log(arrMap); 



// Filter
const arrN=[1,2,3,4,5,6];
const check=(i)=> {
    return i%2==0;
}
const arrAns=arrN.filter(check);
console.log(arrAns);

const arrS=["Ayush","Aman","Shresth"];
const ansArr=arrS.filter((i)=> {
    return i.startsWith("A");
})
console.log(ansArr);  










// Axios and Fetch
// 2 popular ways to hit a backend server and get response
// Axios is a library that makes it easy to send HTTP requests
// Fetch is a built in function in JavaScript that can be used to send HTTP requests

// 1. Fetch returns a Promise of a Response object: The fetch() method returns a Promise that resolves to a Response object, which you must process manually (e.g., using .json() or .text() to read the body). So fetch() gives you the raw Response, and you extract the actual data yourself.
// 2. Axios returns a Promise of a data object (already processed): The axios.get() method returns a Promise that resolves to a response object where the data is already parsed (no need to manually call .json()).


// FETCH
// Using promise
function main() {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(async (response)=> {
        const data=await response.json();
        console.log(data);
        console.log(data.length);
    })
}
// Same above function Using async/await
async function main1() {
    const response=await fetch("https://jsonplaceholder.typicode.com/posts");
    const data=await response.json();
    console.log(data);
    console.log(data.length);
}

// POST,... other methods in fetch. Here in below code instead the mehid is POST but the thing we are doing is of GET only bcz we are not sending any data to the server. Not recommended bcz always use GET for fetching data and use POST when you’re creating/sending data to the server
async function main2() {
    const response=await fetch("https://jsonplaceholder.typicode.com/posts", {
        method:"POST"  // GET by default
    });
    const data=await response.json();
    console.log(data);
    console.log(data.length);
}

// Posting data to server. POST
// Couldnt understand properly
async function main3() {
    const response=await fetch("https://brainlyapi.surajv.me/api/v1/user/signup", {
        method:"POST",  // GET by default
        headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
        },
        body:JSON.stringify({    // body: only should work but error find out why
            "username":"ayush",
            "password":"surajgmailcom",
        })
    });
    const data=await response.text();
    console.log(data);
    console.log(data.length);
}

// main();
// main1();
// main2();
// main3();


// AXIOS
const axios = require('axios');
// Using promise
function main4() {
    axios.get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
            const data = response.data;
            console.log(data);
            console.log(data.length);
        })
        .catch((error) => console.error(error));
}

// Using async/await
async function main5() {
    try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
        const data = response.data;
        console.log(data);
        console.log(data.length);
    } catch (error) {
        console.error(error);
    }
}

// POST request but acting like a GET (no data sent)
async function main6() {
    try {
        const response = await axios.post("https://jsonplaceholder.typicode.com/posts");
        const data = response.data;
        console.log(data);
        console.log(Object.keys(data).length); // using Object.keys to get count
    } catch (error) {
        console.error(error);
    }
}

// Actual POST with data
async function main7() {
    try {
        const response = await axios.post("https://brainlyapi.surajv.me/api/v1/user/signup", 
            {   // 2nd parameter is data, no need to write body: like in fetch
                username: "ayushKrSinha",
                password: "surajgmailcom"
            }, 
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            }
        );

        const data = response.data;
        console.log(data);
        if (typeof data === "object") {
            console.log(Object.keys(data).length);
        } else {
            console.log(data.length);
        }
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
}

// main4();
// main5();
// main6();
main7();

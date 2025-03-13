// Reading file asynchronously

// Focus on the order of output of below given code
const fs=require("fs");
fs.readFile("a.txt","utf-8",function(err,data){  // if file is not present, Undefined
    if(err) {
        console.log(err);  // or console.log("File not found");
    }
    else {
        console.log(data.toString());
    }
})
function fun1(err,data) {
    console.log(data);
}
fs.readFile("b.txt","utf-8",fun1);  // can also pass as a function. Do not pass fun1(), pass it as fun1. fun1() executes immediately before fs.readFile() runs.The return value of fun1() (which is undefined in this case) is passed to fs.readFile(), which breaks the function call.
console.log("Done!");




// Another async code
console.log("Hi");
setTimeout(function() {
    console.log("This is timeout");
},5000);
console.log("Hello");




// Important. See the order of output. 
// The order should be Hi, Hello, This is timeout, Expensive Operation Done.
// But the output is Hi, Hello, Expensive Operation Done, This is timeout. Because
// JavaScript is single-threaded, meaning it executes one task at a time in the Call Stack.The Event Loop ensures that asynchronous callbacks (like setTimeout()) only execute when the Call Stack is empty.

console.log("Hi");
setTimeout(function() {
    console.log("This is timeout");
},1000);
console.log("Hello");
let c=0;
// Below for loop takes 3-4 seconds. CPU-intensive synchronous operation
for(i=0;i<100000000;i++) {
    c++;
}
console.log("Expensive Operation Done");

// 🔄 Step-by-Step Execution Flow
// 1️⃣ console.log("Hi"); → Executes immediately. ✅
// 2️⃣ setTimeout(function() {...}, 1000);
// The setTimeout function is called and registered with the Timer API.
// The function inside it (callback) is not executed immediately.
// Instead, the Timer starts counting down 1000ms (1 second) in the background.
// 3️⃣ console.log("Hello"); → Executes immediately. ✅
// 4️⃣ The for loop (for(i=0;i<100000000;i++)) starts.
// This blocks the Call Stack for 3-4 seconds because it is a CPU-intensive synchronous operation.
// 5️⃣ console.log("Expensive Operation Done"); → Runs only after the loop finishes. ✅
// 6️⃣ By this time, 1000ms (1 second) has already passed, so the callback from setTimeout() is waiting in the Callback Queue.
// 7️⃣ Event Loop checks if the Call Stack is empty.
// Once the loop and "Expensive Operation Done" are finished, the Call Stack becomes empty.
// The Event Loop picks the setTimeout() callback from the Callback Queue and executes it.
// 8️⃣ console.log("This is timeout"); → Executes last. ✅
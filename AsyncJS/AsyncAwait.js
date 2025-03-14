// // Async and Await syntax in JS provides a way to write asynchronous code that looks and behaves like synchronous code, making it easier to read and maintain.
// // It builds on top of promises and allows u to avoid chaining .then() and .catch() methods while still working with asynchronous operations.
// // async/await is essentially syntactic sugar on top of promises. Under the hood, async/await still uses Promises, but it makes asynchronous code look and behave more like synchronous code.
// // async → Declares a function that always returns a Promise.
// // await → Waits for a Promise to resolve before moving to the next line.

// // Same as the previous example in CallbackHell.js, but using async/await syntax
// function setTimeoutPromisified(duration) {
//     return new Promise((resolve) => {
//         setTimeout(resolve, duration);
//     });
// }
// async function runTimers() {
//     await setTimeoutPromisified(1000);
//     console.log("Timeout 1");
//     await setTimeoutPromisified(3000);
//     console.log("Timeout 2");
//     await setTimeoutPromisified(5000);
//     console.log("Timeout 3");
// }
// runTimers();
// console.log("This will be run first and then above code");







// // Example Without Async/Await (Using Promises)
// function fetchData() {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("Data fetched");
//         }, 2000);
//     });
// }
// fetchData().then((data) => console.log(data)); // "Data fetched" after 2 seconds

// // Example With Async/Await (Cleaner Code)
// async function getData() {
//     let data = await fetchData(); // Waits for fetchData() to resolve
//     console.log(data);
// }
// getData(); // "Data fetched" after 2 seconds

// // Step-by-Step Execution
// // The function getData() is marked as async, so it can use await.
// // await fetchData() pauses execution until fetchData() resolves.
// // Once resolved, data stores the resolved value, and console.log(data) prints it.


// // why do we need to handle asynchronous code and what is asynchronous code. Do chatGpt





// Promisified version of fs.readFile. 
// Make sure when u run this file u are in the current directory in terminal
const fs=require("fs");
function readFileAsync() {
    return new Promise(function(resolve, reject) {
        fs.readFile('a.txt', 'utf8', function(err, data) {
            if (err) {
                reject(err); // Reject the promise if an error occurs
            } 
            else {
                resolve(data); // Resolve with file content
            }
        });
    });
}
// Using async/await
async function readFile() {
    // Error handling in async await using try/catch
    try {
        let data = await readFileAsync();  // u can also pass it a.txt here like readFileAsync("a.txt"); then above readFileAsync(filePath) will have a parameter u can name it anything here named filePath and then in fs.readFile(filePath,'utf8',...)...
        console.log("File content:", data);
    } 
    catch (error) {
        console.error("Error reading file:", error);
    }
}
readFile();



// We use try catch in async await to handle errors and .catch in promises.
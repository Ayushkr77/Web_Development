// I/O heavy operations refer to tasks in a computer program that takes a lot of data transfer between the program and external systems or devices. 
// Involves extensive interaction with external systems like:
// File systems (reading/writing large files)
// Databases (fetching/updating large datasets)
// Network calls (API requests, fetching data from a server)
// User input (reading large inputs, handling multiple streams)

// Handling I/O Heavy Operations Efficiently:
// ✅ Use async/await or callbacks for I/O tasks.
// ✅ Use streams for large file operations.
// ✅ Use worker threads for CPU-intensive tasks.
// ✅ Optimize database queries using asynchronous drivers.


// Examples of I/O heavy operations:
// Reading a file, Starting a clock, HTTP Requests



// Reading file
const fs = require('fs');   // The fs (File System) module in Node.js is used to interact with the file system. It allows reading, writing, updating, deleting, and managing files and directories.
// Reading file synchronously
const data = fs.readFileSync('a.txt', 'utf8');  // Also try without writing utf8. UTF-8 (Unicode Transformation Format - 8 bit) is the most common character encoding used for representing text. It supports all characters from different languages, including emojis. 
console.log(data);



// Functional Arguments(Do chatGpt for detail)
// In JavaScript, functional arguments refer to passing functions as arguments to other functions. This enables callbacks, higher-order functions, and functional programming concepts.
function sum(a,b) {
    return a+b;
}
function doOperation(a,b,op) {
    return op(a,b);
}
console.log(doOperation(2,5,sum)); // Output: 7



// Concurrency Vs Parallelism(Do chatGpt for detail)
// Feature	                    Concurrency	                                Parallelism
// Execution	        Overlapping execution of tasks	                True simultaneous execution
// Threads	            Single-threaded (one task at a time)	        Multi-threaded (tasks run in parallel)
// Use Case	        Asynchronous programming, API calls	            CPU-intensive computations
// Example	            setTimeout(), Promise.all()	                    Worker Threads, Web Workers
// Real-life Analogy	A single chef preparing multiple dishes,	    Multiple chefs working on different dishes simultaneously
//                         switching between them




// Go to AsynchronousCode.js file
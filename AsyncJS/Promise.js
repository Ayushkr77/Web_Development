// Promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
// Promises are used to handle asynchronous operations more effectively than traditional callback functions, providing a cleaner and more manageable way to deal with code that executes asynchronously, such as API call, file I/O or timers.
// A promise is in one of these states: pending, fulfilled or rejected.

function setTimeoutPromisified(ms) {  // returns an object of promise class
    let p=new Promise(resolve=>setTimeout(resolve,ms));
    return p;
}
function callback() {
    console.log("3 seconds have passed"); 
}
setTimeoutPromisified(3000).then(callback);


let p=setTimeoutPromisified(3000);
console.log(p); // Promise { <pending> }



// Creating a promisified version of setTimeout
function waitFor3S(resolve) {
    setTimeout(resolve,3000);
}
function main() {
    console.log("Main is called");
}
waitFor3S(main);

// Another example of promisified timeout
function waitFor4S(resolve) {
    setTimeout(resolve,4000);
}
function setTimeoutPromisified1() {
    return new Promise(waitFor4S);
}
setTimeoutPromisified1().then(main);
// callback based approach is simple like setTimeout(main,4000). But this is promise based approach
// Promise.then() takes two arguments, a callback for success and another for failure. Both are optional, so you can add a callback for success or failure only.





// Understanding Promises from basic

function random(resolve) {  // resolve is also a function. Whenever resolve function is called, it will call whatever function is passed in .then
    // resolve();  // if we want to call resolve immediately. If u dont want to run it, then remove resolve then the function inside .then will never be called
    setTimeout(resolve,3000);
}
let p1=new Promise(random);  // Supposed to return u something. And when it'll return that thing will be decided by random function
function callback() {
    console.log("Promise succeeded");
}
p1.then(callback);  // if p1 succeeds then callback will be called, u can also further use catch finally




// Create promisified fs.readFile, fs.writeFile and cleanFile
// Couldnt understand below code, may be wrong code also
const fs = require('fs');
function readTheFile(anything) {
    fs.readFile("a.txt","utf-8", function(err,data) {
        anything(data);
    })
}
function readFile(fileName) {
    return new Promise(readTheFile);
}
const p2=readFile();
function callback1(contents) {
    console.log(contents);
}
p2.then(callback1);






// How does a promise class look like? Creating own promise class
// Couldnt understand :)
class Promise1 {
    constructor(fn) {
        this.fn=fn;
        this.fn(()=> {
            this.resolve();
        })
    }
    then(callback) {
        this.resolve=callback;
    }
}
function k(resolve) {
    setTimeout(function() {
        console.log("Callback based setTimeout completed");
        resolve();
    },3000);
}
function setTimeoutPromisified2() {
    return new Promise1(k);
}
let p3=setTimeoutPromisified2();
function callback2() {
    console.log("Callback has been called");
}
p3.then(callback2);





// Another example
// We can also pass something as parameter in resolve
function promiseFn(resolve) {
    let c=0;
    for(let i=0;i<10000000;i++) {
        c++;
    }
    resolve("Hello Ayush");
}
const p4=new Promise(promiseFn);
function callback3(str) {
    console.log(str);
}
p4.then(callback3);
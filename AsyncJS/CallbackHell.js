function setTimeoutPromisified(duration) {
    return new Promise(function(resolve) {
        setTimeout(resolve,duration);
    });
}
function callback() {
    console.log("Callback called");
}
setTimeoutPromisified(1000).then(callback);



// Callback Hell
// Callback Hell refers to a situation in JavaScript where nested callbacks make the code unreadable, difficult to manage, and hard to debug. This happens when multiple asynchronous operations are chained using callbacks, leading to deeply nested code that looks like a "pyramid of doom."
setTimeout(function() {
    console.log("Timeout 1");
    setTimeout(function() {
        console.log("Timeout 2");
        setTimeout(function() {
            console.log("Timeout 3");
        },5000);
    },3000);
},1000);



// Same Above code using promise chaining
function setTimeoutPromisified(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
}

setTimeoutPromisified(1000)
.then(() => {  // u can also pass function name here but here we have done it anonymously
    console.log("Timeout 1");
    return setTimeoutPromisified(3000);
})
.then(() => {
    console.log("Timeout 2");
    return setTimeoutPromisified(5000);
})
.then(() => {
    console.log("Timeout 3");
});



// Sort a string
let str1="Ayush";
console.log(str1.split("").sort().join(""));  // gets split into an array on whatever is passed inside it(here an empty space), then sort the array, now join the array back into a string with whatever is passed inside it(here an empty space). If join("..") then the output will be A..h..s..u..y
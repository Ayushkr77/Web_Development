// const express=require("express");
// const app=express();
// function isOldEnough(age) {
//     if (age >= 18) {
//         return true;
//     }
//     return false;
// }
// app.get("/ride1",function(req,res) {
//     if(isOldEnough(req.query.age)) {
//         res.json({
//             msg:"U successfully ride the ride1"
//         })
//     }
//     else {
//         res.status(411).json({
//             msg:"U r not old enough"
//         })
//     }
// })
// app.get("/ride2",function(req,res) {
//     if(isOldEnough(req.query.age)) {
//         res.json({
//             msg:"U successfully ride the ride2"
//         })
//     }
//     else {
//         res.status(411).json({
//             msg:"U r not old enough"
//         })
//     }
// })
// app.listen(3000,function(){
//     console.log("server is running on port 3000")
// })




// Express.js is essentially a chain of middleware functions that process HTTP requests and responses.


// Same above code using middleware function
const express=require("express");
const app=express();
function isOldEnoughMiddleware(req,res,next) {
    const age=req.query.age;
    if (age >= 18) {
        next();
    }
    else {
        res.json({
            msg:"u r not old enough"
        })
    }
}

// app.use(isOldEnoughMiddleware); // u can also remove the 2md parameter isOldEnoughMiddleware in app.get below. If u want the middleware in all the apps, u can directly write like this in app.use. And it will be applied in all the below apps. But if some app.get() is written above this line(i.e., app.use()), then in the above ones that'll not be applied.

app.get("/ride1",isOldEnoughMiddleware,function(req,res) {   // or app.get("/ride1",isOldEnoughMiddleware,fun1);  and upar mei kahi fun1 ka logic likh dege i.e., the code that is written inside function(req,res) here. Basically what happens here is as soon as we search on the route /ride1, then the middleware function isOldEnoughMiddleware is called. If the age is 18 or above, then the next function is called i.e., then only function(req,res) or fun1 here will get executed. 
    res.json({
        msg:"U successfully ride the ride1"
    })
})
app.get("/ride2",isOldEnoughMiddleware,function(req,res) {
    res.json({
        msg:"U successfully ride the ride2"
    })
})
app.listen(3000,function(){
    console.log("server is running on port 3000")
})
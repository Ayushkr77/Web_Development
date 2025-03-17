const express=require("express");
const app=express();
let errorCount=0;

// U have been given an express server which has a few endpoints.
// ur task is to: i) ensure that if there is an exception, the end user sees a status code of 404.
// ii) maintain the errorCount variavle whose value should go up every time there is an exception in any endpoint.

app.get("/user",function(req,res) {
    throw new Error("Some error");
    res.status(200).json({name:"John"});
})

app.post("/user", function(req,res) {
    res.status(200).json({msg:"Created dummy user"});
})

app.get("/errorCount", function(req,res) {
    res.status(200).json({errorCount});
})

// error handling middleware
app.use(function(err, req, res, next) {
    res.status(404).send({});
    errorCount++;
})

app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})

module.exports=app;
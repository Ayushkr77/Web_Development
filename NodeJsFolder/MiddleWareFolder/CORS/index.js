// Assignment
// 1. Create a backend server in node js, that returns the sum endpoint
// 2. Write html file that hits the backend server using fetch api

const express = require("express");
const cors=require("cors");

const app = express();

app.use(express.json());

// If u want to host both html and js file in the same origin, then here CORS problem will not accept here
// app.get("/",function(req,res) {   
//     res.sendFile(__dirname+"/index.html");
// })


// app.use(cors()); // enable CORS for all requests
// Allow requests ONLY from a specific frontend origin
app.use(cors({  
    origin: 'http://127.0.0.1:5500' // will only accept from this origin, not all. cannot write http://localhost:5500. Technically, both localhost and 127.0.0.1 refer to your local machine, but the browser treats them as different "origins" due to how CORS and the Same-Origin Policy work.
}));


app.post("/sum", function(req, res) {
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({
        ans: a + b
    })
    console.log(a+b);
});

app.listen(3000,()=> {
    console.log("Server running on port 3000");
});
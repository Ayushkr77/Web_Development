// Create an HTTP Server
// It should have 4 routes
// 1. http://localhost:3000/multiply?a=1&b=2
// 2. [http://localhost:3000/add?a=1&b=2](http://localhost:3000/multiply?a=1&b=2)
// 3. [http://localhost:3000/divide?a=1&b=2](http://localhost:3000/multiply?a=1&b=2)
// 4. [http://localhost:3000/subtract?a=1&b=2](http://localhost:3000/multiply?a=1&b=2)
// Inputs given at the end after `?` are known as query parameters (usually used in GET requests)
// The way to get them in an HTTP route is by extracting them from the `req` argument (req.query.a , req.query.b)


const express = require("express");
const app = express();

// Sum
// app.get("/sum", function(req, res) {
//     const a = parseFloat(req.query.a);
//     const b = parseFloat(req.query.b);
//     const result = a + b;
//     // res.send(`Sum = ${result}`);
//     // or u can return json also
//     res.json({
//         answer:result
//     })
// });
// OR
app.get("/sum/:a/:b", (req, res) => {
    const a = parseFloat(req.params.a);  // note that here query is not used, params is used
    const b = parseFloat(req.params.b);
    const result = a + b;
    res.send(`Sum = ${result}`);   // u can search like http://localhost:3000/sum/2/5 then output will be 7
});


// Multiply
app.get("/multiply", function(req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const result = a * b;
    res.send(`Product = ${result}`);
});

// Divide
app.get("/divide", function(req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    if (b === 0) {
        res.send("Error: Division by zero!");
    } else {
        const result = a / b;
        res.send(`Quotient = ${result}`);
    }
});

// Subtract
app.get("/subtract", function(req, res) {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const result = a - b;
    res.send(`Difference = ${result}`);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

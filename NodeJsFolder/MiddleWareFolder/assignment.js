// 1. Create a middleware function that logs each incoming request’s HTTP method, URL, and timestamp to the console
// 2. Create a middleware that counts total number of requests sent to a server. Also create an endpoint that exposes it


const express = require("express");
const app = express();

// Request counter variable
let requestCount = 0;

// Middleware 1: Logger
function loggerMiddleware(req, res, next) {
    console.log("Method is " + req.method);
    console.log("URL is " + req.url);
    console.log("Host is " + req.hostname);
    console.log("Timestamp is " + new Date());
    next();
}

// Middleware 2: Request Counter
function counterMiddleware(req, res, next) {
    requestCount++;
    next();
}

// Apply both middlewares globally and if u dont want to use app.use, then app.get("/sum", loggerMiddleware, counterMiddleware, function (req, res) {...
app.use(loggerMiddleware);
app.use(counterMiddleware);

// Route 1: Sum
app.get("/sum", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        sum: a + b
    });
});

// Route 2: Multiply
app.get("/multiply", function (req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        product: a * b
    });
});

// Route 3: Expose total requests
app.get("/request-count", function (req, res) {
    res.json({
        totalRequests: requestCount
    });
});

// Server listen
app.listen(3000, () => console.log("Server running on port 3000"));

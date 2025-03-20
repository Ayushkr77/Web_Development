// Commonly used middlewares
// Through your `journey of writing express servers` , you’ll find some commonly available (on npm) middlewares that you might want to use
// 1. express.json
// The `express.json()` middleware is a built-in middleware function in Express.js used to parse incoming request bodies that are formatted as JSON. This middleware is essential for handling JSON payloads sent by clients in POST or PUT requests.


// const express = require('express');
// const app = express();

// // Use express.json() middleware to parse JSON bodies
// app.use(express.json());   // here middleware is doing one of the tasks that it does. Make changes to the request and the response objects.

// // Define a POST route to handle JSON data
// // Use postman 
// app.post('/sum', (req, res) => {
//     console.log(req.body);  // If we dont use express.json above then req.body will be undefined and below code will cause error bcz   you're accessing a property on undefined.
//     const a = parseInt(req.body.a);   // here we are using body not query. query common with GET moethod. body Common with POST, PUT, or PATCH requests.
//     const b = parseInt(req.body.b);
//     res.json({
//         sum: a + b
//     });
// });

// app.listen(3000, () => {
//   console.log('Server running on port 3000');
// });



// Here's why express.json() is necessary:
// When you send JSON data in a POST/PUT/PATCH request, the data is inside the body of the HTTP request (in raw JSON format). But by default, Express does not know how to parse JSON bodies coming from the client.
// Express doesn't automatically parse the raw JSON payload
// With express.json() → Express understands it as { a: 5, b: 10 } 
// It’s middleware that parses JSON and makes it accessible via req.body.





// Can also use body-parser
// Using body-parser Comment above code and try this below code
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// Use body-parser middleware
app.use(bodyParser.json());
app.post('/sum', (req, res) => {
    console.log(req.body);
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({ sum: a + b });
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});




// When you visit http://localhost:3000/sum directly in the browser (i.e., via GET request):
// Browser by default sends a GET request when you type a URL into the address bar. But u have written logic for .post only
// so Express doesn't know what to do when you visit /sum via the browser (which is a GET by default). So you'll get: Cannot GET /sum
// U can add .get code like
// app.get('/sum', (req, res) => {
//     res.send('Please send a POST request to this endpoint with JSON data like { "a": 5, "b": 10 }');
// });
// Browser address bar = GET request.
// Tools like Postman, cURL, or frontend forms can send POST requests to /sum.


// Also try express.urlencoded()
// It’s a built-in middleware in Express that parses incoming URL-encoded form data (which is how HTML forms usually send data via POST).
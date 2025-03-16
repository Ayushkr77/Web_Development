const express = require('express')
const app = express()  //  an instance of the Express application by calling the express() function
app.get('/', function (req, res) {   // app.get() is used to handle GET requests to this route.
  res.send('Hello World')   // res.send('Hello World') sends the text "Hello World" as the response when someone visits localhost:3000/.
//   We can do res.send only once(inside same route) otherwise error
//   we can also use res.json res.send(we can also write html code inside it)
//   res.send(`
//     <html>
//       <head>
//         <title>My Page</title>
//       </head>
//       <body>
//         <h1>Hello World!</h1>
//         <p>Welcome to my Express server!</p>
//       </body>
//     </html>
//   `)
})
app.get('/ayush', function (req, res) {  // req (request) and res (response) are objects provided by Express
    res.send('Hello Ayush')
})
// Also we can use app.post() app.put() app.delete() app.all() app.get() app.head...
app.listen(3000)   // http://localhost:3000  or 127.0.0.1:3000/
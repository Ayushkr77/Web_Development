// # Creating an express app
// Lets initialise an express app that we will use to generate an `authenticated backend` today.
// - Initialise an empty Node.js project
// - Create an `index.js` file, open the project in visual studio code    
// - Create two new  POST routes, one for `signing up` and one for `signing in`
// - Use `express.json` as a middleware to parse the post request body
// - Create an `in memory` variable called `users` where you store the `username` , `password` and a `token` (we will come to where this token is created later
// - Complete the signup endpoint to store user information in the `in memory variable`
// - Create a function called `generateToken` that generates a random string for you
// - Finish the signin endpoint. It should generate a token for the user and put it in the `in memory` variable for that user


const express=require("express");
const app=express();

const users=[];

app.use(express.json());

const generateToken=()=> {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let token = "";
    for (let i = 0; i < 32; i++) {
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post("/signup",(req,res)=> {
    const username=req.body.username;
    const password=req.body.password;
    users.push({
        username:username,
        password:password
    })
    res.send({
        message: "You have signed up"
    })
})

app.post("/signin",(req,res)=> {
    const username=req.body.username;
    const password=req.body.password;
    const user=users.find(u=> 
        u.username===username && u.password===password
    )
    if(user) {
        const token=generateToken();
        user.token=token;
        res.json({
            username,
            password,
            token
        })
        console.log(users);
    }
    else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
})

app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})
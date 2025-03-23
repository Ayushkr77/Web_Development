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


// https://chatgpt.com/c/67dd2aeb-5f9c-8012-a716-b8cdd31f3818

const express=require("express");

// replacing token logic with jwt
const jwt=require("jsonwebtoken");
const JWT_SECRET = "USER_APP";    // JWT_SECRET is your secret key for signing and verifying JWTs. U can give value anything

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
    console.log(users);
})

app.post("/signin",(req,res)=> {
    const username=req.body.username;
    const password=req.body.password;
    const user=users.find(u=> 
        u.username===username && u.password===password
    )
    if(user) {
        // const token=generateToken();
        const token = jwt.sign({   // replacing token logic with jwt.   .sign se humlog username ko encode kr rhe h jwt mei.   only the username is encoded inside the token—not the password,   Passwords should never be sent back in responses. Even if they were inside the JWT, it's a bad idea to expose passwords in API responses or tokens.
            username: user.username
        }, JWT_SECRET);

        // user.token=token;   // now this is not required bcz the above token only has all the information as username is already encoded inside it
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

// Creating an authenticated endpoint
// Use postman and send via headers the key as token and value as token value u get while post in signin
// Why cant we search normally in browser on /me route and if we can do how?
app.get("/me",function(req,res) {
    const token=req.headers.token;  // jwt

    const decodedInfo=jwt.verify(token,JWT_SECRET);   // {username:"aysush"}   .verify se humlog jwt ko wapas encode kr rhe h username nikalne k liye.  Find out why verify is used here and not decode
    const username=decodedInfo.username;

    // const user=users.find(u=>
    //     u.token===token
    // );
    // now above lines are commented bcz we now dont need to hit the database or global variable. We can directly do search with the help of username
    const user=users.find(u=>
        u.username===username
    );

    if(user) {
        res.json({
            username:user.username,
            password:user.password
        })
    }
    else {
        res.json({
            message: "Token invalid"
        })
    }
})

app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})
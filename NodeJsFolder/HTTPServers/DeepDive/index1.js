// Assignment
// Can you try creating a middleware called auth that verifies if a user is logged in and ends the request early if the user isn’t logged in?

const express=require("express");

// replacing token logic with jwt
const jwt=require("jsonwebtoken");
const JWT_SECRET = "USER_APP";    // JWT_SECRET is your secret key for signing and verifying JWTs. U can give value anything

const app=express();

const users=[];

app.use(express.json());

function logger(req,res,next) {  // another middleware
    console.log(req.method+" request came");
    next();
}

app.post("/signup",logger,(req,res)=> {
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

app.post("/signin",logger,(req,res)=> {
    const username=req.body.username;
    const password=req.body.password;
    const user=users.find(u=> 
        u.username===username && u.password===password
    )
    if(user) {
        const token = jwt.sign({   
            username: user.username
        }, JWT_SECRET);

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

function auth(req,res,next) {   // middleware
    const token=req.headers.token;
    const decodedData=jwt.verify(token,JWT_SECRET);
    if(decodedData.username) {
        req.username=decodedData.username;    // Now, req.username will be available in /me route!
        next();
    }
    else res.json({
        message: "You are not logged in"
    })
}

app.get("/me", logger, auth, function(req,res) {    // using 2 middlewares
    let foundUser=null;
    for(let i=0;i<users.length;i++) {
        if(users[i].username===req.username) {
            foundUser=users[i];
            break;
        }
    }
    res.json({
        username: foundUser.username,
        password: foundUser.password
    })
})

app.listen(3000,()=> {
    console.log("Server is running on port 3000");
})
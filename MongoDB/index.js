// https://petal-estimate-4e9.notion.site/Databases-and-MongoDb-1017dfd107358065a996cda5ed89682e
// https://petal-estimate-4e9.notion.site/Creating-the-backend-of-a-todo-app-1017dfd107358000b549e60abe5c4090

// Creating the backend of a todo app
// Lets now create a `todo application` with the data being `persisted` in the database.
// Create the skeleton for 4 routes
//     - POST /signup
//     - POST /login
//     - POST /todo (authenticated) authenticated means if the user is logged in then only they can access these endpoints
//     - GET /todos (authenticated)



const express = require("express");
const mongoose = require("mongoose");   //  Library to connect and interact with MongoDB.
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");  // JWT (JSON Web Token) is a compact, self-contained token used for authentication. It consists of three parts: Header – Defines the type of token and hashing algorithm. Payload – Contains user-related data (e.g., userId). Signature – Ensures the integrity of the token using a secret key.

const JWT_SECRET = "s3cret";

const app = express();
app.use(express.json());


console.log("Before DB connection");


// What is async and await?
// async makes a function asynchronous, meaning it can handle operations that take time (like database queries).
// await pauses execution until the operation is complete, so you don’t move forward with incomplete data.
// Database queries (mongoose.connect(), UserModel.create(), findOne(), etc.) take time.
// 👉 Whenever you’re dealing with a database, always use async/await to ensure the data is ready before moving forward!


const db=async ()=>{
    await mongoose.connect("mongodb+srv://ayushkumar5990:Ayush1122@ayushcluster.oqlymuy.mongodb.net/TodosDB");
    console.log("DB connected");
}

db();

console.log("After DB connection");



app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const user=await UserModel.create({  // Creates a new user in the users collection.
        email: email,
        password: password,
        name: name
    });
    res.json({
        message: "You are signed up",
        user: user
    })
});


app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const response = await UserModel.findOne({   // Finds user by email & password in the database. So, in the postman while sign in even if u change name and keep email password same, that will generate token
        email: email,
        password: password,
    });
    if (response) {
        const token = jwt.sign({  // This token can be sent to the backend in the Authorization header to verify the user's identity.
            id: response._id.toString()  // response._id // Output: new ObjectId("6552796320aa63b363b5f6ef") response._id.toString() // Output: "6552796320aa63b363b5f6ef".      The id key is used to store the user’s unique identifier.  This id will be used in auth muddleware
        },JWT_SECRET)
        res.json({
            token
        })
    } 
    else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});



app.post("/todo", auth, async function(req, res) {   // send title in body, otherwise title will not be stored in the database
    const title=req.body.title;   // Extracts title from request.body (which means we have to send it in Postman)
    const userId=req.userId;      // // Extracts title from req.userId
    if(!userId) {
        console.log("User not authenticated");
        res.json({
            message: "User not authenticated"
        })
    }
    const todo=await TodoModel.create({   // Creates a new todo with done: false (default value).
        userId:userId,
        title:title,
        done:false
    });

    res.json({
        message:"User created",
        todo:todo
    })
});


app.get("/todos", auth, async function(req, res) {  // Send Authorization header with token in Postman
    const userId=req.userId;
    const todos= await TodoModel.find({userId})   // Finds all todos where userId matches the logged-in user.
    res.json({
        msg:"Got todos",
        todos
    })
});

function auth(req, res, next) {
    const {authorization} = req.headers;  // or const authorization = req.headers.authorization;
    const response = jwt.verify(authorization, JWT_SECRET);
    if (response) {  // If token is valid
        req.userId = response.id;  // Stores userId inside req.userId.   Extracting userId from JWT payload.     Now, req.userId contains the MongoDB _id of the authenticated user.
        next();
    } 
    else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});



// Think of JWT authentication like a movie ticket system 🎟️:
// 1️⃣ Signing In (/signin) → You get a ticket (JWT Token) with your name (id) on it.
// 2️⃣ Security Check (auth middleware) → The security guard checks your ticket (JWT verification) and sees your name (id).
// 3️⃣ Creating a To-Do (/todo) → Since your name (id) is verified, you’re allowed to write your name on a to-do list.
// 4️⃣ Viewing To-Dos (/todos) → You ask, "Show me all to-dos with my name (id)!" and the system fetches only your tasks.

// 💡 TL;DR - Super Simple Summary
// JWT token stores → id
// Auth middleware reads → id
// To-Do creation uses → id
// To-Do fetching filters by → id


// 🚀 TL;DR - Why Use async/await?
// Where?	Why async/await is needed?
// Database Connection (db())	Ensures MongoDB connection happens before other operations start.
// Sign-Up (/signup)	Ensures user is created before sending a response.
// Sign-In (/signin)	Ensures user is found before generating a token.
// Create To-Do (/todo)	Ensures to-do is saved before sending a response.
// Fetch To-Dos (/todos)	Ensures all to-dos are retrieved before responding.

// ✨ Key Takeaway
// 👉 Whenever you’re dealing with a database, always use async/await to ensure the data is ready before moving forward!
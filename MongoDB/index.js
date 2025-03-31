// https://petal-estimate-4e9.notion.site/Databases-and-MongoDb-1017dfd107358065a996cda5ed89682e
// https://petal-estimate-4e9.notion.site/Creating-the-backend-of-a-todo-app-1017dfd107358000b549e60abe5c4090

// Creating the backend of a todo app
// Lets now create a `todo application` with the data being `persisted` in the database.
// Create the skeleton for 4 routes
//     - POST /signup
//     - POST /login
//     - POST /todo (authenticated) authenticated means if the user is logged in then only they can access these endpoints
//     - GET /todos (authenticated)



// Learning Hashing. Salt, bcrypt,...
// https://petal-estimate-4e9.notion.site/Hashing-password-b821927535394ab6aec423eb74234975
// Hashing is different from encoding like if we are hashing the password, we cant get back the password. In the DB, we dont store directly the passwords, we'll store the hashed passwords and will also use salt. Salt: A popular approach to hashing passwords involves using a hashing algorithm that incorporates a salt—a random value added to the password before hashing. This prevents attackers from using precomputed tables (rainbow tables) to crack passwords. Bcrypt: It is a cryptographic hashing algorithm designed for securely hashing passwords. Developed by Niels Provos and David Mazières in 1999, bcrypt incorporates a salt and is designed to be computationally expensive, making brute-force attacks more difficult. 
// Now u'll think when the user will signin, then he/she will enter the password only, but in DB, hashed password is stored so we'll not be able to compare. So, we'll again hash the password entered by the user and compare it with the hashed password in the DB. This is called hashing.


const express = require("express");
const mongoose = require("mongoose");   //  Library to connect and interact with MongoDB.
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");  // JWT (JSON Web Token) is a compact, self-contained token used for authentication. It consists of three parts: Header – Defines the type of token and hashing algorithm. Payload – Contains user-related data (e.g., userId). Signature – Ensures the integrity of the token using a secret key.
const bcrypt = require("bcrypt");  //  Library to hash and compare passwords.
const {z} = require("zod");   //  a validation library used to validate and enforce data types

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



app.post("/signup", async function (req, res) {
    try {
        const { email, password, name } = req.body;   // or const email=req.body.email and so on...

        // Input validation(Must read below commented lines, dont skip)
        // if (typeof email !== "string" || !email.includes("@")) {
        //     return res.status(400).json({ 
        //         message: "Invalid email" 
        //     });
        //     // return;  // the code will never reach here bcz above we are not just doing res.json but we are doing res.json(). So no need to write return here
        // }

        // Input Validation using zod
        const reqBody = z.object({   // defines a schema using Zod that ensures req.body contains: email → A string, between 3 to 50 characters, must be a valid email. password → A string, minimum 8 characters. name → A string, between 3 to 30 characters
            email: z.string().min(3).max(50).email(),
            password: z.string().min(8),   // Strict Password Validation:      password: z.string().min(6).refine((password) => /[A-Z]/.test(password), {message: "Required atleast one uppercase character"}).refine((password) => /[a-z]/.test(password), {message: "Required atleast one lowercase character"}).refine((password) => /[0-9]/.test(password), {message: "Required atleast one number"}).refine((password) => /[!@#$%^&*]/.test(password), {message: "Required atleast one special character"})
            name: z.string().min(3).max(30),
        }).strict(); // Prevents unexpected extra fields. It means that in the body if u send anything extra apart from email, password and name, then it will show error


        // const parsedData = reqBody.parse(req.body);  // .parse() does the same validation, but it throws an error if validation fails. You would need a try-catch block to handle errors.
        const parsedDataWithSuccess = reqBody.safeParse(req.body);  // safeParse() validates req.body against the schema. It does not throw an error (unlike .parse(), which throws on failure). Instead, it returns an object. See at last of this file what it returns in the object.
        if (!parsedDataWithSuccess.success) {
            return res.status(400).json({ 
                message: "Invalid email, password or name",
                errors: parsedDataWithSuccess.error.issues
            });
        }

        // hashing the password with a salt rounds value of 5
        const hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);

        // Creating a new user
        const user = await UserModel.create({
            email,
            password: hashedPassword,
            name
        });

        res.status(201).json({
            message: "You are signed up",
            user: user
        });
    } 
    catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
});




app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const response = await UserModel.findOne({   // Finds user by email & password(now only email as we are later checking hashedPassword) in the database. So, in the postman while sign in even if u change name and keep email password same, that will generate token
        email: email,
    });
    if(!response) {
        res.status(403).json({
            message: "User doesnt exist"
        })
    }

    const matchPassword=await bcrypt.compare(password,response.password);

    if (matchPassword) {
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




// .safeParse()  returns an object:

// Case 1: Validation Passes (success: true)
// {
//     "success": true,
//     "data": {
//       "email": "test@example.com",
//       "password": "password123",
//       "name": "Ayush"
//     }
//   }
  
// Case 2: Validation Fails (success: false)
// {
//     "success": false,
//     "error": {
//       "issues": [
//         {
//           "code": "invalid_string",
//           "message": "Invalid email",
//           "path": ["email"]
//         }
//       ]
//     }
//   }
  
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
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "s3cret";




const app = express();
app.use(express.json());


console.log("Before DB connection");

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
    const user=await UserModel.create({
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
    const response = await UserModel.findOne({
        email: email,
        password: password,
    });
    if (response) {
        const token = jwt.sign({
            id: response._id.toString()
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



app.post("/todo", auth, async function(req, res) {
    const title=req.body.title;
    const userId=req.userId;
    if(!userId) {
        console.log("User not authenticated");
        res.json({
            message: "User not authenticated"
        })
    }
    const todo=await TodoModel.create({
        userId:userId,
        title:title,
        done:false
    });

    res.json({
        message:"User created",
        todo:todo
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId=req.userId;
    const todos= await TodoModel.find({userId})
    res.json({
        msg:"Got todos",
        todos
    })
});

function auth(req, res, next) {
    const {authorization} = req.headers;
    const response = jwt.verify(authorization, JWT_SECRET);
    if (response) {
        req.userId = response.id;
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
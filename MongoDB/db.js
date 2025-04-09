// Mongoose is an ODM (Object Data Modeling) library for MongoDB, which means it helps us interact with the database in an object-oriented way.
// A model in Mongoose is a wrapper for a MongoDB collection, and it provides an interface to perform CRUD (Create, Read, Update, Delete) operations.
// In simple terms:
// A schema defines the structure of documents in a MongoDB collection.
// A model allows us to interact with the corresponding MongoDB collection using JavaScript.



const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({   // or const User= new mongoose.Schema
  name: String,
  email: {type: String, unique: true},
  password: String
});

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean
});

const UserModel = mongoose.model('users', User);  // 'users' → This is the name of the MongoDB collection. Mongoose automatically: Uses the plural form of the collection name. If the collection does not exist, Mongoose creates it. If you want a specific collection name, you can explicitly set it as follows: Overriding Mongoose's Pluralization     const UserModel = mongoose.model('use', User, 'use');
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel,
    TodoModel
}
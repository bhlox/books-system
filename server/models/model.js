const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const users_model = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
});

const books_model = new Schema({
  title: { type: String },
  author: { type: String },
  price: { type: Number },
  stock: { type: Number },
});

const Users = mongoose.model("users", users_model);
const Books = mongoose.model("books", books_model);

exports.default = Users;

module.exports = { Users, Books };

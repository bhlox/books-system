const jwt = require("jsonwebtoken");
const model = require("../models/model");
const ObjectId = require("mongodb").ObjectId;

// POST: http://localhost:8080/api/signup
async function create_User(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP data is missing");

  const { name, email, password } = req.body;

  const create = await new model.Users({ name, email, password });

  create.save((err) => {
    if (!err) return res.json({ status: "ok", create });
    return res
      .status(400)
      .json({ message: `Error while creating transaction ${err}` });
  });
}

// POST USER http://localhost:8080/api/login
async function get_User(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP data is missing");

  const { email, password } = req.body;

  try {
    const user = await model.Users.findOne({ email, password });

    // console.log("user information", user);

    if (user) {
      const token = jwt.sign(
        {
          name: user.name,
          email,
        },
        "secret123",
        { expiresIn: Date.now() * (60 * 60 * 1000) }
      );
      return res.json({ status: "ok", user: token });
    } else return res.json({ status: "error", user: false });
  } catch (error) {
    console.log(error);
    return res.json({ message: error });
  }
}

// POST book http://localhost:8080/api/books
async function create_books(req, res) {
  if (!req.body) return res.status(400).json("Post HTTP data is missing");

  const { title, author, price, stock } = req.body;

  const create = await new model.Books({ title, author, price, stock });

  create.save((err) => {
    if (!err) return res.json({ status: "ok", create });
    return res
      .status(400)
      .json({ message: `Error while creating transaction ${err}` });
  });
}

// get books http://localhost:8080/api/books
async function get_books(req, res) {
  const data = await model.Books.find({});

  return res.json(data);

  // return res.json({ message: "getting books" });
}

// get single book http://localhost:8080/api/books/:bookId
async function get_book(req, res) {
  if (!req.params)
    return res.status(400).json({ message: "Request params not found" });

  const { bookId } = req.params;

  // console.log(bookId);

  // console.log("this is the req params", id);

  const data = await model.Books.findOne({ _id: ObjectId(bookId) });

  // console.log(data);

  return res.json({ message: "got the book", data });
}

// PUT update book

async function update_book(req, res) {
  if (!req.body)
    return res.status(400).json({ message: "Request body not found" });

  // console.log(req.body);

  const { title, author, price, stock, bookId } = req.body;

  await model.Books.updateOne(
    { _id: bookId },
    {
      $set: { title, author, price, stock },
    }
  );

  return res.json({ message: "updated" });
}

// delete book
async function delete_book(req, res) {
  if (!req.params)
    return res.status(400).json({ message: "Request body not found" });

  const { bookId } = req.params;

  console.log(bookId);

  await model.Books.deleteOne({ _id: ObjectId(bookId) }).catch((err) =>
    console.log(err)
  );

  return res.json({ message: "deleted" });
}

module.exports = {
  get_books,
  create_books,
  delete_book,
  create_User,
  get_User,
  get_book,
  update_book,
};

const jwt = require("jsonwebtoken");
const model = require("../models/model");

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
        "secret123"
      );
      return res.json({ status: "ok", user: token });
    } else return res.json({ status: "error", user: false });
  } catch (error) {
    console.log(error);
    return res.json({ message: error });
  }
}

// get books
async function get_books(req, res) {
  return res.json({ message: "getting books" });
}

module.exports = { get_books, create_User, get_User };

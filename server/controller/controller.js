const model = require("../models/model");

// get books
async function get_books(req, res) {
  return res.json({ message: "getting books" });
}

module.exports = { get_books };

const routes = require("express").Router();
const controller = require("../controller/controller");

routes.route("/api/books").get(controller.get_books);

module.exports = routes;

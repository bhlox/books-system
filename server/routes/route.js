const routes = require("express").Router();
const controller = require("../controller/controller");

routes.route("/api/books").get(controller.get_books);

routes.route("/api/signup").post(controller.create_User);

routes.route("/api/login").post(controller.get_User);

module.exports = routes;

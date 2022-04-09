const routes = require("express").Router();
const controller = require("../controller/controller");

routes
  .route("/api/books")
  .post(controller.create_books)
  .get(controller.get_books)
  .put(controller.update_book);
// .delete(controller.delete_book);

routes
  .route("/api/books/:bookId")
  .get(controller.get_book)
  .delete(controller.delete_book);

routes.route("/api/signup").post(controller.create_User);

routes.route("/api/login").post(controller.get_User);

module.exports = routes;

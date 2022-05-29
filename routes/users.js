const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/UsersController");
const RC4Middleware = require("../middleware/RC4");


router.post("/login", RC4Middleware.encrypt, UsersController.login);
router
.get("/", UsersController.search)
.post("/", RC4Middleware.encrypt, UsersController.create);
router.get("/:id", UsersController.getById);

module.exports = router;

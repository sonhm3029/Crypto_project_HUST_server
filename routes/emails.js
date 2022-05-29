const express = require("express");
const EmailsControllers = require("../controllers/EmailsControllers");
const router = express.Router();
const RC4Middleware = require("../middleware/RC4");

router
  .get("/", EmailsControllers.search)
  .post("/", RC4Middleware.encrypt, EmailsControllers.create);
router.get("/:id", EmailsControllers.getById, RC4Middleware.decrypt);

module.exports = router;

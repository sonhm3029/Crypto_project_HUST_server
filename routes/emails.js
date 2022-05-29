const express = require("express");
const EmailsControllers = require("../controllers/EmailsControllers");
const router = express.Router();
const RC4Middleware = require("../middleware/RC4");

router.get("/sent", EmailsControllers.getBySenderId, RC4Middleware.decrypt);
router.get("/receive", EmailsControllers.getByReceiverId, RC4Middleware.decrypt);
router
  .get("/", EmailsControllers.search)
  .post("/", RC4Middleware.encrypt, EmailsControllers.create)
  .get("/:id", EmailsControllers.getById, RC4Middleware.decrypt);

module.exports = router;

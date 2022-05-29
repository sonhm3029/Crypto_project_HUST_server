const express = require('express');
const router = express.Router();
const RC4Controller = require('../controllers/RC4Controller');

router.get("/encrypt", RC4Controller.encrypt);
router.get("/decrypt", RC4Controller.decrypt);

module.exports = router;

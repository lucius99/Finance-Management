const express = require("express");
const router = express.Router();

const controller = require("../controllers/users.controller");

// Create new icon
router.post("/create", controller.addNewUser);

module.exports = router;
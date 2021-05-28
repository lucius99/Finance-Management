const express = require("express");
const router = express.Router();

const controller = require("../controllers/icons.controller");

// Create new icon
router.post("/create", controller.addNewIconController);

module.exports = router;
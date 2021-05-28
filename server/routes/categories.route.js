const express = require("express");
const router = express.Router();

const controller = require("../controllers/categories.controller");

router.post("/create", controller.addNewCategoryController);

module.exports = router;
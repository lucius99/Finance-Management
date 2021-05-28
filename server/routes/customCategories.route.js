const express = require("express");
const router = express.Router();

const controller = require("../controllers/customCategories.controller");

// Create new custom category
router.post("/create", controller.addNewCustomCategoryController);

module.exports = router;

const express = require("express");
const router = express.Router();

const controller = require("../controllers/customCategories.controller");

// Create new custom category
router.post("/create", controller.addNewCustomCategoryController);
router.get("/:category_id", controller.getCustomCategoryInfoByIdController);

module.exports = router;

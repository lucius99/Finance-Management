const express = require("express");
const router = express.Router();

const controller = require("../controllers/categories.controller");

// Create new default category
router.post("/create", controller.addNewCategoryController);
router.get("/:category_id", controller.getCategoryInfoByIdController);
router.get("/", controller.getAllCategoryController);

module.exports = router;
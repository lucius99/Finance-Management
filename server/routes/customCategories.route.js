const express = require("express");
const router = express.Router();

const controller = require("../controllers/customCategories.controller");

// Create new custom category
router.post("/create", controller.addNewCustomCategoryController);
router.get("/:category_id", controller.getCustomCategoryInfoByIdController);
router.post("/insert/many", controller.insertCustomCategoryController);
router.delete("/delete/many", controller.deleteTransactionsController);
router.put("/update/many", controller.updateTransactionsController);

module.exports = router;

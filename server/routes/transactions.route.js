const express = require("express");
const router = express.Router();

const controller = require("../controllers/transactions.controller");

// Create new default category
router.post("/create", controller.addNewTransactionController);
router.get("/:transaction_id", controller.getTransacionInfoByIdController);
router.post("/insert/many", controller.insertTransactionsController);
router.post("/delete/many", controller.deleteTransactionsController);
router.put("/update/many", controller.updateTransactionsController);

module.exports = router;
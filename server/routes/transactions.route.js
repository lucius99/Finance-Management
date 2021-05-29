const express = require("express");
const router = express.Router();

const controller = require("../controllers/transactions.controller");

// Create new default category
router.post("/create", controller.addNewTransactionController);
router.get("/:transaction_id", controller.getTransacionInfoByIdController);

module.exports = router;
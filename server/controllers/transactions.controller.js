const transactionsService = require("../services/transactions.service");

exports.addNewTransactionController = async (req, res) => {
  let {
    _id,
    category_id,
    user_id,
    money,
    type,
    description,
    created_at,
    currency_type,
    groups,
  } = req.body;
  let { result, status } = await transactionsService.createTransaction(
    _id,
    category_id,
    user_id,
    money,
    type,
    description,
    created_at,
    currency_type,
    groups
  );

  if (!status) {
    res.status(400).json({
      status: false,
      message: "Something went wrong",
    });
    return;
  }
  res.status(200).json({
    status: true,
    result: result,
    message: "Add Category Successfully",
  });
};

// Get Category Info by ID
exports.getTransacionInfoByIdController = async (req, res) => {
  let transaction_id = req.params.transaction_id;
  let result = await transactionsService.getTransactionById(transaction_id);
  if (!result.status) {
    return res.status(400).json({ status: false, message: result.message });
  }
  return res.status(200).json({ status: true, result: result.result });
};
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../models");
const Transactions = db.transactions;

// Use to create new transacions
createTransaction = async (
  _id,
  category_id,
  user_id,
  money,
  type,
  description,
  created_at,
  currency_type,
  groups
) => {
  let result = await Transactions.create({
    _id,
    category_id,
    user_id,
    money,
    type,
    description,
    created_at,
    currency_type,
    groups,
  });
  return { result, status: true };
};

// Get info about category by ID
getTransactionById = async (transaction_id) => {
  let result = await Transactions.findOne(
    { _id: transaction_id },
    (err, data) => {
      if (err) {
        console.log(err);
      }
    }
  )
    .populate({ path: "category_id", select: "-_id -__v" })
    .select("-__v");

  if (!result) {
    return { status: false, message: "Something went wrong" };
  }
  return { status: true, result: result };
};

const transactionsService = {
  createTransaction,
  getTransactionById,
};

module.exports = transactionsService;

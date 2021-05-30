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

// Insert multiple document into DB
insertManyTransactions = async (transactions) => {
  let result;
  await Transactions.insertMany(transactions)
    .then((data) => {
      result = { status: true, message: "Successfully Add New Transactions" };
    })
    .catch((err) => {
      result = { status: false, message: err };
    });
  return result;
};

// Delete multiple document into DB
deleteManyTransactions = async (transactions) => {
  let result;
  await Transactions.deleteMany({ _id: { $in: transactions } })
    .then((data) => {
      if (data.deletedCount > 0) {
        result = { status: true, message: "Successfully Delete Transactions" };
      } else
        result = {
          status: true,
          message: "There are no transactions to deleted",
        };
    })
    .catch((err) => {
      result = { status: false, message: err };
    });
  return result;
};

// Update multiple document into DB
updateManyTransactions = async (transactions) => {
  let countModified = 0;
  const update = (item) => {
    return {
      $set: {
        category_id: item.category_id,
        money: item.money,
        type: item.type,
        description: item.description,
        created_at: item.created_at,
        currency_type: item.currency_type,
      },
    };
  };
  for (let item of transactions) {
    await Transactions.updateOne({ _id: item._id }, update(item))
      .then((data) => {
        if (data.nModified > 0) countModified++;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (countModified > 0)
    return {
      status: true,
      message: `Successfully update ${countModified} document`,
    };

  return { status: true, message: "Not change at all" };
};
const transactionsService = {
  createTransaction,
  getTransactionById,
  insertManyTransactions,
  deleteManyTransactions,
  updateManyTransactions,
};

module.exports = transactionsService;

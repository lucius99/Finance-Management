const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const TransactionsSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
  },
  category_id: {
    type: ObjectId,
    required: true,
    ref: "Categories",
  },
  user_id: {
    type: ObjectId,
    required: true,
    ref: "Users",
  },
  money: {
    type: Number,
  },
  is_income: {
    type: Boolean,
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
  },
  currency_type: {
    type: String,
  },
  groups: [{ type: ObjectId, ref: "Groups" }],
});
module.exports = mongoose.model("Transactions", TransactionsSchema);

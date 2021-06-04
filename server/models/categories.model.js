const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const CategoriesSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  icon_id: {
    type: ObjectId,
    required: true,
    ref: "Icons",
  },
  parent_id: {
    type: ObjectId,
    ref: "Categories",
    default: null,
  },
  is_income: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model("Categories", CategoriesSchema);

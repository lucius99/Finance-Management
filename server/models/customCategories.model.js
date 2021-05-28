const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const CustomCategoriesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon_id: {
    type: ObjectId,
    required: true,
    ref: "Icons",
  },
  custom_parent_id: {
    type: ObjectId,
    ref: "CustomCategories",
  },
  parent_id: {
    type: ObjectId,
    ref: "Categories",
  },
  type: {
    type: String,
    required: true,
  },
  user_id: {
    type: ObjectId,
    required: true,
    ref: "User",
  },
});
module.exports = mongoose.model("CustomCategories", CustomCategoriesSchema);

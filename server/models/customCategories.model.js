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
  parent_id: {
    type: ObjectId,
    refPath: "onModel",
    default: null,
  },
  type: {
    type: String,
    required: true,
  },
  user_id: {
    type: ObjectId,
    required: true,
    ref: "Users",
  },
  onModel: {
    type: String,
  },
});
module.exports = mongoose.model("CustomCategories", CustomCategoriesSchema);

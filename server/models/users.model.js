const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const UsersSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
  },
  name: {
    type: String,
    required: true,
    default: "User",
  },
  age: {
    type: Number,
    required: true,
    default: 0,
  },
  gender: {
    type: String,
    required: true,
    default: "none",
  },
  numberPhone: {
    type: String,
    required: true,
    default: "",
  },
  email: {
    type: String,
    required: true,
    default: "",
  },
  category_list: [{ type: ObjectId, ref: "Categories" }],
  custom_category_list: [{ type: ObjectId, ref: "CustomCategories" }],
  edited_default_category: [{ type: Object }],
  groups: [{ type: ObjectId, ref: "Groups" }],
});
module.exports = mongoose.model("Users", UsersSchema);

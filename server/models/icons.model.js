const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const IconsSchema = new mongoose.Schema({
  icon_name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  bg_color: {
    type: String,
    required: true,
  },
  alias: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Icons", IconsSchema);

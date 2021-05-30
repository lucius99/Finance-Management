const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const GroupsSchema = new mongoose.Schema({
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
  users: [{ type: ObjectId, ref: "Users" }],
});
module.exports = mongoose.model("Groups", GroupsSchema);

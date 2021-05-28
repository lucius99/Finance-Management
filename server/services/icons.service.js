const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../models");
const Icons = db.icons;

// Use to create new default category (parent or child)
createIcon = async (icon_name, color, bg_color, alias) => {
  let result = await Icons.create({
    icon_name,
    color,
    bg_color,
    alias,
  });
  return { result, status: true };
};

const iconsService = {
  createIcon,
};

module.exports = iconsService;

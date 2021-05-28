const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../models");
const CustomCategories = db.customCategories;

// Use to create new custom category (parent or child)
createCustomCategory = async (
  name,
  icon_id,
  type,
  parent_id,
  user_id,
  onModel
) => {
  let result = await CustomCategories.create({
    name,
    icon_id,
    type,
    parent_id,
    user_id,
    onModel,
  });
  return { result, status: true };
};

const customCategoriesService = {
  createCustomCategory,
};

module.exports = customCategoriesService;

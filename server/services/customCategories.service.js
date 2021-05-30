const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../models");
const CustomCategories = db.customCategories;

// Use to create new custom category (parent or child)
createCustomCategory = async (
  _id,
  name,
  icon_id,
  type,
  parent_id,
  user_id,
  onModel
) => {
  let result = await CustomCategories.create({
    _id,
    name,
    icon_id,
    type,
    parent_id,
    user_id,
    onModel,
  });
  return { result, status: true };
};

// Get info about category by ID
getCustomCategoryInfoById = async (category_id) => {
  let result = await CustomCategories.findOne(
    { _id: category_id },
    (err, data) => {
      if (err) {
        console.log(err);
      }
    }
  )
    .populate({ path: "icon_id", select: "-_id -__v" })
    .populate({ path: "parent_id", select: "-_id -__v" })
    .select("-__v");

  if (!result) {
    return { status: false, message: "Something went wrong" };
  }
  return { status: true, result: result };
};

const customCategoriesService = {
  createCustomCategory,
  getCustomCategoryInfoById,
};

module.exports = customCategoriesService;

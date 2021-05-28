const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../models");
const Categories = db.categories;

createCategory = async (name, icon_id, type, parent_id = null) => {
  let result = await Categories.create({
    name,
    icon_id,
    type,
    parent_id,
  });
  return { result, status: true };
};

const categoriesService = {
  createCategory,
};

module.exports = categoriesService;
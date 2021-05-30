const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../models");
const Categories = db.categories;

// Use to create new default category (parent or child)
createCategory = async (_id, name, icon_id, type, parent_id = null) => {
  let result = await Categories.create({
    _id,
    name,
    icon_id,
    type,
    parent_id,
  });
  return { result, status: true };
};

// Get info about category by ID
getCategoryInfoById = async (category_id) => {
  let result = await Categories.findOne({ _id: category_id }, (err, data) => {
    if (err) {
      console.log(err);
    }
  })
    .populate({ path: "icon_id", select: "-_id -__v" })
    .select("-__v");

  // ------------add new field in mongoDB-------------------
  // Categories.updateMany(
  //   {},
  //   [
  //     {
  //       $set: {
  //         friend: [],
  //       },
  //     },
  //   ],
  //   function (err, raw) {
  //     if (err) return handleError(err);
  //     console.log("The raw response from Mongo was ", raw);
  //   }
  // );
  if (!result) {
    return { status: false, message: "Something went wrong" };
  }
  return { status: true, result: result };
};

const categoriesService = {
  createCategory,
  getCategoryInfoById,
};

module.exports = categoriesService;

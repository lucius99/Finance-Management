const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../models");
const CustomCategories = db.customCategories;
const Users = db.users;

// Use to create new custom category (parent or child)
createCustomCategory = async (
  _id,
  name,
  icon_id,
  is_income,
  parent_id,
  user_id,
  onModel
) => {
  let result = await CustomCategories.create({
    _id,
    name,
    icon_id,
    is_income,
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

// Insert multiple custom category into DB
insertManyCustomCategory = async (user_id, custom_categories) => {
  let result;
  let custom_category_id_list = [];

  const filter = { _id: user_id };
  const update = (items) => {
    return {
      $push: {
        custom_category_list: {
          $each: items,
        },
      },
    };
  };

  for (let category of custom_categories) {
    custom_category_id_list.push(category._id);
  }

  await CustomCategories.insertMany(custom_categories)
    .then((data) => {
      result = {
        status: true,
        message: "Successfully Add New Custom Category",
      };
    })
    .catch((err) => {
      result = { status: false, message: err };
    });

  await Users.updateOne(filter, update(custom_category_id_list))
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Delete multiple custom category into DB
deleteManyCustomCategory = async (user_id, custom_categories_id) => {
  let result;

  const filter = { _id: user_id };
  const update = (items) => {
    return {
      $pull: {
        custom_category_list: {
          $in: items,
        },
      },
    };
  };

  await CustomCategories.deleteMany({ _id: { $in: custom_categories_id } })
    .then((data) => {
      if (data.deletedCount > 0) {
        result = {
          status: true,
          message: "Successfully Delete Custom Category",
        };
      } else
        result = {
          status: true,
          message: "There are no Custom Category to delete",
        };
    })
    .catch((err) => {
      result = { status: false, message: err };
    });

  await Users.updateOne(filter, update(custom_categories_id))
    .then((data) => {})
    .catch((err) => {
      console.log(err);
    });
  return result;
};

// Update multiple Custom Category into DB
updateManyCustomCategory = async (custom_categories) => {
  let countModified = 0;
  const update = (item) => {
    return {
      $set: {
        name: item.name,
        icon_id: item.icon_id,
      },
    };
  };

  for (let item of custom_categories) {
    await CustomCategories.updateOne({ _id: item._id }, update(item))
      .then((data) => {
        if (data.nModified > 0) countModified++;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (countModified > 0)
    return {
      status: true,
      message: `Successfully update ${countModified} Custom Category`,
    };

  return { status: true, message: "Not change at all" };
};

const customCategoriesService = {
  createCustomCategory,
  getCustomCategoryInfoById,
  insertManyCustomCategory,
  deleteManyCustomCategory,
  updateManyCustomCategory
};

module.exports = customCategoriesService;

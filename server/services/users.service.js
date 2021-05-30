const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../models");
const Users = db.users;

// Use to create new default category (parent or child)
createUser = async (
  _id,
  name,
  age,
  gender,
  numberPhone,
  email,
  category_list,
  custom_category_list,
  edited_default_category
) => {
  let result = await Users.create({
    _id,
    name,
    age,
    gender,
    numberPhone,
    email,
    category_list,
    custom_category_list,
    edited_default_category,
  });
  return { result, status: true };
};

// Get user info by ID
getUserInfoById = async (user_id) => {
  let result = await Users.findOne({ _id: user_id }, (err, data) => {
    if (err) {
      console.log(err);
    }
  })
    .populate({ path: "category_list", select: "-__v" })
    .populate({ path: "custom_category_list", select: "-__v" })
    .select("-__v");

  if (!result) {
    return { status: false, message: "Something went wrong" };
  }
  return { status: true, result: result };
};

// pull and push default category by user
pullAndPushManyDefaultCategory = async (user_id, edited_categories) => {
  let category_id_list = [];
  let new_edited_default_category = [];
  let edited_default_category = [];
  let countModified = 0;

  let userInfo = await Users.findOne({ _id: user_id });
  let default_categories_id = userInfo.category_list;
  let edited_default_category_in_DB = userInfo.edited_default_category;

  // Check if edited category in user's default category  (`category_list`)
  for (let category of edited_categories) {
    if (default_categories_id.includes(category._id)) {
      category_id_list.push(category._id);
      new_edited_default_category.push(category);
      continue;
    }
    edited_default_category.push(category);
  }

  // Push edited default category in to `edited_default_category` and pull them from `category_list`
  const update = (items, items_id_list) => {
    return {
      $push: {
        edited_default_category: {
          $each: items,
        },
      },

      $pull: {
        category_list: { $in: items_id_list },
      },
    };
  };

  // Update old edited category
  const update_2 = (item) => {
    return {
      $set: { "edited_default_category.$": item },
    };
  };

  // Fillter for update old edited category
  const filter_2 = (item, user_id) => {
    return {
      _id: user_id,
      edited_default_category: edited_default_category_in_DB.filter(
        (category, index) => category._id === item._id
      )[0],
    };
  };

  // if edited category still in default category. Then update
  if (category_id_list.length > 0)
    await Users.updateOne(
      { _id: user_id },
      update(new_edited_default_category, category_id_list)
    )
      .then((data) => {
        if (data.nModified > 0) countModified++;
      })
      .catch((err) => {
        console.log(err);
      });

  // if edited category are not in default category. Then update
  if (edited_default_category.length > 0) {
    for (let item of edited_default_category) {
      await Users.updateOne(filter_2(item, user_id), update_2(item))
        .then((data) => {
          if (data.nModified > 0) countModified++;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  if (countModified > 0)
    return {
      status: true,
      message: `Successfully update ${countModified} default category`,
    };

  return { status: true, message: "Not change at all" };
};

// Delete Edited Default Category
deleteManyDefaultCategory = async (user_id, category_id_list) => {
  let default_category_id_list = [];
  let edited_default_category_list = [];
  let edited_default_category_id_in_DB = []; // store array of id of edited category
  let countModified = 0;

  let userInfo = await Users.findOne({ _id: user_id });
  let default_categories_in_DB = userInfo.category_list;
  let edited_default_category_in_DB = userInfo.edited_default_category;

  const filter = { _id: user_id };
  const update = {
    $pull: {
      category_list: { $in: default_category_id_list },
      edited_default_category: { $in: edited_default_category_list },
    },
  };

  // Make an array of edited default category ID
  for (let item of edited_default_category_in_DB) {
    edited_default_category_id_in_DB.push(item._id);
  }

  // Check if edited category in user's default category  (`category_list`)
  for (let id of category_id_list) {
    if (default_categories_in_DB.includes(id)) {
      default_category_id_list.push(id);
      continue;
    }
    if (edited_default_category_id_in_DB.includes(id)) {
      edited_default_category_list.push(
        edited_default_category_in_DB.filter(
          (item, index) => item._id === id
        )[0]
      );
      continue;
    }
  }

  if (
    default_category_id_list.length > 0 ||
    edited_default_category_list.length > 0
  )
    await Users.updateOne(filter, update)
      .then((data) => {
        if (data.nModified > 0) countModified++;
      })
      .catch((err) => {
        console.log(err);
      });

  if (countModified > 0)
    return {
      status: true,
      message: `Successfully delete ${countModified} default category`,
    };

  return { status: true, message: "Not change at all" };
};

const usersService = {
  createUser,
  getUserInfoById,
  pullAndPushManyDefaultCategory,
  deleteManyDefaultCategory,
};

module.exports = usersService;

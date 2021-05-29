const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const db = require("../models");
const Users = db.users;

// Use to create new default category (parent or child)
createUser = async (
  name,
  age,
  gender,
  numberPhone,
  email,
  category_list,
  custom_category_list,
  edit_default_category
) => {
  let result = await Users.create({
    name,
    age,
    gender,
    numberPhone,
    email,
    category_list,
    custom_category_list,
    edit_default_category,
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

const usersService = {
  createUser,
  getUserInfoById,
};

module.exports = usersService;

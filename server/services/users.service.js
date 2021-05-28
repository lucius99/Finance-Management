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
  custom_category_list
) => {
  let result = await Users.create({
    name,
    age,
    gender,
    numberPhone,
    email,
    category_list,
    custom_category_list
  });
  return { result, status: true };
};

const usersService = {
  createUser,
};

module.exports = usersService;

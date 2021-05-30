const usersService = require("../services/users.service");

exports.addNewUser = async (req, res) => {
  let {
    _id,
    name,
    age,
    gender,
    numberPhone,
    email,
    category_list,
    custom_category_list,
    edit_default_category,
  } = req.body;
  let { result, status } = await usersService.createUser(
    _id,
    name,
    age,
    gender,
    numberPhone,
    email,
    category_list,
    custom_category_list,
    edit_default_category
  );

  if (!status) {
    res.status(400).json({
      status: false,
      message: "Something went wrong",
    });
    return;
  }
  res.status(200).json({
    status: true,
    result: result,
    message: "Add User Successfully",
  });
};

// Get User info by ID
exports.getUserInfoByIdController = async (req, res) => {
  let user_id = req.params.user_id;
  let result = await usersService.getUserInfoById(user_id);
  if (!result.status) {
    return res.status(400).json({ status: false, message: result.message });
  }
  return res.status(200).json({ status: true, result: result.result });
};

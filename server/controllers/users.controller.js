const usersService = require("../services/users.service");

exports.addNewUser = async (req, res) => {
  let {
    name,
    age,
    gender,
    numberPhone,
    email,
    category_list,
    custom_category_list,
  } = req.body;
  let { result, status } = await usersService.createUser(
    name,
    age,
    gender,
    numberPhone,
    email,
    category_list,
    custom_category_list,
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

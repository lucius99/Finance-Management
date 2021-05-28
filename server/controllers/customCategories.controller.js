const customCategoriesService = require("../services/customCategories.service");

exports.addNewCustomCategoryController = async (req, res) => {
  let { name, icon_id, type, parent_id, user_id, onModel } = req.body;
  let { result, status } = await customCategoriesService.createCustomCategory(
    name,
    icon_id,
    type,
    parent_id,
    user_id,
    onModel
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
    message: "Add Custom Category Successfully",
  });
};

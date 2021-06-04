const categoriesService = require("../services/categories.service");

exports.addNewCategoryController = async (req, res) => {
  let { _id, name, icon_id, is_income, parent_id } = req.body;
  let { result, status } = await categoriesService.createCategory(
    _id,
    name,
    icon_id,
    is_income,
    parent_id
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
    message: "Add Category Successfully",
  });
};

// Get Category Info by ID
exports.getCategoryInfoByIdController = async (req, res) => {
  let category_id = req.params.category_id;
  let result = await categoriesService.getCategoryInfoById(category_id);
  if (!result.status) {
    return res.status(400).json({ status: false, message: result.message });
  }
  return res.status(200).json({ status: true, result: result.result });
};

// Get All Category Info
exports.getAllCategoryController = async (req, res) => {
  let result = await categoriesService.getAllCategory();
  if (!result.status) {
    return res.status(400).json({ status: false, message: result.message });
  }
  return res.status(200).json({ status: true, result: result.result });
};

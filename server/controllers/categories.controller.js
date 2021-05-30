const categoriesService = require("../services/categories.service");

exports.addNewCategoryController = async (req, res) => {
  let {_id, name, icon_id, type, parent_id } = req.body;
  let { result, status } = await categoriesService.createCategory(
    _id,
    name,
    icon_id,
    type,
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

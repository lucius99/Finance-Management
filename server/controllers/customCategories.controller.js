const customCategoriesService = require("../services/customCategories.service");

exports.addNewCustomCategoryController = async (req, res) => {
  let { _id, name, icon_id, is_income, parent_id, user_id, onModel } = req.body;
  let { result, status } = await customCategoriesService.createCustomCategory(
    _id,
    name,
    icon_id,
    is_income,
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

// Get Category Info by ID
exports.getCustomCategoryInfoByIdController = async (req, res) => {
  let category_id = req.params.category_id;
  let result = await customCategoriesService.getCustomCategoryInfoById(
    category_id
  );
  if (!result.status) {
    return res.status(400).json({ status: false, message: result.message });
  }
  return res.status(200).json({ status: true, result: result.result });
};

// Add Array Of Custom Category
exports.insertCustomCategoryController = async (req, res) => {
  let { user_id, custom_categories } = req.body;
  let result = await customCategoriesService.insertManyCustomCategory(
    user_id,
    custom_categories
  );
  if (!result.status) {
    return res.status(400).json({ status: false, message: result.message });
  }
  return res.status(200).json({ status: true, message: result.message });
};

// Delete Array Of Custom Category
exports.deleteTransactionsController = async (req, res) => {
  let { user_id, custom_categories_id } = req.body;
  let result = await customCategoriesService.deleteManyCustomCategory(
    user_id,
    custom_categories_id
  );
  if (!result.status) {
    return res.status(400).json({ status: false, message: result.message });
  }
  return res.status(200).json({ status: true, message: result.message });
};

// Update Array Of Custom Category
exports.updateTransactionsController = async (req, res) => {
  let { custom_categories } = req.body;
  let result = await customCategoriesService.updateManyCustomCategory(
    custom_categories
  );
  if (!result.status) {
    return res.status(400).json({ status: false, message: result.message });
  }
  return res.status(200).json({ status: true, message: result.message });
};

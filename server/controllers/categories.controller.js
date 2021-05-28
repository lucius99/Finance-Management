const categoriesService = require("../services/categories.service");

exports.addNewCategoryController = async (req, res) => {
  let { name, icon_id, type, parent_id } = req.body;
  let { result, status } = await categoriesService.createCategory(
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

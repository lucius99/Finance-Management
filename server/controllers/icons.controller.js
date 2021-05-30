const iconsService = require("../services/icons.service");

exports.addNewIconController = async (req, res) => {
  let { _id, icon_name, color, bg_color, alias } = req.body;
  let { result, status } = await iconsService.createIcon(
    _id,
    icon_name,
    color,
    bg_color,
    alias
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
    message: "Add Icon Successfully",
  });
};

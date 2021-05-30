const express = require("express");
const router = express.Router();

const controller = require("../controllers/users.controller");

// Create new icon
router.post("/create", controller.addNewUser);
router.get("/:user_id", controller.getUserInfoByIdController);
router.put("/default_category/update", controller.pullAndPushDefaultCategory);
router.delete("/default_category/delete", controller.deleteDefaultCategory);

module.exports = router;

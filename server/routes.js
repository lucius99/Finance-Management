const express = require("express");
const router = express.Router();

router.use("/category", require("./routes/categories.route"));
router.use("/custom/category", require("./routes/customCategories.route"));
router.use("/icon", require("./routes/icons.route"));
router.use("/user", require("./routes/users.route"));

module.exports = router;

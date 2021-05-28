const express = require("express");
const router = express.Router();

router.use("/category", require("./routes/categories.route"));
router.use("/custom/category", require("./routes/customCategories.route"));

module.exports = router;

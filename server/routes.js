const express = require("express");
const router = express.Router();

router.use("/category/", require("./routes/categories.route"));
router.use("/custom/category/", require("./routes/customCategories.route"));
router.use("/icon/", require("./routes/icons.route"));
router.use("/user/", require("./routes/users.route"));
router.use("/transaction/", require("./routes/transactions.route"));

module.exports = router;

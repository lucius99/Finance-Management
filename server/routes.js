const express = require("express");
const router = express.Router();

router.use("/category", require("./routes/categories.route"));

module.exports = router;

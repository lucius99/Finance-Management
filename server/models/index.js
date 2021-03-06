const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.categories = require("./categories.model");
db.customCategories = require("./customCategories.model");
db.users = require("./users.model");
db.icons = require("./icons.model");
db.transactions = require("./transactions.model");
db.groups = require("./groups.model");
module.exports = db;

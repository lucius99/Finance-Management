const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.categories = require("./categories.model");
db.customCategories = require("./customCategories.model");

module.exports = db;
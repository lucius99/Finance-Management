const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const transacions = [
  {
    _id: "60b2f3332dae071f409ebd57",
    category_id: "60b2f3332dae071f409ebd51",
    user_id: "60b2f3332dae071f409ebd53",
    money: 12000,
    type: "expense",
    description: "",
    created_at: "2021-05-29T04:06:09.266Z",
    currency_type: "vnd",
    groups: [],
  },
  {
    _id: "60b2f3332dae071f409ebd58",
    category_id: "60b2f3332dae071f409ebd51",
    user_id: "60b2f3332dae071f409ebd53",
    money: 12000,
    type: "expense",
    description: "",
    created_at: "2021-05-28T04:06:09.266Z",
    currency_type: "vnd",
    groups: [],
  },
  {
    _id: "60b2f3332dae071f409ebd59",
    category_id: "60b2f3332dae071f409ebd51",
    user_id: "60b2f3332dae071f409ebd53",
    money: 12000,
    type: "expense",
    description: "",
    created_at: "2021-05-29T04:06:09.266Z",
    currency_type: "vnd",
    groups: [],
  },
];

module.exports = transacions;

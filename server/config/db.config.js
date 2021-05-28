let DB = "Finance-Management";
let PASSWORD = "moneymake";
let HOSTNAME = "Finance-Management";

module.exports = {
  URI: `mongodb+srv://${HOSTNAME}:${PASSWORD}@cluster0.fmvjn.mongodb.net/${DB}?retryWrites=true&w=majority`,
  // URI: "mongodb://localhost:27017/bezkoder_files_db"
};

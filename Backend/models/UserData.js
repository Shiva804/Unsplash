const mongoose = require("mongoose");

const UserData = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  image: [],
});

module.exports = mongoose.model("UserData", UserData);

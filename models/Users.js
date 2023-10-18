const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  userName: String,
  name: String,
  aadharNumber: Number,
  panNumber: String,
  mobileNumber: Number,
  accountNumber: Number,
  password: String,
  vouchers: [{ type: Array, default: [] }],
  occupation: String,
  createdAt: { type: Date, default: Date.now },
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;

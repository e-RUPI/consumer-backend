const mongoose = require("mongoose");

const vouchersSchema = new mongoose.Schema({
  eRupiId: String,
  purpose: String,
  user: String,
  mcc: Number,
  issueDate: { type: Date },
  expiry: { type: Date },
  maxAmount: Number,
  usedAmount: Number,
  status: String,
  createdAt: { type: Date, default: Date.now },
});

const Vouchers = mongoose.model("Vouchers", vouchersSchema);

module.exports = Vouchers;

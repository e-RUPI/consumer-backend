const mongoose = require("mongoose");

const schemesSchema = new mongoose.Schema({
  schemeId: String,
  title: String,
  organization: String,
  link: String,
  mcc: Number,
  createdAt: { type: Date, default: Date.now },
  eligible: [{ type: Array, default: [] }],
});

const Schemes = mongoose.model("Schemes", schemesSchema);

module.exports = Schemes;

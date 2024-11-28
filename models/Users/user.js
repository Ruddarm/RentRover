const { ref } = require("joi");
const mongoose = require("mongoose");

const userSechma = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, require: true, unique: true },
  listing: { type: mongoose.Schema.ObjectId, ref: "litings" },
});

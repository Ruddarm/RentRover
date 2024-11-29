const { ref } = require("joi");
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');


const userSechma = mongoose.Schema({
  email: { type: String, require: true, unique: true },
  listing: { type: mongoose.Schema.ObjectId, ref: "litings" },
  reviews: { type: mongoose.Schema.ObjectId, ref: "reviews" },
});

userSechma.plugin(passportLocalMongoose)

module.exports.user = mongoose.model(userSechma);

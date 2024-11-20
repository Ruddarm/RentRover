const express = require("express");
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const data = require("./sampleData");
const mongurl = "mongodb+srv://ruddarmmaurya:5mOPemsWf7p3Xx5j@genaidashboard.sarlo.mongodb.net/bvpgdggenai?retryWrites=true&w=majority&appName=rentrover";

async function main() {
  await mongoose.connect(mongurl);
}
main()
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.log(err);
  });

save = async () => {
  try {
    await Listing.deleteMany();
    let result = await Listing.insertMany(data.data);
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
save();
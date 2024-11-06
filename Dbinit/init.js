const express = require("express");
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const data = require("./sampleData");
const mongurl = "mongodb://127.0.0.1:27017/rentrover";

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
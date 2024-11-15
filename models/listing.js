const mongoose = require("mongoose");
const review = require("./review");
const listingSchem = mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: {
    filename: String,
    type: String,
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1568605114967-8130f3a36994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb"
        : v,
  },
  price: { type: Number, required: true },
  location: String,
  contry: String,
  review:[{
    review_id: mongoose.Types.ObjectId
  }]
});
const Lisiting = mongoose.model("Listing", listingSchem);
module.exports = Lisiting;

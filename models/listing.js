const mongoose = require("mongoose");
const Review = require("./review");
const listingSchema = mongoose.Schema({
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
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
});

//Creating a middle ware for post delete
listingSchema.post("findOneAndDelete", async (listing) => {
  console.log("Calling post middle ware")
  if (listing) {
    let res = await Review.deleteMany({
      _id: { $in: listing.reviews },
    });
    console.log(res);
  }
});
const Lisiting = mongoose.model("Listing", listingSchema);
module.exports = Lisiting;

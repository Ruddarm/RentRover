const express = require("express");
const Listing = require("../models/listing");
const ReviewModel = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");
const route = express.Router({mergeParams:true});
// To valdiate reviews
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    console.log("gadbadhogay");
    throw new serverError(400, errMsg);
  } else {
    console.log("sahi hai review");
    next();
  }
};

route.post(
  "/",
  validateReview,
  wrapAsync(async (req, res, next) => {
    let { review } = req.body;

    let lisitng = await Listing.findById(req.params.id);
    console.log(lisitng);
    let newReview = new ReviewModel(review);
    lisitng.reviews.push(newReview);
    let result = await newReview.save();
    await lisitng.save();
    res.redirect(`/listings/${lisitng._id}`);
  })
);

//   Destory reviews
route.delete(
  "/listings/:id/review/:reviewId",
  wrapAsync(async (req, res, next) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await ReviewModel.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  })
);

module.exports.route = route;
const express = require("express");
const Listing = require("../models/Lisitings/listing");
const wrapAsync = require("../utils/wrapAsync");
const { listingSchema } = require("../schemaValidation");
const serverError = require("../utils/serverError");

const route = express.Router();
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new serverError(400, errMsg);
  } else {
    next();
  }
};
route
  .route("/")
  .get(async (req, res) => {
    const allLisitings = await Listing.find();
    res.render("listings/index.ejs", { allLisitings });
  })
  .post(
    validateListing,
    wrapAsync(async (req, res, next) => {
      if (!req.body.listing) next(new serverError(400, "Data is not valid"));
      let { listing: list } = req.body;
      let result = await new Listing(list).save();
      req.flash("success", "New listing Created");
      res.redirect("/listings/" + result._id);
    })
  );
//create route
route.get("/new", (req, res) => {
  res.render("listings/addlisting.ejs");
});
//save route

//Show rooute
route
  .route("/:id")
  .get(
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id).populate("reviews");
      res.render("listings/show.ejs", { listing });
    })
  )
  .put(async (req, res) => {
    let { id } = req.params;
    let { listing: newlistitng } = req.body;
    await Listing.findByIdAndUpdate(id, newlistitng);
    if (Listing) {
      req.flash("success", "Listing edited successfully");
    } else {
      req.flash("error", "Listing you are trying to edit is not exits");
    }
    res.redirect("/listings/" + id);
  })
  .delete(
    wrapAsync(async (req, res, next) => {
      let { id } = req.params;
      await Listing.findByIdAndDelete(id);
      if (Listing) {
        req.flash("success", "Listing Deleted successfully");
      } else {
        req.flash("error", "Listing you are trying to delete is not exits");
      }
      res.redirect("/listings");
    })
  );

//edt-route
route.get("/:id/edit", async (req, res) => {
  let { id } = req.params;
  let existing_listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { existing_listing });
});

module.exports.route = route;

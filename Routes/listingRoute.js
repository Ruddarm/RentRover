const express =require("express");
const Listing = require('../models/listing')
const wrapAsync = require("../utils/wrapAsync")

const route  = express.Router()

route.get("/", async (req, res) => {
    const allLisitings = await Listing.find();
  
    res.render("listings/index.ejs", { allLisitings });
  });
  //create route
  route.get("/new", (req, res) => {
    res.render("listings/addlisting.ejs");
  });
  //save route
  route.post(
    "",
    wrapAsync(async (req, res, next) => {
      if (!req.body.listing) next(new serverError(400, "Data is not valid"));
      let { listing: list } = req.body;
      let result = await new Listing(list).save();
      res.redirect("/listings/" + result._id);
    })
  );
  
  //Show rooute
  route.get(
    "/:id",
    wrapAsync(async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id).populate("reviews");
      res.render("listings/show.ejs", { listing });
    })
  );
  
  //edt-route
  route.get("/:id/edit", async (req, res) => {
    let { id } = req.params;
    let existing_listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { existing_listing });
  });
  
  //update rout
  route.put("/:id", async (req, res) => {
    let { id } = req.params;
    let { listing: newlistitng } = req.body;
    await Listing.findByIdAndUpdate(id, newlistitng);
    res.redirect("/listings/" + id);
  });
  
  route.delete(
    "/:id",
    wrapAsync(async (req, res, next) => {
      let { id } = req.params;
      await Listing.findByIdAndDelete(id);
      res.redirect("/listings");
    })
  );


  module.exports.route = route;
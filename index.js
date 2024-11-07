const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override")
// const { json } = require("stream/consumers");
const ejsMate = require("ejs-mate");
const port = 8080;
const mongurl = "mongodb://127.0.0.1:27017/rentrover";

//Connecting with database
console.log("join url ", path.join(__dirname, "views"));
// C:\Users\Ruddarm\OneDrive\RentRover\RentRover\views\listings
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
//Routing
//Setting up port
const app = express();
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"))
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.listen(port, () => {
  console.log(`Listining on ${port}`);
});
//Home route
app.get("/", (req, res) => {
  res.redirect("/listings");
});
//Testing route
app.get("/testing/lisiting", async (req, res) => {
  let Sample = new Listing({
    title: "Belapur Residency",
    description: "A couple frnldly vila wihtou camera",
    price: 1200,
    location: "Belapur , Navi Mumbai",
    contry: "India",
  });
  let result = await Sample.save();
  console.log(result);
});

//Index route
app.get("/listings", async (req, res) => {
  const allLisitings = await Listing.find();

  res.render("listings/index.ejs", { allLisitings });
});
//create route
app.get("/listings/new", (req, res) => {
  res.render("listings/addlisting.ejs");
});
//save route
app.post("/listings", async (req, res) => {
  let { listing: list } = req.body;
  let result = await new Listing(list).save()
  res.redirect("/listings/"+result._id);
});


//Show rooute
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//edt-route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let existing_listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { existing_listing });
});

//update rout
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let { listing: newlistitng } = req.body;
  await Listing.findByIdAndUpdate(id,newlistitng);
  res.redirect("/listings/"+id);  
});

app.delete("/listings/:id",async(req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
})
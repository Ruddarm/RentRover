const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const serverError = require("./utils/serverError");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const port = 8080;
const mongurl = "mongodb+srv://ruddarmmaurya:5mOPemsWf7p3Xx5j@genaidashboard.sarlo.mongodb.net/bvpgdggenai?retryWrites=true&w=majority&appName=rentrover";
const Listingroute = require("./Routes/listingRoute");
const ReviewRouter = require("./Routes/reviewRoute");
//Connecting with database
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
//Setting up port
const app = express();
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.listen(port, () => {
  console.log(`Listining on ${port}`);
});
// Routeing
app.get("/", (req, res) => {
  res.redirect("/listings");
});
app.use("/listings", Listingroute.route);
app.use("/listings/:id/review", ReviewRouter.route);
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

app.all("*", (req, res, next) => {
  next(new serverError(404, "Page not Found"));
});

app.use((err, req, res, next) => {
  let { status = 404, message = "Some thinng went wrong" } = err;
  res.render("listings/error.ejs", { err });
});

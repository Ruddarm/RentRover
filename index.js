const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/Lisitings/listing");
const path = require("path");
const serverError = require("./utils/serverError");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const port = 8080;
const mongurl = "mongodb://127.0.0.1:27017/rentrover";
const Listingroute = require("./Routes/listingRoute");
const ReviewRouter = require("./Routes/reviewRoute");
const session = require("express-session");
const passport = require("passport");
const User = require("./models/Users/user");
const LocalStrategy = require("passport-local");
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
const SessionConfiguraiton = {
  secret: "RuddarmRenroverproject",
  resave: false,
  saveUninitialzed: true,
  Cookie: {
    expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 25 * 60 * 60 * 1000,
  },
};


//Setting up port
const app = express();
app.use(session(SessionConfiguraiton));
app.use(flash());
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.listen(port, () => {
  console.log(`Listining on ${port}`);
});
// Routeing

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
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
});

app.all("*", (req, res, next) => {
  next(new serverError(404, "Page not Found"));
});

app.use((err, req, res, next) => {
  let { status = 404, message = "Some thinng went wrong" } = err;
  res.render("listings/error.ejs", { err });
});

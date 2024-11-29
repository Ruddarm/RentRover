const express = require("express");
const User = require("../models/Users/user");
const wrapAsync = require("../utils/wrapAsync");
const serverError = require("../utils/serverError");

const Route = express.Router();

Route.route("/signup")
  .post(
    wrapAsync(async (req, res, next) => {
      let { user, password } = req.body;
      let newUser = await User.register(user, password);
      req.flash("Sucess", "Loged in successfully");
      res.redirect("/");
    })
  )
  .get(
    wrapAsync((req, res, next) => {
      res.render("Users/singupForm.ejs");
    })
  );
Route.route("/login")
  .post(
    wrapAsync(async (req, res, next) => {
      let { username, password } = req.body;
      let login = await User.authenticate(username, password);
    })
  )
  .get((req, res) => {});

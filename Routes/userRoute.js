const express = require("express");
const User = require("../models/Users/user");
const wrapAsync = require("../utils/wrapAsync");
const serverError = require("../utils/serverError");

const Route = express.Router();
Route.post(
  "signup",
  wrapAsync(async (req, res, next) => {
    let { user, password } = req.body;
    let newUser = await User.register(user, password);
    req.flash("Sucess", "Loged in successfully");
    res.redirect("/");
  })
);
Route.post(
  "/login",
  wrapAsync(async (req, res, next) => {
    let { username, password } = req.body;
    let login = await User.authenticate(username, password);
  })
);

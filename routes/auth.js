const express = require("express");
const Router = require("express").Router;
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");
const router = new Router();


/** POST /login - login: {username, password} => {token} **/
router.post("/login", async function (req, res, next) {
    try {
      let { username, password } = req.body;
      if (!username || !password) {
        throw new ExpressError("Please enter username and password", 400);
      }
      if (await User.authenticate(username, password)) {
        let token = jwt.sign({ username }, SECRET_KEY);
        User.updateLoginTimestamp(username);
        return res.json({ token });
      } else {
        throw new ExpressError("Invalid username/password", 400);
      }
    } catch (err) {
      return next(err);
    }
})

/** POST /register - register user: registers, logs in, and returns token */
router.post("/register", async function (req, res, next) {
    try {
        let { username } = await User.register(req.body);
        let token = jwt.sign({ username }, SECRET_KEY);
        User.updateLoginTimestamp(username);
        return res.json({ token });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
const express = require("express");
const Router = require("express").Router;
const User = require("../models/user");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

const router = new Router();


router.get("/", ensureLoggedIn, async function (req, res, next) {
  try {
    let users = await User.all();
    return res.json({ users });
  } catch (e) {
    return next(e);
  }
});

router.get("/username/to", ensureLoggedIn, async function (req, res, next) {
    try {
        let username = req.params.username
        if (username) {
            return Message.get(username)
        }
    } catch (e) {
        return next(e)
    }
});

router.get("/username/from", ensureLoggedIn, async function (req, res, next) {
    try {
        let username = req.params.username
        if (username) {
            return Message.get(from_username);
        }
    } catch (e) {
        return next(e)
    }
});


module.exports = router;
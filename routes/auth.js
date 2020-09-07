const express = require("express");
const Router = require("express").Router;
const User = require("../models/user");
const { ensureLoggedIn, ensureCorrectUser } = require("../middleware/auth");

const router = new Router();


/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */

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
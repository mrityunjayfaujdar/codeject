const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require("passport");

router.get("/profile", passport.checkAuthentication, userController.profile);

router.get("/register", userController.registerUser);
router.get("/sign-in", userController.signInUser);

router.post("/create-user", userController.createUser);

router.get("/sign-out", userController.destroySession);

//use -passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  userController.createSession
);

module.exports = router;

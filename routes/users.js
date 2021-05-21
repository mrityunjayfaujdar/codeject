const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/profile", userController.profile);
router.get("/register", userController.registerUser);
router.get("/sign-in", userController.signInUser);

module.exports = router;

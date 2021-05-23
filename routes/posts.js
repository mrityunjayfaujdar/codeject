const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const passport = require("passport");

router.post(
    "/create-post",
    passport.checkAuthentication,
    postController.createPost
);

module.exports = router;

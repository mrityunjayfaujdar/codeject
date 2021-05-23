const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const passport = require("passport");

router.post(
    "/create-comment",
    passport.checkAuthentication,
    commentController.createComment
);

module.exports = router;

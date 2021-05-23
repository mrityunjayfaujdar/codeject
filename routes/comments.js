const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const passport = require("passport");

router.post(
    "/create-comment",
    passport.checkAuthentication,
    commentController.createComment
);

router.get(
    "/destroy/:id",
    passport.checkAuthentication,
    commentController.destroy
);

module.exports = router;

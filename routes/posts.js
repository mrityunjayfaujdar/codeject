const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");

router.get("/post", postsController.post);

module.exports = router;

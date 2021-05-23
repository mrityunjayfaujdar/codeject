const Post = require("../models/post");

module.exports.home = function (req, res) {
    //res.cookie("user_id", 11); // Setting the value of cookie from response

    Post.find({user: req.user._id}, (err, posts) => {
        console.log(posts);
        return res.render("home", {
            title: "home",
            posts,
        });
    });
};

const Post = require("../models/post");

module.exports.home = function (req, res) {
    // res.cookie("user_id", 11); // Setting the value of cookie from response

    // Post.find({user: req.user._id}, (err, posts) => {
    //     console.log(posts);
    //     return res.render("home", {
    //         title: "home",
    //         posts,
    //     });
    // });

    //Populating the user details along with post
    Post.find({})
        .populate("user")
        .exec(function (error, posts) {
            return res.render("home", {
                title: "home",
                posts,
            });
        });
};

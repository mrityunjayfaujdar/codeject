const Post = require("../models/post");
const Comment = require("../models/comment");

module.exports.createPost = (req, res) => {
    Post.create(
        {
            content: req.body.content,
            user: req.user._id,
        },
        (err, post) => {
            if (err) {
                console.log("Error in creating a Post");
                return;
            }

            return res.redirect("back");
        }
    );
};

module.exports.destroy = (req, res) => {
    //route is : /posts/destroy/:id
    Post.findById(req.params.id, (err, post) => {
        //Handle Error

        // id -> It is the string form of _id (this is an object)
        if (post.user == req.user.id) {
            post.remove();

            //We have comments stored seperately. Remove all the Comments related to the post.
            Comment.deleteMany({post: req.params.id}, (err) => {
                return res.redirect("back");
            });
        } else {
            return res.redirect("back");
        }
    });
};

const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.createComment = (req, res) => {
    console.log(req.body);
    Post.findById(req.body.post, (err, post) => {
        Comment.create(
            {
                content: req.body.content,
                post: req.body.post,
                user: req.user._id,
            },
            (err, comment) => {
                //handle error
                //once our comment has been updated.
                // we need to update the post with comment ID too.
                post.comments.push(comment); // Important step to update comments in Post
                post.save();

                return res.redirect("/");
            }
        );
    });
};

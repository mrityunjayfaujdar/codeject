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

module.exports.destroy = (req, res) => {
    //find the comment
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            console.log("Error Searching for Comment - Delete comment");
            return;
        }
        if (comment.user == req.user.id) {
            //save the post Id first.
            let postId = comment.post;
            //this will delete only the comment
            comment.remove();
            //need to remove comment refrence from post
            Post.findByIdAndUpdate(
                postId,
                {$pull: {comments: req.params.id}},
                (err, posr) => {
                    return res.redirect("back");
                }
            );
        } else {
            return res.redirect("back");
        }
    });
};

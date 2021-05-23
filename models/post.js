const mongoose = require("mongoose");

//this post needs a reference to the user schema
const postSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },

        user: {
            //references the User schema ( 1 : M )
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        //include the array of IDs of all comments in this post schema
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    {
        timeStamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

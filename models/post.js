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
    },
    {
        timeStamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

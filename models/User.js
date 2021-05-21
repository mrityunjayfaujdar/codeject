const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
  },
  {
    //This will add - createdAt - & - updatedAt values.
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

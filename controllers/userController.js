const User = require("../models/User");

module.exports.profile = (req, res) => {
  return res.render("user_profile", {
    title: "Users Profile",
  });
};

module.exports.registerUser = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_register", {
    title: "Codeject | Register",
  });
};

module.exports.signInUser = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render("user_sign_in", {
    title: "Codeject | SignIn",
  });
};

module.exports.createUser = (req, res) => {
  const { password, confirm_password } = req.body;

  //check is both passwords are same
  if (password !== confirm_password) {
    console.log("Passwords do not match....");
    return res.redirect("back");
  }

  //find if user exist by email id
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log("Error at Searching for user.");
      return;
    }

    //if no user exist - create one
    if (!user) {
      User.create(req.body, (err, user) => {
        if (err) {
          console.log("Error at Creating a user.");
          return;
        }

        return res.redirect("/users/sign-in");
      });
    } else {
      console.log("User already Exist!");
      return res.redirect("back");
    }
  });
};

module.exports.createSession = (req, res) => {
  res.redirect("/");
};

module.exports.destroySession = (req, res) => {
  req.logout();
  res.redirect("/");
};

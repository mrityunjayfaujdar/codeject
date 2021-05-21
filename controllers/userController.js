module.exports.profile = (req, res) => {
  return res.render("user_profile", {
    title: "Users",
  });
};

module.exports.registerUser = (req, res) => {
  return res.render("user_register", {
    title: "Codeject | Register",
  });
};

module.exports.signInUser = (req, res) => {
  return res.render("user_sign_in", {
    title: "Codeject | SignIn",
  });
};

module.exports.createUser = (req, res) => {
  //TODO later
};

module.exports.createSession = (req, res) => {
  //TODO later
};

module.exports.profile = (req, res) => {
  return res.render("user_profile", {
    title: "Users",
  });
};

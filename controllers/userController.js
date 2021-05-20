module.exports.profile = (req, res) => {
  return res.render("users", {
    title: "Users",
  });
};

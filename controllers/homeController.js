module.exports.home = function (req, res) {
  res.cookie("user_id", 11); // Setting the value of cookie from response
  return res.render("home", {
    title: "home",
  });
};

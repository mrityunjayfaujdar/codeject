module.exports.post = (req, res) => {
  return res.render("posts", {
    title: "Post",
  });
};

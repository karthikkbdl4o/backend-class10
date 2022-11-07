exports.getLoggedInUser = async (req, res) => {
  res.json(req.user);
};

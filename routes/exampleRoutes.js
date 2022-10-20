const express = require("express");
const User = require("../models/User");

const exampleRoutes = express.Router();

exampleRoutes.get("/", async (req, res) => {
  const user = new User({
    firstName: "Ashok",
    lastName: "Kumar",
    email: "ashokkumar@gmail.com",
    password: "@sh0k",
  });
  await user.save();

  res.json({
    title: "Get Method 1",
  });
});

exampleRoutes.post("/", (req, res) => {
  res.json({
    message: "Post Method",
  });
});

exampleRoutes.put("/", (req, res) => {
  res.json({
    message: "Put Method",
  });
});

exampleRoutes.delete("/", (req, res) => {
  res.json({
    message: "Delete Method",
  });
});

module.exports = exampleRoutes;

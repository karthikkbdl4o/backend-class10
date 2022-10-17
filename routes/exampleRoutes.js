const express = require("express");

const exampleRoutes = express.Router();

exampleRoutes.use((req, res) => {
  res.json({ message: "ok" });
});
exampleRoutes.get("/", (req, res) => {
  res.json({
    title: "Get Method",
    subtitle: "asfa",
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

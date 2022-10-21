const express = require("express");
const User = require("../models/User");

const exampleRoutes = express.Router();

//Query
exampleRoutes.get("/query", (req, res) => {
  console.log(req.query);
  res.json({ message: "Query Param" });
});

//Path
exampleRoutes.get("/path/(:name)", (req, res) => {
  console.log(req.params.name);
  res.json({ message: "Path Param", params: req.params });
});

//Body
exampleRoutes.post("/body", (req, res) => {
  console.log(req.body);
  res.json({ message: "Body Param" });
});

exampleRoutes.get("/", async (req, res) => {
  res.json({
    title: "Get Method",
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

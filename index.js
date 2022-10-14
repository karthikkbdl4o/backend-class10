//import Express
const express = require("express");

//Create Express Create
const app = express();

//GET - To Read
//POST - To Create
//DELETE - To Delete
//PUT - To Update

app.get("/example", (req, res) => {
  res.json({
    message: "Get Method",
  });
});

app.post("/example", (req, res) => {
  res.json({
    message: "Post Method",
  });
});

app.put("/example", (req, res) => {
  res.json({
    message: "Put Method",
  });
});

app.delete("/example", (req, res) => {
  res.json({
    message: "Delete Method",
  });
});

// Listen To Port
app.listen(3000, () => {
  console.log("Express Server Started");
});

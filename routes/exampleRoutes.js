const express = require("express");
const { body, validationResult } = require("express-validator");
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

// Our Validator
exampleRoutes.post(
  "/body/ourValidator",

  (req, res, next) => {
    const data = req.body;
    console.log(data);
    if (data.email == null) {
      req.error = "Email Not Found";
      // res.status(404).json({ message: "Email Not Found" });
    } else if (
      !data.email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      req.error = "Email Invalid";
      // res.status(400).json({ message: "Email Invalid" });
    }
    next();
  },

  (req, res) => {
    if (req.error) {
      res.status(400).json({ message: req.error });
    }

    res.json({ message: "Validator" });
  }
);

// Validator
exampleRoutes.post(
  "/body/extValidator",

  body("email").isEmail().withMessage("Invalid Email"),
  body("password").isStrongPassword().withMessage("Invalid Password"),

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors });
    }

    console.log(req.body);
    res.json({ message: "Validator" });
  }
);

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

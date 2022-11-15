const express = require("express");
const { expressjwt: jwt } = require("express-jwt");

const jwtRoutes = express.Router();

jwtRoutes.get(
  "/protected",
  jwt({ secret: "shhhhhhared-secret", algorithms: ["HS256"] }),
  function (req, res) {
    if (!req.auth.admin) return res.status(401).json({ error: "Some Error" });

    console.log(req.auth);
    res.sendStatus(200);
  }
);

module.exports = jwtRoutes;

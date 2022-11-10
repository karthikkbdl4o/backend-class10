const { body } = require("express-validator");

exports.createProductValidator = [
  body("name").exists().withMessage("Name Not Found"),
  body("description").exists().withMessage("Description Not Found"),
  body("price")
    .exists()
    .withMessage("Price Not Found")
    .isFloat({ min: 0, max: 100 })
    .withMessage("Price Invalid"),
];

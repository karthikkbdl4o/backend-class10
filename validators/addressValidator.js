const { body } = require("express-validator");

exports.createAddressValidator = [
  body("address").exists().withMessage("Address Not Found"),
  body("city").exists().withMessage("City Not Found"),
  body("pincode").exists().withMessage("Pincode Not Found"),
  body("state").exists().withMessage("State Not Found"),
];

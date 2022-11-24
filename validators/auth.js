const { check, validationResult } = require("express-validator");

//register 
exports.validateRegisterResult = [
   check("firstName")
      .notEmpty()
      .isLength({ min: 3, max: 20 })
      .withMessage("First Name is required"),
   check("lastName")
      .notEmpty()
      .isLength({ min: 3, max: 20 })
      .withMessage("Last Name is required"),
   check("email").isEmail().withMessage("Valid Email is required"),
   check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
];

//login
exports.validateLoginRequest = [
   check("email").notEmpty().isEmail().withMessage("Valid Email is required"),
   check("password").notEmpty().withMessage("Password is required"),
];

//check result
exports.isRequestValidated = (req, res, next) => {
   const errors = validationResult(req);
   if (errors.array().length > 0) {
      return res.status(400).json({ error: errors.array()[0].msg });
   }
   next();
};

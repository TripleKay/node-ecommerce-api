const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const {
   validateRegisterResult,
   validateLoginRequest,
   isRequestValidated,
} = require("../validators/auth");

router.post(
   "/register",
   validateRegisterResult,
   isRequestValidated,
   authController.register
);

router.post(
   "/login",
   validateLoginRequest,
   isRequestValidated,
   authController.login
);

module.exports = router;

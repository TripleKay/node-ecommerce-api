const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

// create token
const generateJwtToken = (userId, role) => {
   return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
      expiresIn: "3d",
   });
};

exports.register = async (req, res) => {
   try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
         return res.status(403).json({ error: "User Already Registered!" });
      }
      const hash_password = await bcrypt.hash(req.body.password, 10);
      const data = {
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         password: hash_password,
         username: shortid.generate(),
      };
      const newUser = await new User(data).save();
      if (!newUser) {
         return res.status(500).json({ error: "Something wrong! Try again." });
      }
      const token = generateJwtToken(newUser._id, newUser.role);
      const { password, ...other } = newUser._doc;
      return res.status(201).json({ user: other, token: token });
   } catch (error) {
      res.status(500).json({ error: error });
   }
};

exports.login = async (req, res) => {
   try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
         const passwordCheck = await user.authenticate(req.body.password);
         if (passwordCheck && user.role == "user") {
            const token = generateJwtToken(user._id, user.role);
            const { password, ...other } = user._doc;
            return res.status(200).json({ user: other, token: token });
         }
      }
      return res.status(500).json({error: "Your Credantials do not match"});
   } catch (error) {
      return res.status(500).json({ error: error });
   }
};

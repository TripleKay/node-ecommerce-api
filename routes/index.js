const authRoute = require("../routes/auth");
const categoryRoute = require("../routes/category");
const productRoute = require("../routes/product");
const userRoute = require("../routes/user");

exports.apiRoutes = (req, res) => {
   return { authRoute, categoryRoute, productRoute, userRoute };
};

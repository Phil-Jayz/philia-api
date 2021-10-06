const express = require("express");
const privateRouter = express.Router();
const { getPrivateRoute } = require("./private.controller");
const { protectedRoute } = require("../../../middleware/protectedRoute");

privateRouter.route("/").get(protectedRoute, getPrivateRoute);

module.exports = privateRouter;

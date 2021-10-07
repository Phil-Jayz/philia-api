const express = require("express");
const authRouter = express.Router();

// Controllers
const {
  adminlogin,
  userlogin,
  registerAdmin,
  registerUser,
  forgotPassword,
  resetPassword,
  sendRefreshToken,
  logout,
  getAll,
  getById
} = require("./auth.controller");

const { protectedRoute } = require("../../../middleware/protectedRoute");

authRouter.route("/register/admin").post(registerAdmin);
authRouter.route("/register").post(registerUser);
authRouter.route("/login/admin").post(adminlogin);
authRouter.route("/login").post(userlogin);
authRouter.route("/forgotpassword").post(forgotPassword);
authRouter.route("/passwordreset/:resetToken").put(resetPassword);
authRouter.route("/:userPath").get(protectedRoute, getAll);
authRouter.route("/:_id/:userPath").get(protectedRoute, getById);
authRouter.route("/refresh-token/:userId").post(sendRefreshToken);
authRouter.route("/logout").delete(logout);

module.exports = authRouter;

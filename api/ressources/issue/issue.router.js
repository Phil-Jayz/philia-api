const express = require("express");
const issueRouter = express.Router();

// Controllers
const {
  add,
  getAll,
  getById,
  getByName
} = require("./issue.controller");

const { protectedRoute } = require("../../../middleware/protectedRoute");

issueRouter.route("/add/:userId").post(protectedRoute, add);
issueRouter.route("/:userId").get(protectedRoute, getAll);
issueRouter.route("/:Name/:userId").get(protectedRoute, getByName);
issueRouter.route("/getById/:ID/:userId").get(protectedRoute, getById);

module.exports = issueRouter;

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

issueRouter.route("/add/:userPath").post(protectedRoute, add);
issueRouter.route("/:userPath").get(protectedRoute, getAll);
issueRouter.route("/:Name/:userPath").get(protectedRoute, getByName);
issueRouter.route("/getById/:ID/:userPath").get(protectedRoute, getById);

module.exports = issueRouter;

const express = require("express");
const bodyLocationRouter = express.Router();

// Controllers
const {
  add,
  getAll,
  getById,
  getByName
} = require("./bodyLocation.controller");

const { protectedRoute } = require("../../../middleware/protectedRoute");

bodyLocationRouter.route("/add/:userPath").post(protectedRoute, add);
bodyLocationRouter.route("/:userPath").get(protectedRoute, getAll);
bodyLocationRouter.route("/:Name/:userPath").get(protectedRoute, getByName);
bodyLocationRouter.route("/getById/:ID/:userPath").get(protectedRoute, getById);

module.exports = bodyLocationRouter;

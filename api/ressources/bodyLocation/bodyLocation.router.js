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

bodyLocationRouter.route("/add/:userId").post(protectedRoute, add);
bodyLocationRouter.route("/:_id/:userId").get(protectedRoute, getAll);
bodyLocationRouter.route("/:Name/:userId").get(protectedRoute, getByName);
bodyLocationRouter.route("/getById/:ID/:userId").get(protectedRoute, getById);

module.exports = bodyLocationRouter;

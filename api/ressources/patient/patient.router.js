const express = require("express");
const patientRouter = express.Router();

// Controllers
const {
  add,
  getAll,
  getByName,
  getById,
  getByUserId
} = require("./patient.controller");

const { protectedRoute } = require("../../../middleware/protectedRoute");

patientRouter.route("/add/:userId").post(protectedRoute, add);
patientRouter.route("/:userId").get(protectedRoute, getAll);
patientRouter.route("/:_id/:userId").get(protectedRoute, getById);
patientRouter.route("/getByName/:firstName/:userId").get(protectedRoute, getByName);
patientRouter.route("/getByUseId/:userId").get(protectedRoute, getByUserId);

module.exports = patientRouter;

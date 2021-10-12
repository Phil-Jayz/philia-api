const express = require("express");
const patientRouter = express.Router();

// Controllers
const {
  add,
  getAll,
  getByName,
  getByGender,
  getById,
  getByUserId
} = require("./patient.controller");

const { protectedRoute } = require("../../../middleware/protectedRoute");

patientRouter.route("/add/:userPath").post(protectedRoute, add);
patientRouter.route("/:userPath").get(protectedRoute, getAll);
patientRouter.route("/:_id/:userPath").get(protectedRoute, getById);
patientRouter.route("/getByName/:firstName/:userPath").get(protectedRoute, getByName);
patientRouter.route("/getByGender/:gender/:userPath").get(protectedRoute, getByGender);
patientRouter.route("/getByUserId/:userId/:userPath").get(protectedRoute, getByUserId);

module.exports = patientRouter;

const express = require("express");
const patientOtherInfoRouter = express.Router();

// Controllers
const {
  add,
  getAll,
  getById,
  getByPatienId
} = require("./patientOtherInfo.controller");

const { protectedRoute } = require("../../../middleware/protectedRoute");

patientOtherInfoRouter.route("/add/:patientId/:userPath").post(protectedRoute, add);
patientOtherInfoRouter.route("/:userPath").get(protectedRoute, getAll);
patientOtherInfoRouter.route("/:_id/:userPath").get(protectedRoute, getById);
patientOtherInfoRouter.route("/getByPatienId/:patientId/:userPath").get(protectedRoute, getByPatienId);

module.exports = patientOtherInfoRouter;

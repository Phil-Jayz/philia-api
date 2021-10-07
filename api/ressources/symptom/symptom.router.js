const express = require("express");
const symptomRouter = express.Router();

// Controllers
const {
  add,
  getAll,
  getById,
  getByName
} = require("./symptom.controller");

const { protectedRoute } = require("../../../middleware/protectedRoute");

symptomRouter.route("/add/:userPath").post(protectedRoute, add);
symptomRouter.route("/:userPath").get(protectedRoute, getAll);
symptomRouter.route("/:Name/:userPath").get(protectedRoute, getByName);
symptomRouter.route("/getById/:ID/:userPath").get(protectedRoute, getById);

module.exports = symptomRouter;

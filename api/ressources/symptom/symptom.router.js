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

symptomRouter.route("/add:userId").post(protectedRoute, add);
symptomRouter.route("/:userId").get(protectedRoute, getAll);
symptomRouter.route("/:Name/:userId").get(protectedRoute, getByName);
symptomRouter.route("/getById/:ID/:userId").get(protectedRoute, getById);

module.exports = symptomRouter;

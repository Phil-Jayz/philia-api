const express = require("express");
const doctorRouter = express.Router();

// Controllers
const {
  add,
  getAll,
  getByName,
  getByGender,
  getById,
  getBySpeciality,
  getByUserId
} = require("./doctor.controller");

const { protectedRoute } = require("../../../middleware/protectedRoute");

doctorRouter.route("/add/:userPath").post(protectedRoute, add);
doctorRouter.route("/:userPath").get(protectedRoute, getAll);
doctorRouter.route("/:_id/:userPath").get(protectedRoute, getById);
doctorRouter.route("/getByName/:firstName/:userPath").get(protectedRoute, getByName);
doctorRouter.route("/getByGender/:gender/:userPath").get(protectedRoute, getByGender);
doctorRouter.route("/getByUserId/:userId/:userPath").get(protectedRoute, getByUserId);
doctorRouter.route("/getBySpeciality/:speciality/:userPath").get(protectedRoute, getBySpeciality);

module.exports = doctorRouter;

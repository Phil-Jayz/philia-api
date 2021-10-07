const express = require("express");
const specialityRouter = express.Router();

// Controllers
const {
  add,
  getAll,
  getById,
  getByName
} = require("./speciality.controller");

const { protectedRoute } = require("../../../middleware/protectedRoute");

specialityRouter.route("/add/:userPath").post(protectedRoute, add);
specialityRouter.route("/:userPath").get(protectedRoute, getAll);
specialityRouter.route("/:name/:userPath").get(protectedRoute, getByName);
specialityRouter.route("/getById/:_id/:userPath").get(protectedRoute, getById);

module.exports = specialityRouter;

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

specialityRouter.route("/add/:userId").post(protectedRoute, add);
specialityRouter.route("/:userId").get(protectedRoute, getAll);
specialityRouter.route("/:name/:userId").get(protectedRoute, getByName);
specialityRouter.route("/getById/:_id/:userId").get(protectedRoute, getById);

module.exports = specialityRouter;

const express = require("express");
const hospitalRouter = express.Router();

// Controllers
const {
  add,
  getAll,
  getByName,
  getById
} = require("./hospital.controller");

const { protectedRoute } = require("../../../middleware/protectedRoute");

hospitalRouter.route("/add/:userPath").post(protectedRoute, add);
hospitalRouter.route("/:userPath").get(protectedRoute, getAll);
hospitalRouter.route("/:_id/:userPath").get(protectedRoute, getById);
hospitalRouter.route("/getByName/:name/:userPath").get(protectedRoute, getByName);
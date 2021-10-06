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

hospitalRouter.route("/add/:userId").post(protectedRoute, add);
hospitalRouter.route("/:userId").get(protectedRoute, getAll);
hospitalRouter.route("/:_id/:userId").get(protectedRoute, getById);
hospitalRouter.route("/getByName/:name/:userId").get(protectedRoute, getByName);

// module.exports = hospitalRouter;
// app.use(express.json());

// // Mount express-sanitizer middleware here
// app.use(expressSanitizer());

// app.post('/', function(req, res, next) {
//   // replace an HTTP posted body property with the sanitized string
//   const sanitizedString = req.sanitize(req.body.propertyToSanitize);
//   // send the response -- res.body.sanitized = " world"
//   res.send({ sanitized: sanitizedString });
// });
const express = require("express");
const authRouter  = require("./ressources/auth/auth.router");
const bodyLocationRouter = require("./ressources/bodyLocation/bodyLocation.router");
const hospitalRouter = require("./ressources/hospital/hospital.router");
const issueRouter = require("./ressources/issue/issue.router");
const privateRouter = require("./ressources/private/private.router");
const symptomRouter = require("./ressources/symptom/symptom.router");
const specialityRouter = require("./ressources/speciality/speciality.router");
const patientRouter = require("./ressources/patient/patient.router")
const restApi = express.Router();

restApi.use("/user", authRouter);
restApi.use("/issue", issueRouter);
//restApi.use("/hospital", hospitalRouter);
restApi.use("/symptom", symptomRouter);
restApi.use("/private", privateRouter);
restApi.use("/body-location", bodyLocationRouter);
restApi.use("/speciality", specialityRouter);
restApi.use("/patient", patientRouter);

module.exports = restApi;
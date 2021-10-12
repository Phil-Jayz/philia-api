const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide a userId"],
    unique: true,
    ref: "User"
  },
  patientOtherInfoId : {
    type: mongoose.Types.ObjectId,
    ref: "PatientOtherInfo"
  },
  firstName: {
    type: String,
    required: [true, "Please enter your firstName"],
    unique: false,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your lastNamename"],
    unique: false,
  },
  gender: {
    type: String,
    required: [true, "Please provide your gender"],
    unique: false,
  },
  bloodType: {
    type: String,
    required: [true, "Please provide your bloodType (A, B, A+, B+, O)"],
    unique: false,
  },
  height: {
    type: Number,
    required: [true, "Please provide your height in feet"],
    unique: false,
  },
  weight: {
    type: Number,
    required: [true, "Please provide your weight in Kg"],
    unique: false,
  },
  birthDate: {
    type: Date,
    required: [true, "Please provide your birthDate"],
    unique: false,
  }
  
});

const Patient = mongoose.model("Patient", PatientSchema);

module.exports = Patient;

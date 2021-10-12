const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide a userId"],
    unique: true,
    ref: "User"
  },
  speciality: {
    type: Array,
    ref: "Speciality"
  },
  HospitalId: {
    type: Array,
    ref: "Hospital"
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
  country: String,
  city: String,
  zip: String,
  address: String
});

const Doctor = mongoose.model("Doctor", DoctorSchema);

module.exports = Doctor;

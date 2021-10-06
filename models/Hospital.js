const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    unique: true,
  },
  speciality: {
    type: Array,
    ref: "Speciality"
  },
  description: String,
  coverImage: String,
  city: {
    type: String,
    required: [true, "Please provide a city"],
  },
  country: {
    type: String,
    required: [true, "Please provide a country"],
  },
  address: String,
  zip: String,
  email: String,
  phoneNumber: String,
  website: String,
  status: Boolean,
});

const Hospital = mongoose.model("Hospital", HospitalSchema);

module.exports = Hospital;

const mongoose = require("mongoose");

const SpecialitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"]
  },
  description: String
});

const Speciality = mongoose.model("Speciality", SpecialitySchema);

module.exports = Speciality;

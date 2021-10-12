const mongoose = require("mongoose");

const PatientOtherInfoSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please provide a patientId"],
    unique: true,
    ref: "Patient"
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  zip: {
    type: String,
  },
  address: {
    type: String,
  },
  healthMetrics: {
    type: Array
  }
});

const PatientOtherInfo = mongoose.model("PatientOtherInfo", PatientOtherInfoSchema);

module.exports = PatientOtherInfo;

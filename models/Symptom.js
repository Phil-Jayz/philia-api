const mongoose = require("mongoose");

const SymptomSchema = new mongoose.Schema({
  ID: {
    type: Number,
    required: [true, "Please provide an ID"],
    unique: true,
  },
  Name: {
    type: String,
    required: [true, "Please provide a name"]
  }
});

const Symptom = mongoose.model("Symptom", SymptomSchema);

module.exports = Symptom;

const PatientOtherInfo = require("../../../models/PatientOtherInfo");
const Patient = require("../../../models/Patient");

exports.getAll = (req, res, next) => {
  PatientOtherInfo.find({})
    .populate({ path: "patientId", model: "Patient" })
    .exec((err, patientOtherInfo) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: patientOtherInfo });
      }
    });
};

exports.getById = (req, res, next) => {
  const { _id } = req.params;
  PatientOtherInfo.findOne({ _id })
    .populate({ path: "patientId", model: "Patient" })
    .exec((err, patientOtherInfo) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: patientOtherInfo });
      }
    });
};

exports.getByPatienId = (req, res, next) => {
  const { patientId } = req.params;
  PatientOtherInfo.findOne({ patientId })
    .populate({ path: "patientId", model: "Patient" })
    .exec((err, patientOtherInfo) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: patientOtherInfo });
      }
    });
};

exports.add = async (req, res, next) => {
  const { patientId } = req.params;
  const { country, city, zip, address, healthMetrics } = req.body;

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      res.status(404).json({
        success: false,
        error: "No user found with this id, you need to register first",
      });
    } else {
      const patientOtherInfo = await PatientOtherInfo.create({
        patientId,
        country,
        city,
        zip,
        address,
        healthMetrics,
      });

      Patient.patientOtherInfoId = patientOtherInfo._id;
      Patient.save();

      res.status(201).json({
        success: true,
        data: patientOtherInfo,
      });
    }
  } catch (err) {
    next(err);
  }
};

const ErrorResponse = require("../../../utils/errorResponse");
const Patient = require("../../../models/Patient");
const User = require("../../../models/User");

exports.getAll = (req, res, next) => {
  Patient.find({})
    .populate({ path: "userId", model: "User" })
    .exec((err, patient) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: patient });
      }
    });
};

exports.getByName = (req, res, next) => {
  const { fistName } = req.params;
  Patient.find({ fistName })
    .populate({ path: "userId", model: "User" })
    .exec((err, patient) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: patient });
      }
    });
};

exports.getById = (req, res, next) => {
  const { _id } = req.params;
  Patient.findOne({ _id })
    .populate({ path: "userId", model: "User" })
    .exec((err, patient) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: patient });
      }
    });
};

exports.getByUserId = (req, res, next) => {
  const { userId } = req.params;
  Patient.findOne({ userId })
    .populate({ path: "userId", model: "User" })
    .exec((err, patient) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: patient });
      }
    });
};

exports.add = async (req, res, next) => {
  const { userPath } = req.params;
  const { firstName, lastName, gender, bloodType, height, weight, birthDate } =
    req.body;

  try {
    const user = await User.findById(userPath);
    if (!user) {
      res.status(404).json({
        success: false,
        error: "No user found with this id, you need to register first",
      });
    } else  {
      const registeredPatient = await Patient.findOne({userId: userPath});
      if (registeredPatient){
        res.status(400).json({
          success: false,
          error: "Patient already registered with this id, try to register a new account",
        });
      }
      const patient = await Patient.create({
        userId: userPath,
        firstName,
        lastName,
        gender,
        bloodType,
        height,
        weight,
        birthDate,
      });

      user.patientId = patient._id;
      user.save();

      res.status(201).json({
        success: true,
        data: patient,
      });
    }
  } catch (err) {
    next(err);
  }
};

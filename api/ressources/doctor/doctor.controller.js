const ErrorResponse = require("../../../utils/errorResponse");
const Doctor = require("../../../models/Doctor");
const User = require("../../../models/User");

exports.getAll = (req, res, next) => {
  Doctor.find({})
    .populate({ path: "userId", model: "User" }, {path: "hospitalId", model: "Hospital"},{path: "speciality", model: "Speciality"})
    .exec((err, doctor) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: doctor });
      }
    });
};

exports.getByName = (req, res, next) => {
  const { fistName } = req.params;
  Doctor.find({ "fistName": { $regex: '.*' + fistName + '.*' } })
  .populate({ path: "userId", model: "User" }, {path: "hospitalId", model: "Hospital"}, {path: "speciality", model: "Speciality"})
    .exec((err, doctor) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: doctor });
      }
    });
};

exports.getById = (req, res, next) => {
  const { _id } = req.params;
  Doctor.findOne({ _id })
  .populate({ path: "userId", model: "User" }, {path: "hospitalId", model: "Hospital"}, {path: "speciality", model: "Speciality"})
    .exec((err, doctor) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: doctor });
      }
    });
};

exports.getByUserId = (req, res, next) => {
  const { userId } = req.params;
  Doctor.findOne({ userId })
    .populate({ path: "userId", model: "User" }, {path: "hospitalId", model: "Hospital"}, {path: "speciality", model: "Speciality"})
    .exec((err, doctor) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: doctor });
      }
    });
};

exports.getByGender = (req, res, next) => {
  const { gender } = req.params;
  Doctor.find({ gender })
  .populate({ path: "userId", model: "User" }, {path: "hospitalId", model: "Hospital"}, {path: "speciality", model: "Speciality"})
    .exec((err, doctor) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json({ success: true, data: doctor });
      }
    });
  };

  exports.getBySpeciality = (req, res, next) => {
    const { speciality } = req.params;
    Doctor.find({ speciality }).limit(5)
    .populate({ path: "userId", model: "User" }, {path: "hospitalId", model: "Hospital"}, {path: "speciality", model: "Speciality"})
      .exec((err, doctor) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(200).json({ success: true, data: doctor });
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
      const registereddoctor = await Doctor.findOne({userId: userPath});
      if (registereddoctor){
        res.status(400).json({
          success: false,
          error: "Doctor already registered with this id, try to register a new account",
        });
      }
      const doctor = await Doctor.create({
        userId: userPath,
        firstName,
        lastName,
        gender,
        bloodType,
        height,
        weight,
        birthDate,
      });

      user.doctorId = doctor._id;
      user.save();

      res.status(201).json({
        success: true,
        data: doctor,
      });
    }
  } catch (err) {
    next(err);
  }
};

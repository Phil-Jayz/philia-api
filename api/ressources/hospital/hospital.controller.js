const ErrorResponse = require("../../../utils/errorResponse");
const Hospital = require("../../../models/Hospital");

exports.getAll = (req, res, next) => {
    Hospital.find({}).populate({path: "speciality", model: "Speciality"}).exec((err, hospital) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).json({success: true,data: hospital});
        }
    });
};

exports.getByName = (req, res, next) => {
    const {name} = req.params;
    Hospital.find({name}).populate({path: "speciality", model: "Speciality"}).exec((err, hospital) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).json({success: true,data: hospital});
        }
    });
  };

  exports.getById = (req, res, next) => {
    const {_id} = req.params;
    Hospital.find({_id}).populate({path: "speciality", model: "Speciality"}).exec((err, hospital) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).json({success: true,data: hospital});
        }
    });
  };

exports.add = async (req, res, next) => {
  const {
    name,
    speciality,
    description,
    coverImage,
    city,
    country,
    address,
    zip,
    email,
    phoneNumber,
    website
  } = req.body;

  try {
    const hospital = await Hospital.create({
      name,
      speciality,
      description,
      coverImage,
      city,
      country,
      address,
      zip,
      email,
      phoneNumber,
      website
    });

    res
    .status(201)
    .json({
      success: true,
      data: hospital
    });
  } catch (err) {
    next(err);
  }
};

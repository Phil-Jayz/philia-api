const Speciality = require("../../../models/Speciality");

exports.getAll = (req, res, next) => {
    Speciality.find({}).exec((err, speciality) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).json({success: true,data: speciality});
        }
    });
};

exports.getByName = (req, res, next) => {
    const {name} = req.params;
    Speciality.find({name}).exec((err, speciality) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).json({success: true,data: speciality});
        }
    });
};

exports.getById = (req, res, next) => {
    const {_id} = req.params;
    Speciality.find({_id}).exec((err, speciality) => {
        if(err){
            res.status(400).send(err);
        } else {
            res.status(200).json({success: true,data: speciality});
        }
    });
};

exports.add = async (req, res, next) => {
  const {
    name,
    description
  } = req.body;

  try {
    const speciality = await Speciality.create({
        name,
        description
    });

    res
    .status(201)
    .json({
      success: true,
      data: speciality
    });
  } catch (err) {
    next(err);
  }
};

const Symptom = require("../../../models/Symptom");
const symptomsData = require("../../../data/symptoms.json")

exports.getAll = (req, res, next) => {
  const result = symptomsData.sort(function (a, b) {
    return a.ID.toString().localeCompare(b.ID.toString());
  });
  res.status(200).json({success: true,data: result});
    // Symptom.find({}).exec((err, symptom) => {
    //     if(err){
    //         res.status(400).send(err);
    //     } else {
    //         res.status(200).json({success: true,data: symptom});
    //     }
    // });
};

exports.getByName = (req, res, next) => {
    const {Name} = req.params;
    const findByName = item => item.Name === Name;
    const result = filter(findByName, symptomsData )
    res.status(200).json({success: true, data: result});
    // Symptom.find({Name}).exec((err, symptom) => {
    //     if(err){
    //         res.status(400).send(err);
    //     } else {
    //         res.status(200).json({success: true,data: symptom});
    //     }
    // });
};

exports.getById = (req, res, next) => {
    const {ID} = req.params;
    const findById = item => item.ID === parseInt(ID);
    const result = filter(findById, symptomsData )
    res.status(200).json({success: true, data: result});

    // Symptom.find({ID}).exec((err, symptom) => {
    //     if(err){
    //         res.status(400).send(err);
    //     } else {
    //         res.status(200).json({success: true,data: symptom});
    //     }
    // });
};

exports.add = async (req, res, next) => {
  const {
    ID,
    Name
  } = req.body;

  try {
    const symptom = await Symptom.create({
        ID,
        Name
    });

    res
    .status(201)
    .json({
      success: true,
      data: symptom
    });
  } catch (err) {
    next(err);
  }
};

const filter = (predicate, collection) => {
  const result = [];
  for (let item of collection){
    if(predicate(item)){
      result.push(item);
    }
  }

  return result;
}

const BodyLocation = require("../../../models/BodyLocation");
const bodyLocationData = require("../../../data/body-locations.json");

exports.getAll = (req, res, next) => {
  // BodyLocation.find({}).exec((err, bodyLocation) => {
  //     if(err){
  //         res.status(400).send(err);
  //     } else {
  //         res.status(200).json({success: true,data: bodyLocation});
  //     }
  // });
  const result = bodyLocationData.sort(function (a, b) {
    return a.ID.toString().localeCompare(b.ID.toString());
  });
  res.status(200).json({ success: true, data: result });
};

exports.getByName = (req, res, next) => {
  const { Name } = req.params;
  const findByName = (item) => item.Name === Name;
  const result = filter(findByName, bodyLocationData);
  res.status(200).json({ success: true, data: result });
  // BodyLocation.find({Name}).exec((err, bodyLocation) => {
  //     if(err){
  //         res.status(400).send(err);
  //     } else {
  //         res.status(200).json({success: true,data: bodyLocation});
  //     }
  // });
};

exports.getById = (req, res, next) => {
  const { ID } = req.params;
  const findById = (item) => item.ID === parseInt(ID);
  const result = filter(findById, bodyLocationData);
  res.status(200).json({ success: true, data: result });
  // BodyLocation.find({ID}).exec((err, bodyLocation) => {
  //     if(err){
  //         res.status(400).send(err);
  //     } else {
  //         res.status(200).json({success: true,data: bodyLocation});
  //     }
  // });
};

exports.add = async (req, res, next) => {
  const { ID, Name, Location } = req.body;

  try {
    const bodyLocation = await BodyLocation.create({
      ID,
      Name,
      Location,
    });

    res.status(201).json({
      success: true,
      data: bodyLocation,
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

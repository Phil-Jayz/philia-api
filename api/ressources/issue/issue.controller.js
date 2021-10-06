const Issue = require("../../../models/Issue");
const issuesData = require("../../../data/issues.json");

exports.getAll = (req, res, next) => {
  const result = issuesData.sort(function (a, b) {
    return a.ID.toString().localeCompare(b.ID.toString());
  });
  res.status(200).json({ success: true, data: result });
  // Issue.find({}).exec((err, issue) => {
  //     if(err){
  //         res.status(400).send(err);
  //     } else {
  //         res.status(200).json({success: true,data: issue});
  //     }
  // });
};

exports.getByName = (req, res, next) => {
  const { Name } = req.params;
  const findByName = (item) => item.Name === Name;
  const result = filter(findByName, issuesData);
  res.status(200).json({ success: true, data: result });

  // Issue.find({Name}).exec((err, issue) => {
  //     if(err){
  //         res.status(400).send(err);
  //     } else {
  //         res.status(200).json({success: true,data: issue});
  //     }
  // });
};

exports.getById = (req, res, next) => {
  const { ID } = req.params;
  const findById = (item) => item.ID === parseInt(ID);
  const result = filter(findById, issuesData);
  res.status(200).json({ success: true, data: result });

  // Issue.find({ID}).exec((err, issue) => {
  //     if(err){
  //         res.status(400).send(err);
  //     } else {
  //         res.status(200).json({success: true,data: issue});
  //     }
  // });
};

exports.add = async (req, res, next) => {
  const { ID, Name } = req.body;

  try {
    const issue = await Issue.create({
      ID,
      Name,
    });

    res.status(201).json({
      success: true,
      data: issue,
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

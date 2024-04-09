const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appErrors");
const Relation = require("../models/relationModel");
const { createOne, updateOne, deleteOne, getOne } = require("./handlerFactory");
exports.getAllRelations = catchAsync(async (req, res, next) => {
  const relations = await Relation.find({});
  res.status(200).json({
    status: "success",
    data: {
      relations,
    },
  });
});

exports.createRelation = createOne(Relation);
exports.updateRelation = updateOne(Relation);
exports.deleteRelation = deleteOne(Relation);
exports.getRelationById = getOne(Relation);

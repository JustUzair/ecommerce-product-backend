const mongoose = require("mongoose");
const relationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A name of the relation is required"],
  },
  //   relative: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  description: {
    type: String,
    required: [true, "A description is required"],
  },
});

const Relation = mongoose.model("Relation", relationSchema);

module.exports = Relation;

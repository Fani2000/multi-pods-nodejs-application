const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotebookSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: null,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Notebook = mongoose.model("Notebook", NotebookSchema);

module.exports = {
  Notebook,
};

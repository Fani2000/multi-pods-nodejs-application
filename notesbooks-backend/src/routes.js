const express = require("express");
const { Notebook } = require("./models");
const { default: mongoose } = require("mongoose");

const notebookRouter = express.Router();

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Notebook not found." });
  }

  next();
};

notebookRouter.post("/", async (req, res) => {
  try {
    const note = req.body;

    if (!note.name)
      return res.status(400).json({ error: "'name' field is required" });

    const newNotebook = new Notebook({
      name: note.name,
      description: note.description,
    });

    await newNotebook.save();

    res.status(201).send({ message: "Note created successfully", data: note });
  } catch (error) {
    console.error("Error💥💥💥: ", error);
    res.send(500).send({ message: "Failed to create the notebook" });
  }
});

notebookRouter.get("/", async (req, res) => {
  try {
    const notebooks = await Notebook.find();
    return res.status(200).json({ data: notebooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

notebookRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ error: "Notebook not found!" });

    const notebooks = await Notebook.findById(id);

    if (!notebooks)
      return res.status(404).json({ error: "Notebook not found!" });

    return res.status(200).json({ data: notebooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

notebookRouter.put("/:id", validateId, async (req, res) => {
  try {
    const { name, description } = req.body;

    const notebook = await Notebook.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found." });
    }

    return res.json({ data: notebook });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

notebookRouter.delete("/:id", validateId, async (req, res) => {
  try {
    const notebook = await Notebook.findByIdAndDelete(req.params.id);

    if (!notebook) {
      return res.status(404).json({ error: "Notebook not found." });
    }

    return res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = {
  notebookRouter,
};

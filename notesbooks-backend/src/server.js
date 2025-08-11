const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample route to handle a POST request
app.post("/api/notebooks", (req, res) => {
  const note = req.body;
  // Here you would typically save the note to a database
  console.log("Received note:", note);
  res.status(201).send({ message: "Note created successfully", note });
});
// Sample route to handle a GET request
app.get("/api/notebooks", (req, res) => {
  // Here you would typically fetch notes from a database
  const notes = [
    { id: 1, content: "First note" },
    { id: 2, content: "Second note" },
  ];
  res.status(200).send(notes);
});

// MongoDB connection setup
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(port, () => {
      console.log(`Notebooks Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

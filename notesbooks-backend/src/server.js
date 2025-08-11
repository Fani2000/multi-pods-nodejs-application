const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { notebookRouter } = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// setup the router for notebooks
app.use("/api/notebooks", notebookRouter);

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

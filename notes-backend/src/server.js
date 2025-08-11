const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { noteRouter } = require("./routes");

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use("/api/notes", noteRouter);

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

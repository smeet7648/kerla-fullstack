const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const axios = require("axios");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/travel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

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



app.post("/user", async (req, res) => {
try{
    const { name, email,phone, password } = req.body; 

    const user = new User({ name, email,phone, password });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } 
  catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("Server started on port http://localhost:3000");
});


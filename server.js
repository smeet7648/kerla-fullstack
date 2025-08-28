const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/travel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  title: String,
  location: String,
  price: String
});

const User = mongoose.model("User", userSchema);

// booking

app.post("/booking", async (req, res) => {
  try {
    const { title, location, price } = req.body;
    const booking = new Booking({ title, location, price });
    await booking.save();
    res.status(201).json({ message: "Booking created successfully" });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Register User
app.post("/user", async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = new User({ name, email, phone, password });
    await user.save();

    res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "User not found" });

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});

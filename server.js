const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Global LED state
let ledState = "OFF";

// Root route
app.get("/", (req, res) => {
  res.send("ESP32 LED Control Server is running 🚀");
});

// Turn LED ON
app.get("/led/on", (req, res) => {
  ledState = "ON";
  res.json({ status: "ON" });
});

// Turn LED OFF
app.get("/led/off", (req, res) => {
  ledState = "OFF";
  res.json({ status: "OFF" });
});

// ESP32 will fetch this
app.get("/led/status", (req, res) => {
  res.json({ status: ledState });
});

// IMPORTANT for deployment (Render, Railway etc.)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

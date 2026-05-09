import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// This is your shared "command storage"
let deviceState = {
  led: 0
};

// 🌍 Web dashboard sends command here
app.post("/control", (req, res) => {
  const { led } = req.body;
  deviceState.led = led;
  res.json({ message: "Command updated", deviceState });
});

// 📡 ESP32 checks here for latest command
app.get("/state", (req, res) => {
  res.json(deviceState);
});

// simple test route
app.get("/", (req, res) => {
  res.send("ESP32 Control Server is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));

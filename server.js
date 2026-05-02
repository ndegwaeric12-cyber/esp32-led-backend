const express = require("express");
const mqtt = require("mqtt");
const app = express();

const client = mqtt.connect("mqtt://broker.hivemq.com");

app.post("/led/:state", (req, res) => {
  const state = req.params.state.toUpperCase();
  client.publish("erick/led", state);
  res.send("LED " + state);
});

app.listen(3000, () => console.log("Server running on port 3000"));

const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxKg0p-MMGXDRnu-y1kWA24v7d_AG8rpFAZMOjbRJPmZqsMsHugQ6dHXMY57UwWQDnsrg/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    console.log("Script responded:", text);
    res.status(200).send("OK");
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send("Something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`Proxy is running on port ${PORT}`);
});
// api/index.js
const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const baseUrl = process.env.BASE_URL || "https://example.com/";

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Redirect all GET requests
app.get("*", (req, res) => {
  const targetUrl = `${baseUrl}/${req.path}${
    req.query ? "?" + new URLSearchParams(req.query).toString() : ""
  }`;
  res.redirect(301, targetUrl); // Using 301 for permanent redirect
});

app.all("*", (req, res) => {
  res.status(307).redirect(`https://tethry.xyz${req.path}`);
});

module.exports = app;

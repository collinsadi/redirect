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
  const path = req.path.replace(/^\/+/, ""); // remove leading slashes
  const queryString = Object.keys(req.query).length
    ? "?" + new URLSearchParams(req.query).toString()
    : "";

  const targetUrl = `${baseUrl}${path}${queryString}`;
  console.log("Redirectinng to:", targetUrl);
  res.redirect(301, targetUrl);
});

app.all("*", (req, res) => {
  res.status(307).redirect(`${baseUrl}${req.path}`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

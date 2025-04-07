const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let baseUrl = process.env.BASE_URL || "https://example.com/";
if (!baseUrl.endsWith('/')) {
  baseUrl += '/';
}

app.use((req, res) => {
  const originalPathAndQuery = req.originalUrl;
  const pathSegment = originalPathAndQuery.startsWith('/')
    ? originalPathAndQuery.substring(1)
    : originalPathAndQuery;

  const targetUrl = `${baseUrl}${pathSegment}`;
  console.log(`Redirecting ${req.method} ${req.originalUrl} to: ${targetUrl}`);

  res.redirect(308, targetUrl);
});


app.use((err, req, res, next) => {
  console.error("Error => ", err.stack);
  if (!res.headersSent) {
     res.status(500).send("Something broke!");
  } else {
     next(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Redirecting all requests to base URL: ${baseUrl}`);
});

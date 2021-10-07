require("dotenv").config({ path: "./config.env" });
const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const expressSanitizer = require("express-sanitizer");
const helmet = require("helmet");
const axios = require("axios");
const app = express();
const https = require("https");
const path = require("path");
const fs = require("fs");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
require("./config/redis");

const restRApi = require("./api");

connectDB();
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.options("*", cors());
app.use(expressSanitizer());
app.use(helmet());
app.use(
  helmet.hsts({
    maxAge: 0,
  })
);

app.get("/", (req, res, next) => {
  res.send("secure server running on port 5000");
});

app.get("/test", (req, res, next) => {
  axios
    .get("https://localhost:5000/doc/6154f1dbf51727803c64a0cc/cert/public.pem")
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.json(error);
    });
});

app.use("/doc", express.static(path.join(__dirname, "public/users")));
app.use("/", restRApi);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const sslServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);
sslServer.listen(PORT, () => console.log(`Sever running on port ${PORT}`));
// const server = app.listen(PORT, () =>
//   console.log(`Sever running on port ${PORT}`)
// );

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

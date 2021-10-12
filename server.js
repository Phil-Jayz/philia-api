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
const swaggerJsdocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
require("./config/redis");

const restRApi = require("./api");

connectDB();
const swaggerOptions = {
  swaggerDefinition: {
    //openapi: '3.0.0',
    info: {
      title: 'Philia Personal Medical AI Assistant',
      version: '1.0.0',
      description: 'Philia is a personal medical AI assistant to help the patients',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'SendMore, Inc', 
        email: 'info@sendmorenow.com',
        url: 'https://sendmorenow.com',
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
      {
        url: 'https://philia.philodi.com',
        description: 'Production server',
      }
    ]
  }, 
  apis: ["server.js", ]
};

const swaggerDocs = swaggerJsdocs(swaggerOptions);


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


/**
 *  @swagger
 *  /philia:
 *    get: 
 *      description: the entry endpoint
 *      responses: 
 *        '200':
 *          secure server running on port 5000
 * 
 */
app.get("/philia", (req, res, next) => {
  res.send("secure server running on port 5000");
});

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 23
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
app.get("/test", (req, res, next) => {
  // axios
  //   .get("https://localhost:5000/doc/6154f1dbf51727803c64a0cc/cert/public.pem")
  //   .then((response) => {
  //     res.status(200).json(response.data);
  //   })
  //   .catch((error) => {
  //     res.json(error);
  //   });
  res(200).json("secure server running on port 5000");
});


/**
 *  @swagger
 *
 *  /login:
 *    post:
 *      description: public and private key for the users
 *      produces:
 *        - application/json
 *      parameters:
 *        - name: username
 *          in: json
 *          required: true
 *          type: string
 *        - name: password
 *          in: json
 *          required: true
 *          type: string
 *      responses: 
 *        '200':
 *          the user to pairs keys
 */
 app.post('/login', (req, res) => {
  res.send("secure server running on post");
});


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 *  @swagger
 *  /doc:
 *    get: 
 *      description: public and private key for the users
 *      responses: 
 *        '200':
 *          the user to pairs keys
 * 
 */
app.use("/doc", express.static(path.join(__dirname, "public/users")));

/**
 *  @swagger
 *  /api:
 *    get: 
 *      description: Actual APIS endpoint
 *      responses: 
 *        '200':
 *          all the  actual APIS
 * 
 */
app.use("/api", restRApi);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// const sslServer = https.createServer(
//   {
//     key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
//     cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
//   },
//   app
// );
// sslServer.listen(PORT, () => console.log(`Sever running on port ${PORT}`));
const server = app.listen(PORT, () =>
  console.log(`Sever running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const cors = require("cors");
const multer = require("multer");
const https = require("https");
const fs = require("fs");

require("./db.js");

const server = express();
server.name = "API";

server.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
server.use(bodyParser.json({ limit: "50mb" }));
server.use(morgan("dev"));
server.use(cors());
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
server.options("", (req, res) => {
  res.header("Access-Control-Allow-Origin", "");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.sendStatus(204); // No content in the response
});



server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

// Ruta de ejemplo
server.get("/", (req, res) => {
  res.send("Servidor seguro!");
});

// Leer los archivos del certificado SSL
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/gotalentsglobal.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/gotalentsglobal.com/cert.pem')
};

// Crear el servidor HTTPS
https.createServer(options, server).listen(443, () => {
  console.log("Servidor escuchando en el puerto 443");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

server.use("/", routes);

const upload = multer({ storage: storage });


module.exports = server;

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const moviesRoute = require("./src/routes/movies.routes");

PORT = 3002;
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(cors("*"));

server.use(moviesRoute);
server.listen(PORT, () => {});

module.exports = server;

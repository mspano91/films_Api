const { Router } = require("express");
const { handlerCategories, handlerMovies } = require("../handlers/handlers");

const moviesRoute = Router();

moviesRoute.get("/cat", handlerCategories);
moviesRoute.get("/movies", handlerMovies);

module.exports = moviesRoute;

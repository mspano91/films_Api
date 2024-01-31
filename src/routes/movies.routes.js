const { Router } = require("express");
const {
  handlerCategories,
  handlerMovies,
  handlerTrailers,
} = require("../handlers/handlers");

const moviesRoute = Router();

moviesRoute.get("/cat", handlerCategories);
moviesRoute.get("/movies", handlerMovies);
moviesRoute.get("/trailer", handlerTrailers);

module.exports = moviesRoute;

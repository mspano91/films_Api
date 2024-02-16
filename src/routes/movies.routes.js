const { Router } = require("express");
const {
  handlerCategories,
  handlerMovies,
  handlerTrailers,
  handlerCatbyId,
  handlerTrailersByCat,
} = require("../handlers/handlers");

const moviesRoute = Router();

moviesRoute.get("/cat", handlerCategories);
moviesRoute.get("/movies", handlerMovies);
moviesRoute.get("/trailerByCat/:id", handlerTrailersByCat);
moviesRoute.get("/trailer/:id", handlerTrailers);
moviesRoute.get("/sections/:id", handlerCatbyId);

module.exports = moviesRoute;

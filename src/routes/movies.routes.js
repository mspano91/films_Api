const { Router } = require("express");
const {
  handlerCategories,
  handlerMovies,
  handlerTrailers,
  handlerCatbyId,
  handlerTrailersByCat,
  handlerSearchMovies,
} = require("../handlers/handlers");

const moviesRoute = Router();

moviesRoute.get("/cat", handlerCategories);
moviesRoute.get("/movies", handlerMovies);
moviesRoute.get("/movies/:searchKey", handlerSearchMovies);
moviesRoute.get("/trailerByCat/:id", handlerTrailersByCat);
moviesRoute.get("/trailer/:id", handlerTrailers);
moviesRoute.get("/sections/:id", handlerCatbyId);

module.exports = moviesRoute;

const { Router } = require("express");
const { handlerCategories } = require("../handlers/handlerCat");

const moviesRoute = Router();

moviesRoute.get("/cat", handlerCategories);

module.exports = moviesRoute;

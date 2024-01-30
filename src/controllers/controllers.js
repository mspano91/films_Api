const axios = require("axios");
require("dotenv").config();
const API_URL = "https://api.themoviedb.org/3";
const URL_Category = "https://api.themoviedb.org/3/genre/movie/list?";
const API_KEY = process.env.KEY;

const controllerCategories = async () => {
  try {
    const response = await axios.get(`${URL_Category}`, {
      params: {
        api_key: API_KEY,
      },
    });
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const controllerMovies = async () => {
  const type = "discover";
  const params = {
    api_key: API_KEY,
  };

  try {
    const response = await axios.get(`${API_URL}/${type}/movie`, { params });
    const moviesData = response.data.results.map((movie) => {
      const { adult, backdrop_path, vote_count, ...rest } = movie;
      return rest;
    });
    console.log(moviesData);
    return moviesData;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

module.exports = { controllerCategories, controllerMovies };

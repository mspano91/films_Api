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
      const { adult, backdrop_path, vote_count, release_date, ...rest } = movie;
      const formattedReleaseDate = new Date(release_date).toISOString(); //aca hay un problema con el dato proporcionado de la fecha entonces lo modificamos para que lo guarde la base de datos
      return { ...rest, release_date: formattedReleaseDate };
    });
    console.log(moviesData);
    return moviesData;
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
};

const controllerTrailers = async (movieId) => {
  try {
    const trailers = await axios.get(`${API_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });
    console.log(trailers);
    if (trailers.data.videos && trailers.data.videos.results) {
      const trailer = trailers.data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );

      return trailer;
    }
  } catch (error) {
    console.error("Error fetching official trailer:", error);
  }
};

module.exports = { controllerCategories, controllerMovies, controllerTrailers };

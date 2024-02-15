const axios = require("axios");
require("dotenv").config();
const API_URL = "https://api.themoviedb.org/3";
const URL_Category = "https://api.themoviedb.org/3/genre/movie/list?";
const URL_catId = "https://api.themoviedb.org/3/discover/movie?";
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

const getMoviesByCategory = async (genreId) => {
  try {
    console.log(`soy el CATBYID controller ${genreId}`);
    const response = await axios.get(`${URL_catId}`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId, // Aquí debes colocar el parámetro dentro del objeto params
      },
    });
    console.log(response.data.results);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching categories movie list:", error);
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
      const { adult, vote_count, release_date, ...rest } = movie;
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
  console.log(`controlador del trailer ${movieId}`);
  try {
    const response = await axios.get(`${API_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (
      response.data.videos &&
      response.data.videos.results &&
      response.data.videos.results.length > 0
    ) {
      const trailers = response.data.videos.results;

      const officialTrailer = trailers.find(
        (vid) => vid.name === "Official Trailer"
      );

      if (officialTrailer) {
        console.log("Reproduciendo el tráiler oficial:", officialTrailer);
        return officialTrailer;
      } else {
        // Si no se encuentra el tráiler oficial, reproducir el primer tráiler
        const firstTrailer = trailers.length > 0 ? trailers[0] : null;

        if (firstTrailer) {
          console.log("Reproduciendo el primer tráiler:", firstTrailer);
          return firstTrailer;
        } else {
          console.log("No se encontraron tráilers disponibles.");
          return null; // O cualquier valor por defecto que desees devolver
        }
      }
    }
  } catch (error) {
    console.error("Error fetching trailers:", error);
    return null;
  }
};

module.exports = {
  controllerCategories,
  controllerMovies,
  controllerTrailers,
  getMoviesByCategory,
};

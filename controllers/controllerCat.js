const axios = require("axios");
const URL_Category = "https://api.themoviedb.org/3/genre/movie/list?";
const API_KEY = "7dfe9036431542407fb366d5baaea028";

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

module.exports = { controllerCategories };

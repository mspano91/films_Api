const prisma = require("../../../client/db");
const {
  controllerCategories,
  controllerMovies,
  controllerTrailers,
  getMoviesByCategory,
  controllerTrailersCat,
} = require("../controllers/controllers");

const handlerCategories = async (req, res) => {
  try {
    // Intenta obtener la información de la base de datos
    const existingCategories = await prisma.categories.findMany();

    if (existingCategories.length > 0) {
      // Si hay datos en la base de datos, retorna esos datos
      return res.status(200).json(existingCategories);
    }

    const categories = await controllerCategories();

    const categoriesData = categories.genres.map((category) => ({
      id: category.id,
      name: category.name,
    }));

    // Insertar categorías en la base de datos de Prisma
    await prisma.categories.createMany({
      data: categoriesData,
      skipDuplicates: true, // Ignora duplicados en caso de que algunos ya existan
    });
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  } finally {
    // Asegurarse de cerrar la conexión al finalizar
    await prisma.$disconnect();
  }
};

const handlerSearchMovies = async (req, res) => {
  try {
    const searchKey = req.params.searchKey;
    const moviesList = await controllerMovies(searchKey);
    const moviesData = moviesList.map((movies) => ({
      id: movies.id,
      original_language: movies.original_language,
      original_title: movies.original_title,
      overview: movies.overview,
      popularity: movies.popularity,
      poster_path: movies.poster_path,
      backdrop_path: movies.backdrop_path,
      release_date: movies.release_date,
      title: movies.title,
      video: movies.video,
      vote_average: movies.vote_average,
      genre_ids: movies.genre_ids,
    }));
    return res.status(200).json(moviesData);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const handlerMovies = async (req, res) => {
  try {
    // Intenta obtener la información de la base de datos
    const existingMovies = await prisma.movies.findMany();

    if (existingMovies.length > 0) {
      // Si hay datos en la base de datos, retorna esos datos
      return res.status(200).json(existingMovies);
    }

    // Si no hay datos en la base de datos, realiza la petición a la URL
    const searchKey = req.params.searchKey;
    const moviesList = await controllerMovies(searchKey);

    // Guarda la información en la base de datos
    const moviesData = moviesList.map((movies) => ({
      id: movies.id,
      original_language: movies.original_language,
      original_title: movies.original_title,
      overview: movies.overview,
      popularity: movies.popularity,
      poster_path: movies.poster_path,
      backdrop_path: movies.backdrop_path,
      release_date: movies.release_date,
      title: movies.title,
      video: movies.video,
      vote_average: movies.vote_average,
      genre_ids: movies.genre_ids,
    }));

    await prisma.movies.createMany({
      data: moviesData,
      skipDuplicates: true,
    });

    // Retorna los datos obtenidos de la URL
    return res.status(200).json(moviesList);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  } finally {
    // Asegurarse de cerrar la conexión al finalizar
    await prisma.$disconnect();
  }
};

const handlerCatbyId = async (req, res) => {
  try {
    const movieId = req.params.id;
    console.log(`soy el CATBYID ${movieId}`);
    const list = await getMoviesByCategory(movieId);
    const moviesData = list.map((movies) => ({
      id: movies.id,
      original_language: movies.original_language,
      original_title: movies.original_title,
      overview: movies.overview,
      popularity: movies.popularity,
      poster_path: movies.poster_path,
      backdrop_path: movies.backdrop_path,
      release_date: movies.release_date,
      title: movies.title,
      video: movies.video,
      vote_average: movies.vote_average,
      genre_ids: movies.genre_ids,
    }));

    return res.status(200).json(moviesData);
  } catch {
    return res.status(400).json(error(error.message));
  }
};

const handlerTrailers = async (req, res) => {
  try {
    const movieId = req.params.id;
    console.log(`soy el handler ${movieId}`);
    if (!movieId) {
      return res
        .status(400)
        .json({ error: "Missing movie ID in query parameters" });
    }

    const trailer = await controllerTrailers(movieId);

    console.log(`como vuelve la info al handler ${trailer}`);

    if (trailer) {
      return res.status(200).json(trailer);
    } else {
      return res.status(404).json({ error: "Trailer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handlerTrailersByCat = async (req, res) => {
  try {
    const movieId = req.params.id;
    console.log(`soy el handler ${movieId}`);
    if (!movieId) {
      return res
        .status(400)
        .json({ error: "Missing movie ID in query parameters" });
    }

    const trailer = await controllerTrailersCat(movieId);

    console.log(`como vuelve la info al handler ${trailer}`);

    if (trailer) {
      return res.status(200).json(trailer);
    } else {
      return res.status(404).json({ error: "Trailer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  handlerCategories,
  handlerMovies,
  handlerTrailers,
  handlerCatbyId,
  handlerTrailersByCat,
  handlerSearchMovies,
};

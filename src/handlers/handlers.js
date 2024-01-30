const prisma = require("../../../client/db");
const {
  controllerCategories,
  controllerMovies,
} = require("../controllers/controllers");

const handlerCategories = async (req, res) => {
  try {
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

const handlerMovies = async (req, res) => {
  try {
    const moviesList = await controllerMovies();
    return res.status(200).json(moviesList);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { handlerCategories, handlerMovies };

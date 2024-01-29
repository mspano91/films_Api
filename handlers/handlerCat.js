const { controllerCategories } = require("../controllers/controllerCat");

const handlerCategories = async (req, res) => {
  try {
    const categories = await controllerCategories();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ erorr: error.message });
  }
};

module.exports = { handlerCategories };

const {
  getTalentsController,
  getTalentByLastNameController,
} = require("../../controllers/talent/getTalentController");

const getTalentsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    if (name) {
      const response = await getTalentByLastNameController(name);
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron resultados similares." });
      }
      return res.status(200).json(response);
    } else {
      const response = await getTalentsController();
      res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getTalentDetailHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getTalentByIdController(id);
    return res.status(200).json(response);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "Talento ID no encontrado" });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTalentsHandler,
  getTalentDetailHandler,
};

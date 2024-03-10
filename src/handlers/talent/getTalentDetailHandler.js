const {
  getTalentByIdController,
} = require("../../controllers/talent/getTalentController");

const getTalentDetailHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getTalentDetailController(id);
    return res.status(200).json(response);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "Talento ID no encontrado" });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTalentDetailHandler,
};


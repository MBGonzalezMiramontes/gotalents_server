const {
  getTalentsController,
  getTalentByLastnameController,
} = require("../../controllers/talent/getTalentController");

const getTalentsHandler = async (req, res) => {
  const { lastname } = req.query;
  try {
    if (lastname) {
      const response = await getTalentByLastnameController(lastname);
      res.status(200).json(response);
    } else {
      const response = await getTalentsController();
      res.status(200).json(response);
    }
  } catch (error) {
    console.error("Error in getTalentsHandler:", error);
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

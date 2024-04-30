const {
  postTalentController,
} = require("../../controllers/talent/postTalentController");

const postTalentHandler = async (req, res) => {
  try {
    const { name, lastname, position, email, phone } = req.body;
    console.log("Datos recibidos en el handler:", { name, lastname, position, email, phone });

    const files = req.files;
    console.log("Archivos recibidos en el handler:", files);
    
    const response = await postTalentController({
      name,
      lastname,
      position,
      email,
      phone,
      files,
    });

    res.status(201).json(response);
  } catch (error) {
    console.error("Error en postTalentHandler:", error);
    // Manejar el error del proceso de creación del talento
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postTalentHandler };

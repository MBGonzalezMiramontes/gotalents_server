const {
  postTalentController,
} = require("../../controllers/talent/postTalentController");

const postTalentHandler = async (req, res) => {
  try {
    const { name, lastname, position, email, phone, cvFile, languageFile } =
      req.body;

    const response = await postTalentController({
      name,
      lastname,
      position,
      email,
      phone,
      cvFile,
      languageFile,
    });

    res.status(201).json(response);
  } catch (error) {
    console.error("Error en postTalentHandler:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postTalentHandler };

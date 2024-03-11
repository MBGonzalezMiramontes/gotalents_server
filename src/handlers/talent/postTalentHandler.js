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

    if (response.error) {
      return res.status(400).json({ error: response.error });
    }
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postTalentHandler };

const {
  postCompanyController,
} = require("../../controllers/company/postCompanyController");

const postCompanyHandler = async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);
   
    const { name, lastname, companyName, email, phone, category } = req.body;
    const cvFile = req.files.find(file => file.fieldname === 'cvFile');
    const languageFile = req.files.find(file => file.fieldname === 'languageFile');
    
    console.log("Archivos recibidos:", cvFile, languageFile);

    const response = await postCompanyController({
      name,
      lastname,
      companyName,
      email,
      phone,
      category,
    });

    if (response.error) {
      return res.status(400).json({ error: response.error });
    }
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { postCompanyHandler };

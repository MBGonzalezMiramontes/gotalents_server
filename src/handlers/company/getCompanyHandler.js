const {
  getCompanyController,
  getCompanyByCompanyName,
} = require("../../controllers/company/getCompanyController");

const getCompanyHandler = async (req, res) => {
  try {
    const { companyName } = req.query;
    if (companyName) {
      const response = await getCompanyByCompanyName(companyName);
      if (response.length === 0) {
        return res
          .status(404)
          .json({ message: "No se encontraron resultados similares." });
      }
      return res.status(200).json(response);
    } else {
      const response = await getCompanyController();
      res.status(200).json(response);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCompanyHandler,
};


const {
  getCompaniesController,
  getCompanyByCompanyName,
  getCompanyByIdController,
} = require("../../controllers/company/getCompanyController");

const getCompaniesHandler = async (req, res) => {
  const { companyName } = req.query;
  try {
    if (companyName) {
      const response = await getCompanyByCompanyName(companyName);
      res.status(200).json(response);
    } else {
      const response = await getCompaniesController();
      res.status(200).json(response);
    }
  } catch (error) {
    console.error("Error in getCompaniesHandler:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getCompanyDetailHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getCompanyByIdController(id);
    return res.status(200).json(response);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: "Compañía ID no encontrado" });
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCompaniesHandler,
  getCompanyDetailHandler,
};

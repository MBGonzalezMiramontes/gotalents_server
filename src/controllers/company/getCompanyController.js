const { Company } = require("../../db");
const axios = require("axios");

const getCompaniesController = async () => {
  const allCompanies = await Company.findAll();
  return allCompanies;
};

const getCompanyByCompanyName = async (companyName) => {
  const lowerCaseCompanyName = companyName.toLowerCase();

  const allCompanies = await getCompaniesController();

  // Filtrar las compañías por nombre
  const companiesFiltered = allCompanies.filter((company) =>
    company.companyName.toLowerCase().includes(lowerCaseCompanyName)
  );

  if (companiesFiltered.length < 1) {
    throw new Error(
      `No se encontraron compañías con el nombre: ${companyName}`
    );
  }

  return companiesFiltered;
};

const getCompanyByIdController = async (id) => {
  if (!id) {
    throw new Error("ID no proporcionado");
  }

  let company = null;

  // Verifica si el ID es un UUID válido
  const isUUID =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      id
    );

  if (isUUID) {
    // Buscar en la base de datos por UUID
    company = await Company.findByPk(id);
  } else {
    throw new Error("ID no válido");
  }

  if (!company) {
    throw new Error("Compañía no encontrado");
  }

  return company;
};

module.exports = {
  getCompaniesController,
  getCompanyByCompanyName,
  getCompanyByIdController,
};

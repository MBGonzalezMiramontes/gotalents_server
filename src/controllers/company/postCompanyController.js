const { Company } = require("../../db");

const checkCompanyExists = async (email) => {
  const existingCompany = await Company.findOne({ where: { email: email } });
  return !!existingCompany;
};

const postCompanyController = async ({
  name,
  lastname,
  companyName,
  email,
  phone,
  category,
}) => {
  const companyExists = await checkCompanyExists(email);

  if (companyExists) {
    throw new Error("El email de la compañía ya existe.");
  }

  const company = await Company.create({
    name,
    lastname,
    companyName,
    email,
    phone,
    category,
  });
  return company;
};

module.exports = { postCompanyController };

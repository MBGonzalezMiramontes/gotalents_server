const { Company } = require("../../db");
const transporter = require("../../utils/mailer");
const EMAIL = process.env.EMAIL;

const checkCompanyExists = async (email) => {
  const existingCompany = await Company.findOne({ where: { email: email } });
  return !!existingCompany;
};

const sendEmail = async (
  name,
  lastname,
  companyName,
  email,
  phone,
  category
) => {
  const mailOptions = {
    from: EMAIL,
    to: "bbelu.gonzalez@hotmail.com",
    subject: `Una compañía se ha contactado: ${companyName}`,
    text: `Compañía:${companyName},
    Rubro: ${category},
    Nombre: ${name},
    Apellido: ${lastname},
    Email: ${email},
    Teléfono de contacto: ${phone},`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending payment notification email: " + error);
  }
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

  sendEmail(name, lastname, companyName, email, phone, category);

  return company;
};

module.exports = { postCompanyController };

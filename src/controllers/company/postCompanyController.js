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
    to: "hire@gotalentsglobal.com",
    subject: `Una compañía se ha contactado: ${companyName}`,
    html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
              p {
                margin-bottom: 10px;
              }
              strong {
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Una compañía se ha contactado:</h1>
              <p><strong>Compañía:</strong> ${companyName}</p>
              <p><strong>Rubro:</strong> ${category}</p>
              <p><strong>Nombre:</strong> ${name}</p>
              <p><strong>Apellido:</strong> ${lastname}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Teléfono de contacto:</strong> ${phone}</p>
            </div>
          </body>
        </html>
      `,
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

  console.log("Creando nueva compañía en la base de datos...");
  const company = await Company.create({
    name,
    lastname,
    companyName,
    email,
    phone,
    category,
  });

  try {
    await sendEmail(name, lastname, companyName, email, phone, category);
  } catch (error) {
    // Devolver una respuesta de error si ocurre un problema al enviar el correo electrónico
    throw new Error("Error sending email: " + error.message);
  }

  return company;
};

module.exports = { postCompanyController };

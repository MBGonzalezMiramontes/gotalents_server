const transporter = require("./mailer");
const EMAIL = process.env.EMAIL;

const sendTalentEmail = async (talentInfo, fileUrls) => {
  try {
    const cvPreviewUrl = `${fileUrls.cvUrl.slice(0, -4)}.png`; // Cambiar la extensión a PNG para una vista previa
    const languagePreviewUrl = `${fileUrls.languageUrl.slice(0, -4)}.png`; // Cambiar la extensión a PNG para una vista previa

    const mailOptions = {
      from: EMAIL,
      to: "bbelu.gonzalez@hotmail.com",
      subject: `Nuevo talento registrado ${talentInfo.lastname}, ${talentInfo.name}`,
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
              a {
                color: #007bff;
                text-decoration: none;
              }
              a:hover {
                text-decoration: underline;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Nuevo talento registrado</h1>
              <p><strong>Nombre:</strong> ${talentInfo.name}</p>
              <p><strong>Apellido:</strong> ${talentInfo.lastname}</p>
              <p><strong>Posición:</strong> ${talentInfo.position}</p>
              <p><strong>Email:</strong> ${talentInfo.email}</p>
              <p><strong>Teléfono:</strong> ${talentInfo.phone}</p>
              <p><strong>Enlace a la vista previa del CV:</strong> <a href="${cvPreviewUrl}">${cvPreviewUrl}</a></p>
              <p><strong>Enlace a la vista previa del archivo de idioma:</strong> <a href="${languagePreviewUrl}">${languagePreviewUrl}</a></p>
            </div>
          </body>
        </html>
      `,
    };

    // Envía el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado:", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
};

module.exports = sendTalentEmail;

const transporter = require("./mailer");
const EMAIL = process.env.EMAIL;

const sendTalentEmail = async (talentInfo, fileUrls) => {
  try {
    const cvPreviewUrl = `${fileUrls.cvUrl.slice(0, -4)}.png`; // Cambiar la extensión a PNG para una vista previa

    const mailOptions = {
      from: EMAIL,
      to: "bbelu.gonzalez@hotmail.com",
      subject: `Nuevo talento registrado ${talentInfo.lastname}, ${talentInfo.name}`,
      html: `
        <html>
          <head>
            <style>
              /* Estilos */
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
              ${
                fileUrls.languageUrl
                  ? `<p><strong>Enlace a la vista previa del archivo de idioma:</strong> <a href="${fileUrls.languageUrl}">${fileUrls.languageUrl}</a></p>`
                  : ""
              } <!-- Mostramos el enlace al archivo de idioma solo si existe -->
            </div>
          </body>
        </html>
      `,
    };

    if (fileUrls.languageUrl) {
      const languagePreviewUrl = `${fileUrls.languageUrl.slice(0, -4)}.png`; // Cambiar la extensión a PNG para una vista previa

      mailOptions.html += `<p><strong>Enlace a la vista previa del archivo de idioma:</strong> <a href="${languagePreviewUrl}">${languagePreviewUrl}</a></p>`;
    }

    // Envía el correo electrónico
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo electrónico enviado:", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo electrónico:", error);
    throw error;
  }
};

module.exports = sendTalentEmail;

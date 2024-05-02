const { Talent } = require("../../db");
const cloudinaryUpload = require("../../utils/cloudinaryUpload");
const sendTalentEmail = require("../../utils/sendTalentEmail");

const checkTalentExists = async (email) => {
  const existingTalent = await Talent.findOne({ where: { email: email } });
  return !!existingTalent;
};

const postTalentController = async ({
  name,
  lastname,
  position,
  email,
  phone,
  files,
}) => {
  try {
    // Llamar a saveFiles con el array de archivos
    const cvFilePath = files.find((file) => file.fieldname === "cvFile").path;
    const languageFile = files.find(
      (file) => file.fieldname === "languageFile"
    )?.path;

    const talentExists = await checkTalentExists(email);
    if (talentExists) {
      throw new Error("El email del talento ya existe.");
    }

    const cvUrl = await cloudinaryUpload(cvFilePath);
    const languageUrl = languageFile
      ? await cloudinaryUpload(languageFile)
      : null; // Si hay un archivo de idioma, lo subimos a Cloudinary

    const talent = await Talent.create({
      name,
      lastname,
      position,
      email,
      phone,
      cvUrl,
      languageUrl,
    });

    await sendTalentEmail(
      { name, lastname, position, email, phone },
      { cvUrl, languageUrl }
    );

    return talent;
  } catch (error) {
    console.error("Error en postTalentController:", error);
    throw error;
  }
};

module.exports = { postTalentController };

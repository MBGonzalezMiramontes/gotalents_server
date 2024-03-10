const { Talent } = require("../../db");
const { Op } = require("sequelize");

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
  cvFile,
  languageFile,
}) => {
  const talentExists = await checkTalentExists(email);

  if (talentExists) {
    throw new Error("El email del talento ya existe.");
  }

  const talent = await Talent.create({
    name,
    lastname,
    position,
    email,
    phone,
    cvFile,
    languageFile,
  });
  
};

module.exports = { postTalentController };

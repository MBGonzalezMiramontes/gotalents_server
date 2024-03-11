const { Talent } = require("../../db");

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

  return talent;
};

module.exports = { postTalentController };

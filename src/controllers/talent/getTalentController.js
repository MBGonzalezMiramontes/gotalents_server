const { Talent } = require("../../db");
const axios = require("axios");

const getTalentsController = async () => {
  const allTalents = await Talent.findAll();
  return allTalents;
};

const getTalentByLastnameController = async (lastname) => {
  const lowerCaseLastname = lastname.toLowerCase();

  const allTalents = await getTalentsController();

  // Filtrar las talentos por apellido
  const talentsFiltered = allTalents.filter(
    (talent) =>
      talent.lastname &&
      talent.lastname.toLowerCase().includes(lowerCaseLastname)
  );

  if (talentsFiltered.length < 1) {
    throw new Error(`No se encontraron talentos con el apelldio: ${lastname}`);
  }

  return talentsFiltered;
};

const getTalentByIdController = async (id) => {
  if (!id) {
    throw new Error("ID no proporcionado");
  }

  let talent = null;

  // Verifica si el ID es un UUID válido
  const isUUID =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      id
    );

  if (isUUID) {
    // Buscar en la base de datos por UUID
    talent = await Talent.findByPk(id);
  } else {
    throw new Error("ID no válido");
  }

  if (!talent) {
    throw new Error("Talento no encontrado");
  }

  return talent;
};

module.exports = {
  getTalentsController,
  getTalentByLastnameController,
  getTalentByIdController,
};

const { Talent } = require("../../db");
const { Op } = require("sequelize");
const axios = require("axios");

const getTalentsController = async () => {
  try {
    const dataFromDB = await Driver.findAll();

    const url = "http://localhost:5000/gotalents";
    const response = await axios.get(url);
    const dataFromApi = response.data.map(formatApiTalentResponse);

    return [...dataFromDB, ...dataFromApi];
  } catch (error) {
    throw error;
  }
};

const getTalentByLastName = async (lastName) => {
  try {
    const lowerCaseLastName = lastName.toLowerCase();
    const condition = lastName
      ? { lastName: { [Op.iLike]: `%${lastName}%` } }
      : {};

    const url = `http://localhost:5000/gotalents`;
    const response = await axios.get(url);
    const dataFromApi = response.data
      .filter((talent) =>
        talent.lastName.forename.toLowerCase().includes(lowerCaseLastName)
      )
      .map(formatApiTalentResponse);

    const dataFromDB = await Talent.findAll({
      order: [["lastName", "ASC"]],
      limit: 15,
    });

    const combinedResults = [...dataFromDB, ...dataFromApi];
    return combinedResults;
  } catch (error) {
    throw error;
  }
};

const getTalentByIdController = async (id) => {
  try {
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
      // Buscar en la API por número entero
      const apiUrl = `http://localhost:5000/gotalent/${id}`;
      const response = await axios.get(apiUrl);
      talent = response.data;

      talent = formatApiTalentResponse(talent);
    }

    if (!talent) {
      throw new Error("Talento no encontrado");
    }

    return talent;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTalentsController,
  getTalentByLastName,
  getTalentByIdController,
};

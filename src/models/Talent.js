const { DataTypes } = require("sequelize");
const mimeTypes = require("mime-types");
module.exports = (sequelize) => {
  const Talent = sequelize.define("Talent", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cvFile: {
      type: DataTypes.BLOB, // Usar BLOB para almacenar archivos binarios (como PDF)
      allowNull: false,
      validate: {
        isPDF(value) {
          if (!value) {
            throw new Error("CV file is required");
          }
          const mimeType = mimeTypes.lookup(value.mimetype);
          if (mimeType !== "application/pdf") {
            throw new Error("File must be in PDF format");
          }
        },
      },
    },
    languageFile: {
      type: DataTypes.BLOB,
      allowNull: true,
      validate: {
        isPDF(value) {
          if (!value) {
            throw new Error("Language file is required");
          }
          const mimeType = mimeTypes.lookup(value.mimetype);
          if (mimeType !== "application/pdf") {
            throw new Error("File must be in PDF format");
          }
        },
      },
    },
  });
  return Talent;
};

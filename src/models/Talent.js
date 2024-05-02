const { DataTypes } = require("sequelize");
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
      allowNull: false,
    },
    cvFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    languageFile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Talent;
};

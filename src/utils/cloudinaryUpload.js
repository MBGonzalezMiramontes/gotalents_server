const cloudinary = require("./cluodinaryConfig"); // Importa tu configuración de Cloudinary

const cloudinaryUpload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file); // Sube el archivo a Cloudinary
    return result.secure_url; // Retorna la URL del archivo en Cloudinary
  } catch (error) {
    throw error;
  }
};

module.exports = cloudinaryUpload;

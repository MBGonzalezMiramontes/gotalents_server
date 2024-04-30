const cloudinary = require("./cluodinaryConfig"); // Importa tu configuración de Cloudinary

const cloudinaryUpload = async (file) => {
  try {
    console.log("cloudinaryUpload:", file);
    const result = await cloudinary.uploader.upload(file); // Sube el archivo a Cloudinary
    return result.secure_url; // Retorna la URL del archivo en Cloudinary
  } catch (error) {
    console.error("Error al cargar el archivo a Cloudinary:", error);
    throw error;
  }
};

module.exports = cloudinaryUpload;

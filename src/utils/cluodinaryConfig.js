const cloudinary = require("cloudinary").v2;
const NAME = process.env.CLOUDINARY_NAME;
const API_KEY = process.env.CLOUDINARY_API_KEY;
// const API_SECRET = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: NAME,
  api_key: API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;

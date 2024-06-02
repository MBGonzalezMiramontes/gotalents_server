const { Router } = require("express");
const talentRouter = Router();
const {
  getTalentsHandler,
  getTalentDetailHandler,
} = require("../handlers/talent/getTalentHandler");
const { postTalentHandler } = require("../handlers/talent/postTalentHandler");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

talentRouter
  .post("api/talent", upload.any(), postTalentHandler)
  .get("api/talent", getTalentsHandler)
  .get("api/talent/:id", getTalentDetailHandler);

module.exports = talentRouter;

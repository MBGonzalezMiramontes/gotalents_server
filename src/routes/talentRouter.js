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
  .post("/talent", upload.any(), postTalentHandler)
  .get("/talent", getTalentsHandler)
  .get("/talent/:id", getTalentDetailHandler);

module.exports = talentRouter;

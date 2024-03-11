const { Router } = require("express");
const talentRouter = Router();
const {
  getTalentsHandler,
  getTalentDetailHandler,
} = require("../handlers/talent/getTalentHandler");
const { postTalentHandler } = require("../handlers/talent/postTalentHandler");

talentRouter
  .post("/talent", postTalentHandler)
  .get("/talent", getTalentsHandler)
  .get("/talent/:id", getTalentDetailHandler);

module.exports = talentRouter;

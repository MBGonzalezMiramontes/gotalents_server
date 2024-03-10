const { Router } = require("express");
const talentRouter = Router();
const { getTalentsHandler } = require("../handlers/talent/getTalentHandler");
const {
  getTalentDetailHandler,
} = require("../handlers/talent/getTalentDetailHandler");
const { postTalentHandler } = require("../handlers/talent/postTalentHandler");

talentRouter
  .post("/talent", postTalentHandler)
  .get("/talent", getTalentsHandler)
  .get("/talent/:id", getTalentDetailHandler);

module.exports = talentRouter;


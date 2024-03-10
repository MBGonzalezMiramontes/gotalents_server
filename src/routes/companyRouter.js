const { Router } = require("express");
const companyRouter = Router();
const { getCompanyHandler } = require("../handlers/company/getCompanyHandler");
const { postCompanyHandler } = require("../handlers/company/postCompanyHandler");

companyRouter
  .post("/company", postCompanyHandler)
  .get("/company", getCompanyHandler);

module.exports = companyRouter;

const { Router } = require("express");
const companyRouter = Router();
const { getCompaniesHandler, getCompanyDetailHandler } = require("../handlers/company/getCompanyHandler");
const { postCompanyHandler } = require("../handlers/company/postCompanyHandler");

companyRouter
  .post("/company", postCompanyHandler)
  .get("/company", getCompaniesHandler)
  .get("/company/:id", getCompanyDetailHandler);

module.exports = companyRouter;

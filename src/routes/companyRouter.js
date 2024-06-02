const { Router } = require("express");
const companyRouter = Router();
const { getCompaniesHandler, getCompanyDetailHandler } = require("../handlers/company/getCompanyHandler");
const { postCompanyHandler } = require("../handlers/company/postCompanyHandler");

companyRouter
  .post("/api/company", postCompanyHandler)
  .get("/api/company", getCompaniesHandler)
  .get("/api/company/:id", getCompanyDetailHandler);

module.exports = companyRouter;

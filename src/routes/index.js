const { Router } = require("express");
const talentRouter = require("./talentRouter");
const companyRouter = require("./companyRouter.js");

const router = Router();

router
.use(talentRouter)
.use(companyRouter);

module.exports = router;


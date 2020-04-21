const controller = require("./user.controller");
const router = require("express").Router();
const { checkToken, checkUserIsAdmin, checkUserHasAccess} = require("../../middlewares/token_validation");

router
    .post("/", controller.createUser)
    .get("/", checkUserIsAdmin, controller.getAllUsers)
    .get("/id/",checkUserHasAccess, controller.getUserbyID)
    .post("/login/", controller.login);

module.exports = router;
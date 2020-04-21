const controller = require("./user.controller");
const router = require("express").Router();

router
    .post("/", controller.createUser)
    .get("/", controller.getAllUsers)
    .get("/id/", controller.getUserbyID);

module.exports = router;
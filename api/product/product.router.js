const controller = require("./product.controller");
const router = require("express").Router();
const { checkToken, checkUserIsAdmin, checkUserHasAccess} = require("../../middlewares/token_validation");

router.post("/", checkUserIsAdmin,  controller.create);
router.get("/", controller.getAll);
router.get("/id", controller.getByID);
router.put("/id", checkUserIsAdmin, controller.update);
router.delete("/id", checkUserIsAdmin, controller.delete);

module.exports = router;
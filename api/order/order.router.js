const controller = require("./order.controller");
const router = require("express").Router();
const { checkToken, checkUserIsAdmin, checkUserHasAccess} = require("../../middlewares/token_validation");

router.post("/", checkUserHasAccess, controller.create);
router.put("/id/", checkUserIsAdmin, controller.updateStatus);
router.get("/", checkUserIsAdmin, controller.getAllOrders);
//router.get("/", checkUserIsAdmin, controller.getAll);
//router.get("/id", controller.getByID);
//router.put("/id", checkUserIsAdmin, controller.update);
//router.delete("/id", checkUserIsAdmin, controller.delete);

module.exports = router;
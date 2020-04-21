const controller = require("./product.controller");
const router = require("express").Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/id", controller.getByID);
router.put("/id", controller.update);
router.delete("/id", controller.delete);

module.exports = router;
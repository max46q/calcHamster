const Router = require("express");
const router = new Router();
const controller = require("./authController");

router.post("/registrations", controller.registration);
router.post("/login", controller.login);
router.get("/cards", controller.getCards);

module.exports = router;

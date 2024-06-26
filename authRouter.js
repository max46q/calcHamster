const Router = require("express");
const router = new Router();
const controller = require("./authController");
const { check } = require("express-validator");
const authMiddleware = require("./middlewaree/authMiddleware");
const roleMiddleware = require("./middlewaree/roleMiddleware");

router.post(
  "/registrations",
  [
    check("username", "Логін повинен бути мінімум з 4 символів").isLength({
      min: 4,
    }),
    check(
      "password",
      "Пароль повинен складати не менше 6 символів і не більше 12"
    ).isLength({ min: 6, max: 12 }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.post(
  "/addcards",
  [
    check("nameCard", "поле не повинно бути пустим").notEmpty(),
    check("level", "Дуже низький або високий рівень картки").isLength({
      min: 0,
      max: 2,
    }),
  ],
  controller.addcard
);
router.get("/cards", authMiddleware, controller.getCards);

module.exports = router;

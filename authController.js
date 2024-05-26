const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { secret } = require("./config");

const { validationResult } = require("express-validator");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, {
    expiresIn: "3h",
  });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Помилка при регістрації", errors: errors.array() });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Користувач з таким іменем вже існує" });
      }
      const hashPassword = bcrypt.hashSync(password, 15);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "Користувач успішно створений" });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Registration failed" });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Користувача з таким іменем не існує" });
      }
      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Неправильний пароль" });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Login failed" });
    }
  }

  async getCards(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new authController();

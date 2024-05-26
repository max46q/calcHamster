const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require("bcryptjs");

class authController {
  async registration(req, res) {
    try {
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Користувач з таким іменем вже існує" });
      }
      const hashPassword = bcrypt.hashSync(password, 15);
      const userRole = await Role.find({ name: "USER" });
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
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "Login failed" });
    }
  }

  async getCards(req, res) {
    try {
      res.json("server worked");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new authController();

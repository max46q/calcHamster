const User = require("./models/User");
const Role = require("./models/Role");

class authController {
  async registration(req, res) {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async login(req, res) {
    try {
    } catch (err) {
      console.log(err);
    }
  }

  async getCards(req, res) {
    try {
      const userRole = new Role();
      const adminRole = new Role({ value: "ADMIN" });
      await userRole.save();
      await adminRole.save();
      res.json("server worked");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new authController();

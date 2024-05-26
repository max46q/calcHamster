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
        res.json("server worked");
        console.log("server worked");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new authController();

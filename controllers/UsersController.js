const Users = require("../model/users");

class UsersController {
  async search(req, res, next) {
    let item = await Users.find({});
    res.json({
        status:"success",
        data: item
    })
  }
}

module.exports = new UsersController();

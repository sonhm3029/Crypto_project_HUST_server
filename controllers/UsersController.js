const { type } = require("express/lib/response");
const Users = require("../model/users");


class UsersController {
  async create(req, res, next) {
      try {
        let {body} = req;
        body.password = body.encryptedData;
        let result = await Users.create(body);
        delete result?.password;
        if(result){
            res.status(201).json({
                status:"sucess",
                data: result
            })
        }
        else {
            throw new Error("Created error!")
        }
      } catch (error) {
          res.status(400).json({
              status:error.status,
              message:error.message
          })
      }
      
  }
  async search(req, res, next) {
    try {
      let data = await Users.find({});
      if (data) {
        res.status(200).json({
          status: "success",
          data: data,
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
  async getById(req, res, next) {
    try {
      let data = await Users.findOne({ _id: req.params.id });
      delete data?.password
      if (data) {
        res.status(200).json({
          status: "success",
          data: data,
        });
      } else {
        res.status(404).json({
          status: "error",
          message: "No user found!",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
  async login(req, res, next) {
      try {
          let {body} = req;
          body.password = body.encryptedData;
          let data = await Users.findOne({email: body?.email});
          
          if(!data||data.password !== body.password) {
            res.status(401).json({
                status:"error",
                message:"Access denied"
            })
            return;
          }
          delete data.password;
          res.json({
              status:"success",
              data:data,
          })
      } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message,
          });
      }
  }
}

module.exports = new UsersController();

const users = require("./users");

module.exports = function (app) {
    app.get("/", (req, res, next) => {
        res.send("Hello world!")
    });

    app.use("/users", users);
}
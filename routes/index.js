const users = require("./users");
const rc4 = require("./rc4");
const emails = require("./emails");

module.exports = function (app) {
    app.get("/", (req, res, next) => {
        res.send("Hello world!")
    });

    app.use("/users", users);
    app.use("/rc4", rc4);
    app.use("/emails", emails);
}
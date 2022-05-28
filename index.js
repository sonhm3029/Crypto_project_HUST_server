const express = require("express");

const app = express();
const Route = require("./routes");
const middleware = require("./middleware")
const db = require("./config/database")

// database connection
db.connect()

// middleware
middleware(app)

// Routes
Route(app)

app.listen(5000, () => {
    console.log("Server is running on port 5000!")
})
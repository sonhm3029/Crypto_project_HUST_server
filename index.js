const express = require("express")
const app = express()

app.get("/", (req, res, next) => {
    res.send("Hello world!")
})

app.listen(5000, () => {
    console.log("Server is running on port 5000!")
})
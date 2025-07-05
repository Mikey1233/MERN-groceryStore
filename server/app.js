const express = require("express")
const ConnectDB = require("./configs/db")
const app = express()
app.use(express.json())
//connect db
ConnectDB()

///routes
//auth route


module.exports = app
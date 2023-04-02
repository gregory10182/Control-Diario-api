
// import { connect } from "./utils/mongoose.js";
// import express from "express";
// import morgan from "morgan"
// import cors from "cors";
// import ControlRoutes from "./routes/control.routes.js"

require("dotenv").config()
require("./utils/mongoose")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const handleErrors = require("./middleware/handleErrors")
const monthRouter = require("./controllers/control.controller")  
const usersRouter = require("./controllers/users.controller")
const loginRouter = require("./controllers/login.controller")

const app = express();

app.use(cors());

app.use(express.json());

app.use(monthRouter)

app.use(usersRouter)

app.use(loginRouter)

app.use(handleErrors)

app.use(morgan("dev"))



module.exports = app 



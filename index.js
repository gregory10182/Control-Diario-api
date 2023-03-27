
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
// const ControlRoutes = require("./routes/control.routes")
const { GetMonths,
  GetMonth,
  CreateMonth,
  DailySale,
  UpdateDay,
  DeleteMonth } = require("./controllers/control.controller")  

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", GetMonths)

app.get("/Month/:id", GetMonth)

app.post("/NewMonth/", CreateMonth)

app.put("/DailySale/", DailySale)

app.put("/UpdateDay/:id", UpdateDay)

app.delete("/DeleteMonth/:id", DeleteMonth)

app.use((err, req, res, next) => {
  console.error(err)
  console.log(err.name)
  res.status(400).end()
})

app.use(morgan("dev"))



module.exports = app 



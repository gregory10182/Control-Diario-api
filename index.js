import { connect } from "./utils/mongoose.js";
import express from "express";
import morgan from "morgan"
import cors from "cors";
import ControlRoutes from "./routes/control.routes.js"

const app = express();

app.use(cors());

app.use(express.json());

app.use(ControlRoutes)

app.use((err, req, res, next) => {
  console.error(err)
  console.log(err.name)
  res.status(400).end()
})

app.use(morgan("dev"))


async function main() {
  await connect();
  app.listen(8080, () => {
    console.log("Iniciamos");
  });
}

main();

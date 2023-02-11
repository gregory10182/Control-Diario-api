import { connect } from "./utils/mongoose.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ControlRoutes from "./routes/control.routes.js"

const app = express();

app.use(bodyParser.json());

app.use(ControlRoutes)

app.use(cors());

async function main() {
  await connect();
  app.listen(8080, () => {
    console.log("Iniciamos");
  });
}

main();

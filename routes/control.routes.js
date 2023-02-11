import { Router } from "express";
import { GetMonths,
         GetMonth,
         CreateMonth,
         DailySale,
         DeleteMonth } from "../controllers/control.controller.js";    

const router = Router();

router.get("/", GetMonths)

router.get("/Month/:id", GetMonth)

router.post("/NewMonth", CreateMonth)

router.put("/DailySale/:id", DailySale)

router.delete("/DeleteMonth/:id", DeleteMonth)


export default router;
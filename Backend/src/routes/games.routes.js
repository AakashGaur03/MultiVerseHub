import { Router } from "express";
import { getGamesSectionData } from "../controllers/game.controller.js";


const router = Router();


router.route("/getGames").get(getGamesSectionData)

export default router;

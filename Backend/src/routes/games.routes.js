import { Router } from "express";
import { getGamesSectionDataCategoryWise } from "../controllers/game.controller.js";
// import { getGamesSectionData, getGamesSectionDataCategoryWise } from "../controllers/game.controller.js";


const router = Router();


// router.route("/getGames").get(getGamesSectionData)
router.route("/getGamesCategoryWise").post(getGamesSectionDataCategoryWise)

export default router;

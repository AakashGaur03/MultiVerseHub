import { Router } from "express";
import { getCricketImageCB, getCricketNewsCB, getCricketPointsTable, getCricketRankings, getRecentCricket } from "../controllers/cricket.controller.js";


const router = Router();



router.route("/cricketApi").get(getRecentCricket);
router.route("/cricketnewscb").get(getCricketNewsCB);
router.route("/:id/pointsTable").get(getCricketPointsTable);
router.route("/cricketImageApi").get(getCricketImageCB);
router.route("/cricketRankings/:format/:category/:isWomen?").get(getCricketRankings);


export default router;

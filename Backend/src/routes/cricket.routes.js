import { Router } from "express";
import { getCricketImageCB, getCricketNewsCB, getCricketPlayerInfo, getCricketPointsTable, getCricketRankings, getCricketSearchPlayer, getRecentCricket } from "../controllers/cricket.controller.js";


const router = Router();



router.route("/cricketApi").get(getRecentCricket);
router.route("/cricketnewscb").get(getCricketNewsCB);
router.route("/:id/pointsTable").get(getCricketPointsTable);
router.route("/cricketImageApi").get(getCricketImageCB);
router.route("/cricketRankings/:format/:category/:isWomen?").get(getCricketRankings);
router.route("/searchPlayer").post(getCricketSearchPlayer);
router.route("/playerInfo").post(getCricketPlayerInfo);


export default router;

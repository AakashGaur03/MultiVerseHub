import { Router } from "express";
import { allJokes } from "../controllers/user.controller.js";

const router = Router();


console.log(allJokes)
router.route("/joke").get(allJokes)
export default router;

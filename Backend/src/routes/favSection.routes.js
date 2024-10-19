import { Router } from "express";
import {
  addToFavorite,
  getFavorites,
  removeFavorite,
} from "../controllers/favSection.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add").post(verifyJWT, addToFavorite);
router.route("/").get(verifyJWT, getFavorites);
router.route("/remove").put(verifyJWT, removeFavorite);

export default router;

import { Router } from "express";

import {
  addFavorites,
  removeFavorites,
} from "../controllers/favorite.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/addFavorites").post(verifyJWT, addFavorites);
router.route("/removeFavorites").post(verifyJWT, removeFavorites);

export default router;

import { Router } from "express";
import {
  // allJokes,
  changeCurrentPassword,
  createNewPassword,
  sendOtponMail,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateUserAvatar,
  verifyOTP,
  getWeathter,
  getWordOfTheDay,
  // getRecentCricket,
  // getCricketImageCB,
  // getCricketPointsTable,
  // getCricketRankings,
  // getCricketNewsCB,
  uploadImageCloudinary,
  getImageFromDB,
  getEntertainmentParticularsData,
  getEntertainmentDataMovie,
  getEntertainmentDataTV,
  getEntertainmentSearch,
  updateThemePreference,
} from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// router.route("/joke").get(allJokes);

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);

// Secured routes
// verifyJWT is a middleware
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.put("/update-theme", verifyJWT, updateThemePreference);
router.route("/send-otp-mail").post(sendOtponMail);
router.route("/verifyOTP").post(verifyOTP);
router.route("/create-new-password").post(createNewPassword);
router
  .route("/avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

// router.route("/cricketApi").get(getRecentCricket);
// router.route("/cricketnewscb").get(getCricketNewsCB);
// router.route("/:id/pointsTable").get(getCricketPointsTable);
// router.route("/cricketImageApi").get(getCricketImageCB);
// router.route("/cricketRankings/:format/:category/:isWomen?").get(getCricketRankings);
router.route("/uploadImagetoCloudinary").post(uploadImageCloudinary);
router.route("/getImageFromDB").post(getImageFromDB);
router.route("/weatherApi").get(getWeathter);
router.route("/wordofthedayApi").get(getWordOfTheDay);
router.route("/entertainmentMovieApi").post(getEntertainmentDataMovie);
router.route("/entertainmentTVApi").post(getEntertainmentDataTV);
router
  .route("/entertainmentParticularsApi/:category/:id")
  .get(getEntertainmentParticularsData);
router.route("/entertainmentSearch").post(getEntertainmentSearch);

export default router;

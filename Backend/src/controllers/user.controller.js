import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import axios from "axios";

// const allJokes = asyncHandler(async (req, res) => {
//   const jokes = [
//     {
//       id: 1,
//       title: "JOKE1",
//       content: "This is JOKE1",
//     },
//     {
//       id: 2,
//       title: "JOKE2",
//       content: "This is JOKE2",
//     },
//     {
//       id: 3,
//       title: "JOKE3",
//       content: "This is JOKE3",
//     },
//     {
//       id: 4,
//       title: "JOKE4",
//       content: "This is JOKE4",
//     },
//     {
//       id: 5,
//       title: "JOKE5",
//       content: "This is JOKE5",
//     },
//   ];

//   res.send(jokes);
// });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASS,
  },
});

const generateRandomOTP = () => {
  // By adding 100000 to the result, you shift the range to start from 100000 and end at 999999, ensuring that the generated number will always be a six-digit number
  return Math.floor(100000 + Math.random() * 900000);
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });
    // validateBeforeSave is used because we are just sending refreshToken if we didnt do this then it will also validate password and all other things and that will result in error

    return { accessToken, refreshToken };
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          500,
          "Something went wrong while generating Refresh and Access Token "
        )
      );
    // throw new ApiError(
    //   500,
    //   "Something went wrong while generating Refresh and Access Token "
    // );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username,email
  // check for images,check for avatar
  // upload them to cloudinary,avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return response
  const { fullName, email, password, username } = req.body;

  // if(fullName===""){                                         from this we need to check all in if elseif condition
  //     throw new ApiError(400,"Fullname is Required")
  // }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    return res.status(400).json(new ApiError(400, "All Fields are required"));
    // throw new ApiError(400, "All Fields are required");
  }

  // check if user already exists: username,email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res
      .status(409)
      .json(new ApiError(409, "User with email or username already exists"));
    // throw new ApiError(409, "User with email or username already exists");
  }

  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files.avatar[0].path;
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const user = await User.create({
    fullName,
    avatar: avatar?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" // it says which fields we want to remove space seprated values as a string
  );

  if (!createdUser) {
    return res
      .status(500)
      .json(
        new ApiError(500, "Something went wrong while Registring the User")
      );
    // throw new ApiError(500, "Something went wrong while Registring the User");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (username == "" && email == "") {
    return res
      .status(400)
      .json(new ApiError(400, "Username and Email is Required"));
    // throw new ApiError(400, "Username and Email is Required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User does not Exists"));
    // throw new ApiError(404, "User does not Exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Invalid User Credentials"));
    // throw new ApiError(401, "Invalid User Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  // req.user is coming from middleware that we applied in route(verifyJWT)
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // This removes the filed from the document
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    return res
      .status(401)
      .json(
        new ApiError(401, "Unauthorized Access as Refresh Token Not Available")
      );
    // throw new ApiError(
    //   401,
    //   "Unauthorized Access as Refresh Token Not Available"
    // );
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      return res.status(401).json(new ApiError(401, "Invalid Refresh Token"));
      // throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res
        .status(401)
        .json(new ApiError(401, "Refresh Token is expired or used"));
      // throw new ApiError(401, "Refresh Token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token Refreshed"
        )
      );
  } catch (error) {
    return res
      .status(401)
      .json(new ApiError(401, error?.message || "Invalid Refresh Token"));
    // throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return res.status(400).json(new ApiError(400, "Invalid Old Password"));
    // throw new ApiError(400, "Invalid Old Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Current User Fetched Successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;
  if (!fullName || !email) {
    return res.status(400).json(new ApiError(400, "All Fields are required"));
    // throw new ApiError(400, "All Fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email: email,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account Details Updated Successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    return res.status(400).json(new ApiError(400, "Avatar File is Missing"));
    // throw new ApiError(400, "Avatar File is Missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    return res
      .status(400)
      .json(new ApiError(400, "Error While Uploading Avatar"));
    // throw new ApiError(400, "Error While Uploading Avatar");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar Updated Successfully"));
});

const sendOtponMail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json(new ApiError(400, "User with Email Not Found"));
    }

    const otp = generateRandomOTP();

    const otpToken = jwt.sign(
      { userId: user._id, otp },
      process.env.OTP_TOKEN_SECRET,
      { expiresIn: process.env.OTP_TOKEN_EXPIRY }
    );

    const mailOptions = {
      from: process.env.GMAIL_ID,
      to: email,
      subject: "Password Reset",
      text: `To reset your password, please Enter OTP on Site ${otp} `,
    };

    const options = {
      httpOnly: true,
      secure: true,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error occurred while sending email:", error);
        return res
          .status(400)
          .json(new ApiError(400, "Error Occured While Sending Mail"));
      } else {
        console.log("Email sent successfully:", info.response);
        return res
          .status(200)
          .cookie("otpToken", otpToken, options)
          .json(
            new ApiResponse(
              200,
              { otpToken, userId: user._id },
              "OTP Mail Sent Successfully"
            )
          );
      }
    });
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const otpToken = req.cookies.otpToken || req.body.otpToken;

  try {
    if (!otpToken) {
      throw new Error("JWT token not provided");
    }
    const decodedToken = jwt.verify(otpToken, process.env.OTP_TOKEN_SECRET);
    console.log(decodedToken);
    // console.log(decodedToken.otp);
    // console.log(otp);
    const userId = decodedToken.userId;

    if (decodedToken.otp == otp) {
      return res
        .status(200)
        .json(new ApiResponse(200, { userId }, "OTP Verified Successfully"));
    } else {
      return res.status(400).json(new ApiError(400, "Invalid OTP"));
    }
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json(new ApiError(401, "Invalid or Expired OTP Token"));
  }
});

const createNewPassword = asyncHandler(async (req, res) => {
  const { userId, newPassword, confirmPassword } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json(new ApiError(400, "User not found"));
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json(new ApiError(400, "Password and Confirm Password are not same"));
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Password Reset Successfully"));
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

const getNews = asyncHandler(async (req, res) => {
  const { query } = req.query;
  // console.log(query)
  try {
    const response = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_API_KEY}&q=${query}`
    );
    if (response) {
      // console.log(response)
      const responseData = response.data;
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { responseData },
            "NEWS API Fetched Successfully"
          )
        );
    } else {
      return res
        .status(400)
        .json(new ApiError(400, "NEWS API Failed to fetch Data"));
    }
  } catch (error) {
    console.error("Error fetching News:", error);
    return res.status(500).json(new ApiError(500, "Internal Server Error"));
  }
});

export {
  // allJokes,
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  sendOtponMail,
  verifyOTP,
  createNewPassword,
  getNews,
};

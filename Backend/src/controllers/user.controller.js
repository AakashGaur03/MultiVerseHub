import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import axios from "axios";
import { Image } from "../models/image.model.js";
import { Counter } from "../models/counter.model.js";

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

  const counter = await Counter.findOneAndUpdate(
    { name: "userId" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  const user = await User.create({
    userId: counter.value,
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
  if (!oldPassword || !newPassword) {
    return res
      .status(400)
      .json(new ApiError(400, "Old and new password are required"));
  }
  const user = await User.findById(req.user?._id).select("+password");
  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

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

const updateThemePreference = asyncHandler(async (req, res) => {
  const { theme } = req.body;

  if (!["light", "dark"].includes(theme)) {
    return res.status(400).json(new ApiError(400, "Invalid theme value"));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { themePreference: theme },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Theme preference updated successfully"));
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
        // console.log("Email sent successfully:", info.response);
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
    return res
      .status(500)
      .json(new ApiError(500, "Some Error occurred while sending mail"));
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
    // console.log(decodedToken);
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
    return res
      .status(500)
      .json(new ApiError(500, "Some Error occurred while resetting password"));
  }
});

// const getNews = asyncHandler(async (req, res) => {
//   const { query } = req.query;
//   // console.log(query)
//   try {
//     const response = await axios.get(
//       `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_API_KEY}&q=${query}`
//     );
//     if (response) {
//       // console.log(response)
//       const responseData = response.data;
//       return res
//         .status(200)
//         .json(
//           new ApiResponse(
//             200,
//             { responseData },
//             "NEWS API Fetched Successfully"
//           )
//         );
//     } else {
//       return res
//         .status(400)
//         .json(new ApiError(400, "NEWS API Failed to fetch Data"));
//     }
//   } catch (error) {
//     console.error("Error fetching News:", error);
//     return res.status(500).json(new ApiError(500, "Some Error occurred while fetching News"));
//   }
// });

// const axios = require('axios');

// // try {
// // 	const response = await axios.request(options);
// // 	console.log(response.data);
// // } catch (error) {
// // 	console.error(error);
// // }

// const getRecentCricket = asyncHandler(async (req, res) => {
//   try {
//     // const response = await axios.get(
//     //   `https://api.cricapi.com/v1/currentMatches?apikey=${process.env.CRICKET_API_KEY}&offset=1`
//     // );
//     const options = {
//       method: "GET",
//       url: "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent",
//       headers: {
//         "X-RapidAPI-Key": process.env.CRICKET_API_KEY,
//         "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
//       },
//     };
//     const response = await axios.request(options);

//     if (response) {
//       // console.log(response, "response");
//       // const responseData = response.data.data;
//       const responseData = response.data;
//       return res
//         .status(200)
//         .json(
//           new ApiResponse(
//             200,
//             { responseData },
//             "Cricket API Fetched Successfully"
//           )
//         );
//     } else {
//       return res
//         .status(400)
//         .json(new ApiError(400, "Cricket API Failed to fetch Data"));
//     }
//   } catch (error) {
//     console.error("Error fetching Cricket:", error);
//     return res.status(500).json(new ApiError(500, "Some Error occurred while fetching cricket API"));
//   }
// });
// const getCricketPointsTable = asyncHandler(async (req, res) => {
//   try {
//     const { id } = req.params;
//     // console.log(id,"getWordOfTheDayAPIFunc")
//     const options = {
//       method: "GET",
//       url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/${id}/points-table`,
//       headers: {
//         "X-RapidAPI-Key": process.env.CRICKET_API_KEY,
//         "X-RapidAPI-Host": "cricbuzz-cricket.p.rapidapi.com",
//         "Content-Type": "application/json",
//       },
//     };
//     const response = await axios.request(options);

//     if (response) {
//       const responseData = response.data;
//       return res
//         .status(200)
//         .json(
//           new ApiResponse(
//             200,
//             { responseData },
//             "Points Table API Fetched Successfully"
//           )
//         );
//     } else {
//       return res
//         .status(400)
//         .json(new ApiError(400, "Cricket API Failed to fetch Points Table"));
//     }
//   } catch (error) {
//     console.error("Error fetching Points Table:", error);
//     return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Points Table"));
//   }
// });
// const getCricketNewsCB = asyncHandler(async (req, res) => {
//   try {
//     const options = {
//       method: 'GET',
//       url: 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index',
//       headers: {
//         'x-rapidapi-key': process.env.CRICKET_API_KEY,
//         'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
//       }
//     };

//     const response = await axios.request(options);

//     if (response) {
//       const responseData = response.data;
//       return res
//         .status(200)
//         .json(
//           new ApiResponse(
//             200,
//             { responseData },
//             "Cricket News Fetched Successfully"
//           )
//         );
//     } else {
//       return res
//         .status(400)
//         .json(new ApiError(400, "Cricket API Failed to fetch News"));
//     }
//   } catch (error) {
//     console.error("Error fetching News:", error);
//     return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Cricket News"));
//   }
// });
// const getCricketRankings = asyncHandler(async (req, res) => {
//   try {
//     const { format, isWomen, category } = req.params;
//     // console.log(id,"getWordOfTheDayAPIFunc")
//     const params = { formatType: format };
//     if (isWomen !== undefined) {
//       params.isWomen = isWomen === "1" ? "1" : "0";
//     }
//     const options = {
//       method: "GET",
//       url: `https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/${category}`,
//       params: params,
//       headers: {
//         "x-rapidapi-key": process.env.CRICKET_API_KEY,
//         "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
//       },
//     };
//     const response = await axios.request(options);

//     if (response) {
//       const responseData = response.data;
//       responseData.format = format ? format : ""
//       responseData.IsWomen = isWomen ? isWomen : ""
//       responseData.category = category ? category : ""
//       // console.log(responseData,"responseDataresponseData")
//       return res
//         .status(200)
//         .json(
//           new ApiResponse(
//             200,
//             { responseData },
//             "Ranking API Fetched Successfully"
//           )
//         );
//     } else {
//       return res
//         .status(400)
//         .json(new ApiError(400, "Ranking API Failed to fetch Points Table"));
//     }
//   } catch (error) {
//     console.error("Error fetching Rankings:", error);
//     return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Rankings"));
//   }
// });
// const getCricketImageCB = asyncHandler(async (req, res) => {
//   const { query } = req.query;
//   // console.log(query, "querytsssss");
//   try {
//     const options = {
//       method: "GET",
//       url: `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${query}/i.jpg`,
//       params: { p: 'de', d: 'high' },
//       headers: {
//         'Content-Type': 'application/json',
//         "x-rapidapi-key": process.env.CRICKET_API_KEY,
//         "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
//       },
//       responseType: "arraybuffer",
//     };
//     const response = await axios.request(options);

//     // if (response) {
//     //   let imageUrl = URL.createObjectURL(response.data);
//     //   const responseData = imageUrl;
//     //   return res
//     //     .status(200)
//     //     .json(
//     //       new ApiResponse(
//     //         200,
//     //         { responseData },
//     //         "Cricket API Image Fetched Successfully"
//     //       )
//     //     );
//     // }
//     if (response) {
//       const buffer = Buffer.from(response.data, "binary");
//       const base64Image = buffer.toString("base64");
//       const imageUrl = `data:image/jpeg;base64,${base64Image}`;
//       return res
//         .status(200)
//         .json(
//           new ApiResponse(
//             200,
//             { imageUrl },
//             "Cricket API Image Fetched Successfully"
//           )
//         );
//     } else {
//       return res
//         .status(400)
//         .json(new ApiError(400, "Cricket API Image Failed to fetch Data"));
//     }
//   } catch (error) {
//     console.error("Error fetching Cricket Image:", error);
//     return res.status(500).json(new ApiError(500, "Some Error occurred while fetching Image"));
//   }
// });

const getWeathter = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) query = "Delhi";
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${query}`
    );
    if (response) {
      const responseData = response.data;
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { responseData },
            "Weather Details Fetched Successfully"
          )
        );
    } else {
      return res
        .status(400)
        .json(new ApiError(400, "Weather API failed to fetch Data"));
    }
  } catch (error) {
    console.error("Error fetching Weahter:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Some Error occurred while fetching Weahter Data")
      );
  }
});

const getWordOfTheDay = asyncHandler(async (req, res) => {
  const options = {
    method: "GET",
    url: "https://words-api5.p.rapidapi.com/api/v1/dict/word-today",
    headers: {
      "X-RapidAPI-Key": process.env.WORDOFTHEDAY_API_KEY,
      "X-RapidAPI-Host": "words-api5.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    if (response) {
      let responseData;

      if (response?.data?.data?.word && response?.data?.data?.meaning) {
        responseData = response.data.data;
      } else {
        // Fallback data if the API doesn't return expected data
        responseData = {
          word: "Currently Not Coming",
          meaning: "Currently Not Coming.",
        };
      }
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { responseData },
            "Word Of The Data Details Fetched Successfully"
          )
        );
    } else {
      return res
        .status(400)
        .json(new ApiError(400, "Word Of The Day API failed to fetch Data"));
    }
  } catch (error) {
    console.error("Error fetching Word Of The Day:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Some Error occurred while fetching Word Of The Day")
      );
  }
});

const uploadImageCloudinary = asyncHandler(async (req, res) => {
  // console.log("object");
  const { imageUrl, faceImageID } = req.body; // Ensure it's imageUrl as used in the frontend
  // console.log("Received image URL:", imageUrl);

  try {
    const image = await uploadOnCloudinary(imageUrl);
    if (image) {
      const responseData = image;
      // console.log(responseData, "REQOFPOJDSImage");
      responseData.faceImageID = faceImageID;
      const isDataSaved = saveDataInDatabase(responseData);

      if (isDataSaved) {
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              { responseData },
              "Image Fetched from DB Successfully"
            )
          );
      } else {
        return res
          .status(200)
          .json(
            new ApiResponse(
              200,
              { responseData },
              "Image Saved to Cloudinary Successfully"
            )
          );
      }
    } else {
      return res
        .status(400)
        .json(new ApiError(400, "Failed to save Image on Cloudinary"));
    }
  } catch (error) {
    console.error("Error saving image to Cloudinary:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Some Error occurred while uploading image"));
  }
});

const saveDataInDatabase = async (data) => {
  const {
    public_id,
    url,
    secure_url,
    format,
    width,
    height,
    resource_type,
    faceImageID,
  } = data;
  // console.log(data,);

  const existedData = await Image.findOne({ faceImageID });

  // console.log(existedData, "existedDataexistedData");

  if (existedData) {
    return false;
  }

  const dataUpload = await Image.create({
    id: public_id,
    url,
    secureUrl: secure_url,
    format,
    width,
    height,
    resourceType: resource_type,
    faceImageID,
  });
};
const getImageFromDB = asyncHandler(async (req, res) => {
  const { faceImageID } = req.body;
  // console.log(data,);
  // console.log(faceImageID, "faceImageIDfaceImageID");

  const existedData = await Image.findOne({ faceImageID });

  // console.log(existedData, "existedDataexistedData");

  if (existedData) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { responseData: existedData },
          "Image Fetched from DB Successfully"
        )
      );
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Image Not Found in DB "));
});

const getEntertainmentDataMovie = asyncHandler(async (req, res) => {
  const { topRatedPage, popularPage, nowPlayingPage, upcomingPage, oldData } =
    req.body;
  const urls = [
    `https://api.themoviedb.org/3/movie/top_rated?&page=${topRatedPage}`,
    `https://api.themoviedb.org/3/movie/popular?&page=${popularPage}`,
    `https://api.themoviedb.org/3/movie/now_playing?&page=${nowPlayingPage}`,
    `https://api.themoviedb.org/3/movie/upcoming?&page=${upcomingPage}`,
  ];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMBD_AUTHORIZATION_HEADER}`,
    },
  };
  try {
    const [response1, response2, response3, response4] = await Promise.all(
      urls.map((url) => axios.request({ ...options, url }))
    );
    let responseData = [];
    if (response1 && response2 && response3 && response4) {
      if (oldData) {
        const responseData1 = response1.data;
        const responseData2 = response2.data;
        const responseData3 = response3.data;
        const responseData4 = response4.data;

        let topRated;
        let nowPlaying;
        let upcoming;
        let popular;
        let searchResult;

        if (oldData.search_result) {
          searchResult = oldData.search_result;
        }

        if (oldData.top_rated.page != topRatedPage) {
          topRated = {
            ...responseData1,
            results: [...oldData.top_rated.results, ...responseData1.results],
          };
        } else {
          topRated = oldData.top_rated;
        }
        if (oldData.popular.page != popularPage) {
          popular = {
            ...responseData2,
            results: [...oldData.popular.results, ...responseData2.results],
          };
        } else {
          popular = oldData.popular;
        }
        if (oldData.now_playing.page != nowPlayingPage) {
          nowPlaying = {
            ...responseData3,
            results: [...oldData.now_playing.results, ...responseData3.results],
          };
        } else {
          nowPlaying = oldData.now_playing;
        }
        if (oldData.upcoming.page != upcomingPage) {
          upcoming = {
            ...responseData4,
            results: [...oldData.upcoming.results, ...responseData4.results],
          };
        } else {
          upcoming = oldData.upcoming;
        }

        responseData = {
          search_result: searchResult,
          top_rated: topRated,
          popular: popular,
          now_playing: nowPlaying,
          upcoming: upcoming,
        };
      } else {
        const responseData1 = response1.data;
        const responseData2 = response2.data;
        const responseData3 = response3.data;
        const responseData4 = response4.data;
        responseData = {
          top_rated: responseData1,
          popular: responseData2,
          now_playing: responseData3,
          upcoming: responseData4,
        };
      }
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { responseData },
            "Entertainment API Fetched Successfully"
          )
        );
    } else {
      return res
        .status(400)
        .json(new ApiError(400, "Entertainment API failed to fetch Data"));
    }
  } catch (error) {
    console.error("Error fetching Entertainment Data:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Some Error occurred while fetching data"));
  }
});
const getEntertainmentDataTV = asyncHandler(async (req, res) => {
  const {
    onTheAirPageTv,
    topRatedPageTv,
    popularPageTv,
    airingTodayPageTv,
    oldData,
  } = req.body;
  const urls = [
    `https://api.themoviedb.org/3/tv/on_the_air?&page=${onTheAirPageTv}`,
    `https://api.themoviedb.org/3/tv/popular?&page=${popularPageTv}`,
    `https://api.themoviedb.org/3/tv/top_rated?&page=${topRatedPageTv}`,
    `https://api.themoviedb.org/3/tv/airing_today?&page=${airingTodayPageTv}`,
  ];
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMBD_AUTHORIZATION_HEADER}`,
    },
  };
  try {
    const [response1, response2, response3, response4] = await Promise.all(
      urls.map((url) => axios.request({ ...options, url }))
    );
    if (response1 && response2 && response3 && response4) {
      let responseData = [];
      if (oldData) {
        const responseData1 = response1.data;
        const responseData2 = response2.data;
        const responseData3 = response3.data;
        const responseData4 = response4.data;

        let onTheAirTv;
        let airingTodayTv;
        let popularTv;
        let topRatedTv;
        let searchResult;

        if (oldData.search_result) {
          searchResult = oldData.search_result;
        }

        if (oldData.on_the_air.page != onTheAirPageTv) {
          onTheAirTv = {
            ...responseData1,
            results: [...oldData.on_the_air.results, ...responseData1.results],
          };
        } else {
          onTheAirTv = oldData.on_the_air;
        }
        if (oldData.popular.page != popularPageTv) {
          popularTv = {
            ...responseData2,
            results: [...oldData.popular.results, ...responseData2.results],
          };
        } else {
          popularTv = oldData.popular;
        }
        if (oldData.top_rated.page != topRatedPageTv) {
          topRatedTv = {
            ...responseData3,
            results: [...oldData.top_rated.results, ...responseData3.results],
          };
        } else {
          topRatedTv = oldData.top_rated;
        }
        if (oldData.airing_today.page != airingTodayPageTv) {
          airingTodayTv = {
            ...responseData4,
            results: [
              ...oldData.airing_today.results,
              ...responseData4.results,
            ],
          };
        } else {
          airingTodayTv = oldData.airing_today;
        }

        responseData = {
          search_result: searchResult,
          top_rated: topRatedTv,
          popular: popularTv,
          on_the_air: onTheAirTv,
          airing_today: airingTodayTv,
        };
      } else {
        const responseData1 = response1.data;
        const responseData2 = response2.data;
        const responseData3 = response3.data;
        const responseData4 = response4.data;
        responseData = {
          on_the_air: responseData1,
          popular: responseData2,
          top_rated: responseData3,
          airing_today: responseData4,
        };
      }
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { responseData },
            "Entertainment API Fetched Successfully"
          )
        );
    } else {
      return res
        .status(400)
        .json(new ApiError(400, "Entertainment API failed to fetch Data"));
    }
  } catch (error) {
    console.error("Error fetching Entertainment Data:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Some Error occurred while fetching data"));
  }
});

// Particulars of Movie or TV
const getEntertainmentParticularsData = asyncHandler(async (req, res) => {
  const { category, id } = req.params;
  if (category === undefined) category = "tv";
  if (id === undefined) id = "4057";

  let urls = [
    `https://api.themoviedb.org/3/${category}/${id}`,
    `https://api.themoviedb.org/3/${category}/${id}/credits`,
    `https://api.themoviedb.org/3/${category}/${id}/reviews`,
    `https://api.themoviedb.org/3/${category}/${id}/videos?language=en-US`,
    `https://api.themoviedb.org/3/${category}/${id}/images`,
    `https://api.themoviedb.org/3/${category}/${id}/recommendations`,
  ];

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMBD_AUTHORIZATION_HEADER}`,
    },
  };
  try {
    const [response1, response2, response3, response4, response5, response6] =
      await Promise.all(urls.map((url) => axios.request({ ...options, url })));
    if (
      (response1 && response2 && response3 && response4 && response5, response6)
    ) {
      const responseData1 = response1.data;
      const responseData2 = response2.data;
      const responseData3 = response3.data;
      const responseData4 = response4.data;
      const responseData5 = response5.data;
      const responseData6 = response6.data;
      const responseData = {
        about: responseData1,
        credits: responseData2,
        reviews: responseData3,
        video: responseData4,
        images: responseData5,
        recommendations: responseData6,
      };
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { responseData },
            "Entertainment API Fetched Successfully"
          )
        );
    } else {
      return res
        .status(400)
        .json(new ApiError(400, "Entertainment API failed to fetch Data"));
    }
  } catch (error) {
    console.error("Error fetching Entertainment Data:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Some Error occurred while fetching particulars data")
      );
  }
});
const getEntertainmentSearch = asyncHandler(async (req, res) => {
  let { category, searchQuery } = req.body;
  if (category === undefined) category = "tv";
  if (searchQuery === undefined) searchQuery = "";

  try {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/search/${category}?query=${searchQuery}`,
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMBD_AUTHORIZATION_HEADER}`,
      },
    };

    const response = await axios.request(options);

    if (response) {
      const responseData = response.data;
      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            { responseData },
            `Search ${category} Data Fetched Successfully`
          )
        );
    } else {
      return res
        .status(400)
        .json(new ApiError(400, `Search API Failed to fetch ${searchQuery}`));
    }
  } catch (error) {
    console.error(`Error fetching ${searchQuery} :`, error);
    return res
      .status(500)
      .json(new ApiError(500, "Some Error occurred while fetching Search API"));
  }
});

// Categories top_rated,popular,now_playing
// Search
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
  updateThemePreference,
  sendOtponMail,
  verifyOTP,
  createNewPassword,
  // getRecentCricket,
  // getCricketPointsTable,
  // getCricketNewsCB,
  // getCricketRankings,
  // getCricketImageCB,
  getWeathter,
  getWordOfTheDay,
  uploadImageCloudinary,
  getImageFromDB,
  getEntertainmentDataMovie,
  getEntertainmentDataTV,
  getEntertainmentParticularsData,
  getEntertainmentSearch,
};

// Use for Refernce for Gallery Type Implementation in Multi Images per ID
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_tab_img_gallery

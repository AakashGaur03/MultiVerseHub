import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
    .json(new ApiError(
      500,
      "Something went wrong while generating Refresh and Access Token "
    ))
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
    return res
    .status(400)
    .json(new ApiError(400, "All Fields are required"))
    // throw new ApiError(400, "All Fields are required");
  }

  // check if user already exists: username,email
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res
    .status(409)
    .json(new ApiError(409, "User with email or username already exists"))
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
    .json(new ApiError(500, "Something went wrong while Registring the User"))
    // throw new ApiError(500, "Something went wrong while Registring the User");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (username=="" && email=="") {
    return res
    .status(400)
    .json(new ApiError(400, "Username and Email is Required"))
    // throw new ApiError(400, "Username and Email is Required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    return res
    .status(404)
    .json(new ApiError(404, "User does not Exists"))
    // throw new ApiError(404, "User does not Exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res
    .status(401)
    .json(new ApiError(401, "Invalid User Credentials"))
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
    .json(new ApiError(
      401,
      "Unauthorized Access as Refresh Token Not Available"
    ))
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
      return res
    .status(401)
    .json( new ApiError(401, "Invalid Refresh Token"))
      // throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      return res
    .status(401)
    .json( new ApiError(401, "Refresh Token is expired or used"))
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
    .json(new ApiError(401, error?.message || "Invalid Refresh Token"))
    // throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

// const forgotPassword = asyncHandler(async (req, res) => {
//   const { username,email,oldPassword, newPassword } = req.body;


//   if (username=="" && email=="") {
//     return res
//     .status(400)
//     .json(new ApiError(400, "Username or Email is Required"))
//     // throw new ApiError(400, "Username and Email is Required");
//   }

//   const user = await User.findOne({
//     $or: [{ username }, { email }],
//   });

//   if (!user) {
//     return res
//     .status(404)
//     .json(new ApiError(404, "User does not Exists"))
//     // throw new ApiError(404, "User does not Exists");
//   }

//     const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

//   if (!isPasswordCorrect) {
//     return res
//     .status(400)
//     .json(new ApiError(400, "Invalid Old Password"))
//     // throw new ApiError(400, "Invalid Old Password");
//   }

//   user.password = newPassword;
//   await user.save({ validateBeforeSave: false });

//   return res
//     .status(200)
//     .json(new ApiResponse(200, {}, "Password Changed Successfully"));
// });

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    return res
    .status(400)
    .json(new ApiError(400, "Invalid Old Password"))
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
    return res
    .status(400)
    .json(new ApiError(400, "All Fields are required"))
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
    return res
    .status(400)
    .json(new ApiError(400, "Avatar File is Missing"))
    // throw new ApiError(400, "Avatar File is Missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    return res
    .status(400)
    .json(new ApiError(400, "Error While Uploading Avatar"))
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
    )
    .select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar Updated Successfully"));
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
  // forgotPassword
};

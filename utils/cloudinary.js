import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
// fs is file System

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const isValidFilePath = (filePath) => {
  // Check if file path is an actual path and not a data URI
  return path.isAbsolute(filePath) && !filePath.startsWith('data:');
};

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // Upload File on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // File has been uploaded Successfully
    // console.log("File is uploaded Successfully on cloudinary", response.url);
    // fs.unlinkSync(localFilePath);
    if (isValidFilePath(localFilePath)) fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // fs.unlinkSync(localFilePath); // Remove the locally saved temporary file as the upload operation got failed
    if (isValidFilePath(localFilePath)) fs.unlinkSync(localFilePath);

    return null;
  }
};

export { uploadOnCloudinary };

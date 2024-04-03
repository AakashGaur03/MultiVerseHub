import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

let port = process.env.PORT;
let mongooseURI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${mongooseURI}/${DB_NAME}`)
    console.log(` \n MongoDB connected !! Host : ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log("MongoDB Connection Failed ", error);
    process.exit(1);
  }
};


export default connectDB
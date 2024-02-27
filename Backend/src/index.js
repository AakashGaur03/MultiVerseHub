import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

const port = process.env.PORT || 8000;
dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(port,()=>{
        console.log(`Server is running at port ${port} : http://localhost:${port}`)
    })
    app.on("error",(error)=>{
        console.log("ERR : ",error)
    })
  })
  .catch((error) => {
    console.log("MongoDB Connection ERROR !! : ", error);
  });

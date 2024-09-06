import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// Increase it to 50mb directly because handling image that requires more payload space
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import gameRouter from "./routes/games.routes.js";
import newsRouter from "./routes/news.routes.js";
import cricketRouter from "./routes/cricket.routes.js";
import favSectionRouter from "./routes/favSection.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/games", gameRouter);
app.use("/api/v1/news", newsRouter);
app.use("/api/v1/cricket", cricketRouter);
app.use("/api/v1/favSection", favSectionRouter);

export { app };

import express from "express";
import cors from "cors";
import { config } from "dotenv";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import carRouter from "./routes/car.js";

const currentFile = fileURLToPath(import.meta.url);
const Dir = dirname(currentFile);

export const app = express();

config({
  path: "./data/config.env",
});
app.use(express.json());
app.use("/uploads", express.static(Dir + "/uploads"));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://vik-frontend.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/users", userRouter);
app.use("/api/vehicle", carRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("express working");
});

app.get("/api/getkey", (req, res) =>
  res.status(200).json({
    key: process.env.RAZOR_API_KEY,
  })
);

app.get("/api/gettoken", async (req, res, next) => {
  const { token } = req.cookies;

  //console.log(token);

  try {
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "First Login",
      });
    }

    return res.status(200).json({
      success: true,
    });

    // const decoded = jwt.verify(token,process.env.JWT_SECRET);
  } catch (error) {
    console.log(error);
  }
});

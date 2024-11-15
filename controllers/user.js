import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/feature.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    //res.json({name,email,password});

    let user = await User.findOne({ email });

    if (user) {
      return next(new ErrorHandler("already registered", 404));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      // return res.json({
      //     success:false,
      //     message:"Invalid username"
      // });

      return next(new ErrorHandler("Invalid Username", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      //     return res.json({
      //         success:false,
      //         message:"Invalid password"
      //     });

      return next(new ErrorHandler("Invalid Password", 404));
    }

    sendCookie(user, res, `Welcome ${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};

export const getUserbyId = async (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(201)
      .cookie("token", "", {
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0), // Immediately expire the cookie
      })
      .json({
        success: true,
        user: req.user,
      });
  } catch (error) {
    next(error);
  }
};

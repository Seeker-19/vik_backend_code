import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  addCar,
  getCarById,
  getAllCars,
  getCarsByOwner,
  updateCar,
  deleteCar,
} from "../controllers/car.js";

const router = express.Router();

// Add a new car
router.post("/newcar", isAuthenticated, addCar);

// Get details of a specific car by ID
router.get("/car/:id", isAuthenticated, getCarById);

// Update a specific car by ID
router.put("/car/:id", isAuthenticated, updateCar);

// Get all cars
router.get("/allcars", getAllCars);

// Get all cars by owner (authenticated user's cars)
router.get("/mycars", isAuthenticated, getCarsByOwner);

router.delete("/deleteCar/:id", isAuthenticated, deleteCar);

export default router;

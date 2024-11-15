import ErrorHandler from "../middlewares/errorMiddleware.js";
import { CarModel } from "../models/car.js";

export const addCar = async (req, res, next) => {
  try {
    const {
      licensePlate,
      photos,
      description,
      make,
      model,
      year,
      features,
      mileage,
    } = req.body;

    const existingCar = await CarModel.findOne({ licensePlate });

    if (existingCar) {
      return res.status(400).json({
        success: false,
        message: "A car with this license plate already exists.",
      });
    }

    await CarModel.create({
      owner: req.user,
      licensePlate,
      photos,
      description,
      make,
      model,
      year,
      features,
      mileage,
    });

    return res.status(201).json({
      success: true,
      message: "Car added successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await CarModel.findById(id);

    if (!car) {
      return next(new ErrorHandler("Car not found", 404));
    }

    return res.status(200).json({
      success: true,
      car,
    });
  } catch (error) {
    next(error);
  }
};

export const getCarsByOwner = async (req, res, next) => {
  try {
    const userId = req.user._id;

    console.log(userId);

    const cars = await CarModel.find({ owner: userId });

    console.log(cars);

    return res.status(200).json({
      success: true,
      cars,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const {
      licensePlate,
      photos,
      description,
      make,
      model,
      year,
      features,
      mileage,
    } = req.body;

    const car = await CarModel.findById(id);

    if (!car) {
      return next(new ErrorHandler("Car not found", 404));
    }

    car.set({
      licensePlate,
      photos,
      description,
      make,
      model,
      year,
      features,
      mileage,
    });

    await car.save();

    return res.status(200).json({
      success: true,
      message: "Car updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllCars = async (req, res, next) => {
  try {
    const { query } = req.query;

    let cars;
    if (query) {
      cars = await CarModel.find({
        $or: [
          { licensePlate: { $regex: query, $options: "i" } },
          { make: { $regex: query, $options: "i" } },
          { model: { $regex: query, $options: "i" } },
        ],
      });
    } else {
      cars = await CarModel.find();
    }

    return res.status(200).json({
      success: true,
      cars,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params; // Car ID from URL parameters
    const userId = req.user.id; // Assuming user ID is available from authenticated session or token

    // Find the car by ID and owner
    const car = await CarModel.findOne({ _id: id, owner: userId });

    if (!car) {
      return res.status(404).json({
        message:
          "Car not found or you do not have permission to delete this car.",
      });
    }

    // Delete the car
    await CarModel.deleteOne({ _id: id });

    res.status(200).json({ message: "Car deleted successfully." });
  } catch (error) {
    next(error); // Pass error to error-handling middleware
  }
};

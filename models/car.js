import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming bnbUser also owns cars; change this as needed.
    required: true,
  },
  description: {
    // Additional details about the car.
    type: String,
  },
  licensePlate: {
    // Unique license plate number.
    type: String,
    unique: true,
    required: true,
  },
  photos: [String], // URLs of car images.
  make: {
    // Manufacturer of the car (e.g., Toyota, Ford).
    type: String,
    required: true,
  },
  model: {
    // Model of the car (e.g., Corolla, Mustang).
    type: String,
    required: true,
  },
  year: {
    // Year of manufacture.
    type: Number,
    required: true,
  },
  features: [String], // Array of features (e.g., "Air Conditioning", "Bluetooth").
  mileage: {
    // Current mileage of the car.
    type: Number,
  },
});

export const CarModel = mongoose.model("Car", CarSchema);

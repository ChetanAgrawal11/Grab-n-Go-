import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);

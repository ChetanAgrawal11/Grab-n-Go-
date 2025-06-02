import { Restaurant } from "../models/restaurant.model.js";

// Public: Get all restaurants, no filtering by owner
export const getAllRestaurants = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search ? { name: new RegExp(search, "i") } : {};

    const total = await Restaurant.countDocuments(query);
    const data = await Restaurant.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ total, page: +page, limit: +limit, data });
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch restaurants", error: error.message });
  }
};

// Owner: Get only restaurants owned by logged-in owner
export const getMyRestaurants = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const ownerId = req.user._id;

    const query = {
      owner: ownerId,
      ...(search && { name: new RegExp(search, "i") }),
    };

    const total = await Restaurant.countDocuments(query);
    const data = await Restaurant.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ total, page: +page, limit: +limit, data });
  } catch (error) {
    console.error("Error fetching owner restaurants:", error);
    res.status(500).json({
      message: "Failed to fetch owner restaurants",
      error: error.message,
    });
  }
};

export const addRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(201).json(restaurant);
  } catch (error) {
    console.error("Error adding restaurant:", error);
    res
      .status(500)
      .json({ message: "Failed to add restaurant", error: error.message });
  }
};

export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch restaurant", error: error.message });
  }
};

export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    if (!restaurant.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.error("Error updating restaurant:", error);
    res
      .status(500)
      .json({ message: "Failed to update restaurant", error: error.message });
  }
};

export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    if (!restaurant.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Restaurant.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res
      .status(500)
      .json({ message: "Failed to delete restaurant", error: error.message });
  }
};

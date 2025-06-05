import express from "express";
import {
  addRestaurant,
  getAllRestaurants,
  getMyRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/restaurant.controller.js";

import { protectRoute } from "../middleware/protectRoute.js";
import { restrictTo } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Owner-only routes
router.get("/my", protectRoute, restrictTo("owner"), getMyRestaurants);

router.get("/:id", getRestaurantById); // get restaurant by id
router.get("/", getAllRestaurants); // get all restaurants (public)

router.post("/", protectRoute, restrictTo("owner"), addRestaurant);
router.put("/:id", protectRoute, restrictTo("owner"), updateRestaurant);
router.delete("/:id", protectRoute, restrictTo("owner"), deleteRestaurant);

// Menu item routes (owner only)

router.post("/:id/menu", protectRoute, restrictTo("owner"), addMenuItem);
router.put(
  "/:id/menu/:itemId",
  protectRoute,
  restrictTo("owner"),
  updateMenuItem
);
router.delete(
  "/:id/menu/:itemId",
  protectRoute,
  restrictTo("owner"),
  deleteMenuItem
);

export default router;

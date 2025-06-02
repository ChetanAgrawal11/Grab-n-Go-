import express from 'express';
import {
  addRestaurant,
  getAllRestaurants,
  getMyRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from '../controllers/restaurant.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { restrictTo } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Protected routes - owners only
router.get('/my', protectRoute, restrictTo('owner'), getMyRestaurants);

router.get('/:id', getRestaurantById); // get restaurant by id

// Public route - fetching all restaurants (for users)
router.get('/', getAllRestaurants);

router.post('/', protectRoute, restrictTo('owner'), addRestaurant);
router.put('/:id', protectRoute, restrictTo('owner'), updateRestaurant);
router.delete('/:id', protectRoute, restrictTo('owner'), deleteRestaurant);

export default router;

import express from 'express';
import {
  addMenuItem,
  getMenuByProvider,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menu.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { restrictTo } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protectRoute, restrictTo('owner'), addMenuItem);
router.get('/:providerId', protectRoute, getMenuByProvider);
router.put('/:id', protectRoute, restrictTo('owner'), updateMenuItem);
router.delete('/:id', protectRoute, restrictTo('owner'), deleteMenuItem);

export default router;

import express from 'express';
import {
  addTiffin,
  getAllTiffins,
  getTiffinById,
  updateTiffin,
  deleteTiffin,
} from '../controllers/tiffin.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';
import { restrictTo } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Public routes - allow all users to view tiffins
router.get('/getAllTiffins', getAllTiffins);
router.get('/getTiffin/:id', getTiffinById);

// Protected routes - only owners can manage tiffins
router.post('/createTiffin', protectRoute, restrictTo('owner'), addTiffin);
router.put('/updateTiffin/:id', protectRoute, restrictTo('owner'), updateTiffin);
router.delete('/deleteTiffin/:id', protectRoute, restrictTo('owner'), deleteTiffin);

export default router;

// backend/routes/tiffin.routes.js

import express from "express";
import {
  createTiffin,
  getAllTiffins,
  getTiffinById,
  updateTiffin,
  deleteTiffin,
  approveMess,
  markDaily,
  requestMess,
  getMyTiffins,
  getRequestsForOwner, // <--- Add this import
  updateRequestStatus,
} from "../controllers/tiffin.controller.js";

import { protectRoute } from "../middleware/protectRoute.js";
import { restrictTo } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Public routes
router.get("/getAllTiffins", getAllTiffins);
router.get("/getTiffin/:id", getTiffinById);

// Owner routes (protected + role)
router.post("/createTiffin", protectRoute, restrictTo("owner"), createTiffin);
router.put(
  "/updateTiffin/:id",
  protectRoute,
  restrictTo("owner"),
  updateTiffin
);
router.delete(
  "/deleteTiffin/:id",
  protectRoute,
  restrictTo("owner"),
  deleteTiffin
);
router.put("/approveMess/:id", protectRoute, restrictTo("owner"), approveMess);
router.put("/markDaily/:id", protectRoute, restrictTo("owner"), markDaily);

// User routes (protected + role)
router.post(
  "/requestMess/:id",
  protectRoute,
  restrictTo("student"),
  requestMess
);
// Owner routes for managing requests
router.get(
  "/myRequests",
  protectRoute,
  restrictTo("owner"),
  getRequestsForOwner
);

router.put(
  "/updateRequestStatus/:tiffinId/:userId",
  protectRoute,
  restrictTo("owner"),
  updateRequestStatus
);

// Owner's own tiffins
router.get("/my", protectRoute, restrictTo("owner"), getMyTiffins);

export default router;

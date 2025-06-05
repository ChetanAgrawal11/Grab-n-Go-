import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDB from "./src/db/connectMongoDB.js";

import authRoutes from "./src/routes/auth.route.js";
import restaurantRoutes from "./src/routes/restaurant.route.js";
import tiffinRoutes from "./src/routes/tiffin.route.js";
import menuRoutes from "./src/routes/menu.route.js";

dotenv.config();

const app = express();

// Configure CORS for requests with credentials
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend origin
    credentials: true, // allow cookies and auth headers
  })
);

app.use(express.json());

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/tiffins", tiffinRoutes);
app.use("/api/menus", menuRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
connectMongoDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

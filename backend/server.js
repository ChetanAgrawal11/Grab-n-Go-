import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectMongoDB from './src/db/connectMongoDB.js';

import authRoutes from './src/routes/auth.route.js';
import restaurantRoutes from './src/routes/restaurant.route.js';
import tiffinRoutes from './src/routes/tiffin.route.js';
import menuRoutes from './src/routes/menu.route.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// these are the routes for the application
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/tiffins', tiffinRoutes);
app.use('/api/menus', menuRoutes);

// Connect DB and start server
const PORT = process.env.PORT || 5000;
connectMongoDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  name: String,
  price: Number,
  providerType: { type: String, enum: ['restaurant', 'tiffin'] },
  providerId: { type: mongoose.Schema.Types.ObjectId }
});

export const MenuItem = mongoose.model('MenuItem', menuSchema);

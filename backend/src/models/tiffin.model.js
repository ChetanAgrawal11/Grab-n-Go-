import mongoose from 'mongoose';

const tiffinSchema = new mongoose.Schema({
  name: String,
  area: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export const Tiffin = mongoose.model('Tiffin', tiffinSchema);

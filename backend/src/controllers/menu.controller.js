import { MenuItem } from '../models/menu.model.js';

export const addMenuItem = async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
};

export const getMenuByProvider = async (req, res) => {
  const items = await MenuItem.find({ providerId: req.params.providerId });
  res.json(items);
};

export const updateMenuItem = async (req, res) => {
  const updated = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteMenuItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
};

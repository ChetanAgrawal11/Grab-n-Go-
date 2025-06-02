import { Tiffin } from '../models/tiffin.model.js';

export const addTiffin = async (req, res) => {
  try {
    const tiffin = await Tiffin.create({ ...req.body, owner: req.user._id });
    res.status(201).json(tiffin);
  } catch (error) {
    console.error('Error adding tiffin:', error);
    res.status(500).json({ message: 'Failed to add tiffin', error: error.message });
  }
};

export const getAllTiffins = async (req, res) => {
  try {
    const { page = 1, limit = 5, search = '' } = req.query;
    const query = search ? { name: new RegExp(search, 'i') } : {};
    const total = await Tiffin.countDocuments(query);
    const data = await Tiffin.find(query).skip((page - 1) * limit).limit(Number(limit));
    res.json({ total, page: +page, limit: +limit, data });
  } catch (error) {
    console.error('Error fetching tiffins:', error);
    res.status(500).json({ message: 'Failed to fetch tiffins', error: error.message });
  }
};

export const getTiffinById = async (req, res) => {
  try {
    const tiffin = await Tiffin.findById(req.params.id);
    if (!tiffin) {
      return res.status(404).json({ message: 'Tiffin not found' });
    }
    res.json(tiffin);
  } catch (error) {
    console.error('Error fetching tiffin:', error);
    res.status(500).json({ message: 'Failed to fetch tiffin', error: error.message });
  }
};

export const updateTiffin = async (req, res) => {
  try {
    const tiffin = await Tiffin.findById(req.params.id);
    if (!tiffin) {
      return res.status(404).json({ message: 'Tiffin not found' });
    }
    if (!tiffin.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const updated = await Tiffin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error('Error updating tiffin:', error);
    res.status(500).json({ message: 'Failed to update tiffin', error: error.message });
  }
};

export const deleteTiffin = async (req, res) => {
  try {
    const tiffin = await Tiffin.findById(req.params.id);
    if (!tiffin) {
      return res.status(404).json({ message: 'Tiffin not found' });
    }
    if (!tiffin.owner.equals(req.user._id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Tiffin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tiffin deleted successfully' });
  } catch (error) {
    console.error('Error deleting tiffin:', error);
    res.status(500).json({ message: 'Failed to delete tiffin', error: error.message });
  }
};

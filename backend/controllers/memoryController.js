const Memory = require('../models/Memory');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

// Controller functions
const uploadMemory = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: req.body.category
    });

    const memory = await Memory.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      cloudinaryId: result.public_id,
      imageUrl: result.secure_url
    });

    fs.unlinkSync(req.file.path);
    res.status(201).json(memory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getMemories = async (req, res) => {
  try {
    const memories = await Memory.find({ category: req.params.category });
    res.json(memories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteMemory = async (req, res) => {
  try {
    const memory = await Memory.findById(req.params.id);
    await cloudinary.uploader.destroy(memory.cloudinaryId);
    await Memory.deleteOne({ _id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateMemory = async (req, res) => {
  try {
    const { title, description } = req.body;
    const memory = await Memory.findByIdAndUpdate(
      req.params.id,
      { title, description },
      { new: true }
    );
    if (!memory) return res.status(404).json({ error: 'Memory not found' });
    res.json(memory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Make sure to export all functions
module.exports = {
  uploadMemory,
  getMemories,
  deleteMemory,
  updateMemory
};
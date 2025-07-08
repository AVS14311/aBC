const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const { 
  uploadMemory, 
  getMemories, 
  deleteMemory,
  updateMemory
} = require('../controllers/memoryController');
const upload = require('../config/multer');

// Test if functions are properly imported
console.log('uploadMemory exists:', typeof uploadMemory === 'function');
console.log('getMemories exists:', typeof getMemories === 'function');
console.log('deleteMemory exists:', typeof deleteMemory === 'function');
console.log('updateMemory exists:', typeof updateMemory === 'function');

// Routes
router.post('/', protect, upload.single('image'), uploadMemory);
router.get('/:category', protect, getMemories);
router.delete('/:id', protect, deleteMemory);
router.put('/:id', protect, updateMemory);

module.exports = router;
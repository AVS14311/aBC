const express = require('express');
const router = express.Router();
const { login, logout, checkAuth } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/check', protect, checkAuth);

module.exports = router;
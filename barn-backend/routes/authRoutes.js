const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  getProfile,
  logout,
  verifyToken
} = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', signup);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', authenticateToken, getProfile);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post('/logout', authenticateToken, logout);

// @route   POST /api/auth/verify
// @desc    Verify JWT token
// @access  Public
router.post('/verify', verifyToken);

module.exports = router;
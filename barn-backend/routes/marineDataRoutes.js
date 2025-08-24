const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  getAISData,
  getWeatherData,
  getOceanCurrents,
  getEnvironmentalData,
  getAllMarineData
} = require('../controllers/marineDataController');

// All marine data routes require authentication
router.use(authenticateToken);

// AIS Data endpoints
router.get('/ais', getAISData);

// Weather Data endpoints
router.get('/weather', getWeatherData);

// Ocean Currents endpoints
router.get('/ocean-currents', getOceanCurrents);

// Environmental Data endpoints
router.get('/environmental', getEnvironmentalData);

// Get all marine data in one request (for dashboard)
router.get('/all', getAllMarineData);

module.exports = router;
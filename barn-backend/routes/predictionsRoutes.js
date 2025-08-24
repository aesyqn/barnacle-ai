const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  getPredictionModels,
  generatePredictions,
  getBiofoulingPrediction,
  getFuelConsumptionPrediction,
  getMaintenancePrediction,
  trainModel,
  updateModel
} = require('../controllers/predictionsController');

// All prediction routes require authentication
router.use(authenticateToken);

// Prediction Models endpoints
router.get('/models', getPredictionModels);
router.put('/models/:modelId', updateModel);
router.post('/models/:modelId/train', trainModel);

// Prediction Generation endpoints
router.post('/generate', generatePredictions);

// Specific prediction endpoints by vessel
router.get('/vessels/:vesselId/biofouling', getBiofoulingPrediction);
router.get('/vessels/:vesselId/fuel-consumption', getFuelConsumptionPrediction);
router.get('/vessels/:vesselId/maintenance', getMaintenancePrediction);

module.exports = router;
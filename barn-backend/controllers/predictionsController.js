const mongoose = require('mongoose');

// Mock prediction models and data
const generateMockPredictionModels = () => [
  {
    id: 'biofouling-v2.1',
    name: 'Biofouling Growth Predictor',
    type: 'biofouling',
    version: '2.1.3',
    status: 'active',
    accuracy: 94.2,
    lastTrained: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    trainingSamples: 125000,
    features: ['Sea Temperature', 'Salinity', 'Vessel Speed', 'Time in Port', 'Hull Material'],
    performance: {
      precision: 0.942,
      recall: 0.936,
      f1Score: 0.939,
      mae: 2.1, // Mean Absolute Error
      rmse: 3.4 // Root Mean Square Error
    }
  },
  {
    id: 'fuel-consumption-v1.8',
    name: 'Fuel Consumption Predictor',
    type: 'fuel',
    version: '1.8.2',
    status: 'active',
    accuracy: 91.7,
    lastTrained: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    trainingSamples: 89000,
    features: ['Biofouling Level', 'Weather Conditions', 'Route Distance', 'Vessel Load'],
    performance: {
      precision: 0.917,
      recall: 0.923,
      f1Score: 0.920,
      mae: 1.8,
      rmse: 2.9
    }
  },
  {
    id: 'maintenance-scheduler-v3.0',
    name: 'Maintenance Predictor',
    type: 'maintenance',
    version: '3.0.1',
    status: 'training',
    accuracy: 88.5,
    lastTrained: new Date().toISOString(),
    trainingSamples: 67000,
    features: ['Operating Hours', 'Environmental Exposure', 'Performance Degradation'],
    performance: {
      precision: 0.885,
      recall: 0.891,
      f1Score: 0.888,
      mae: 3.2,
      rmse: 4.7
    }
  }
];

const generateMockPredictions = (vesselId = null) => {
  const vessels = vesselId ? [vesselId] : ['V001', 'V002', 'V003', 'V004'];
  const predictions = [];
  
  vessels.forEach(vId => {
    // Biofouling predictions
    const biofoulingPredictions = [];
    for (let days = 7; days <= 90; days += 7) {
      const baseLevel = 20 + Math.random() * 60;
      biofoulingPredictions.push({
        timeframe: `${days}d`,
        predicted: (baseLevel + (days / 7) * 2).toFixed(1),
        confidence: (0.85 + Math.random() * 0.14).toFixed(2),
        factors: ['Sea temperature rising', 'Extended time in port'],
        recommendation: baseLevel > 50 ? 'Schedule cleaning' : 'Monitor closely'
      });
    }
    
    // Fuel consumption predictions
    const currentBiofouling = 30 + Math.random() * 40;
    const baseFuel = 85 + Math.random() * 25;
    const fuelPredictions = [];
    
    for (let days = 7; days <= 30; days += 7) {
      const fuelIncrease = (currentBiofouling / 100) * baseFuel * 0.3;
      fuelPredictions.push({
        timeframe: `${days}d`,
        predicted: (baseFuel + fuelIncrease).toFixed(1),
        baseline: baseFuel.toFixed(1),
        increase: fuelIncrease.toFixed(1),
        confidence: (0.88 + Math.random() * 0.11).toFixed(2)
      });
    }
    
    predictions.push({
      vesselId: vId,
      vesselName: `MV Fleet Star ${vId.slice(-1)}`,
      timestamp: new Date().toISOString(),
      biofouling: {
        current: currentBiofouling.toFixed(1),
        predictions: biofoulingPredictions,
        riskLevel: currentBiofouling > 60 ? 'high' : currentBiofouling > 30 ? 'moderate' : 'low'
      },
      fuelConsumption: {
        current: baseFuel.toFixed(1),
        predictions: fuelPredictions,
        potentialSavings: (baseFuel * 0.15).toFixed(1)
      },
      maintenance: {
        nextRequired: new Date(Date.now() + (30 + Math.random() * 60) * 24 * 60 * 60 * 1000).toISOString(),
        urgency: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        estimatedCost: Math.floor(50000 + Math.random() * 200000),
        confidence: (0.82 + Math.random() * 0.16).toFixed(2)
      }
    });
  });
  
  return predictions;
};

// Controller functions
const getPredictionModels = async (req, res) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const models = generateMockPredictionModels();
    
    res.status(200).json({
      success: true,
      data: models,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching prediction models:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch prediction models',
      error: error.message
    });
  }
};

const generatePredictions = async (req, res) => {
  try {
    const { vesselIds, timeframe = '30d' } = req.body;
    
    // Validate timeframe
    const validTimeframes = ['7d', '14d', '30d', '60d', '90d'];
    if (!validTimeframes.includes(timeframe)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid timeframe. Must be one of: 7d, 14d, 30d, 60d, 90d'
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const predictions = vesselIds ? 
      vesselIds.map(id => generateMockPredictions(id)[0]) :
      generateMockPredictions();
    
    res.status(200).json({
      success: true,
      data: {
        predictions,
        timeframe,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error generating predictions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate predictions',
      error: error.message
    });
  }
};

const getBiofoulingPrediction = async (req, res) => {
  try {
    const { vesselId } = req.params;
    const { timeframe = '30d' } = req.query;
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const predictions = generateMockPredictions(vesselId);
    if (predictions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vessel not found'
      });
    }
    
    const biofoulingData = predictions[0].biofouling;
    
    res.status(200).json({
      success: true,
      data: {
        vesselId,
        timeframe,
        ...biofoulingData,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching biofouling prediction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch biofouling prediction',
      error: error.message
    });
  }
};

const getFuelConsumptionPrediction = async (req, res) => {
  try {
    const { vesselId } = req.params;
    const { timeframe = '30d' } = req.query;
    
    await new Promise(resolve => setTimeout(resolve, 350));
    
    const predictions = generateMockPredictions(vesselId);
    if (predictions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vessel not found'
      });
    }
    
    const fuelData = predictions[0].fuelConsumption;
    
    res.status(200).json({
      success: true,
      data: {
        vesselId,
        timeframe,
        ...fuelData,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching fuel consumption prediction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fuel consumption prediction',
      error: error.message
    });
  }
};

const getMaintenancePrediction = async (req, res) => {
  try {
    const { vesselId } = req.params;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const predictions = generateMockPredictions(vesselId);
    if (predictions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vessel not found'
      });
    }
    
    const maintenanceData = predictions[0].maintenance;
    
    res.status(200).json({
      success: true,
      data: {
        vesselId,
        ...maintenanceData,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching maintenance prediction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch maintenance prediction',
      error: error.message
    });
  }
};

const trainModel = async (req, res) => {
  try {
    const { modelId } = req.params;
    const { trainingData, hyperparameters } = req.body;
    
    if (!trainingData) {
      return res.status(400).json({
        success: false,
        message: 'Training data is required'
      });
    }
    
    // Simulate model training time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const trainingResult = {
      modelId,
      status: 'completed',
      accuracy: 90 + Math.random() * 8,
      trainingSamples: trainingData?.samples || 50000 + Math.random() * 50000,
      trainingTime: '45 minutes',
      hyperparameters,
      performance: {
        precision: 0.85 + Math.random() * 0.1,
        recall: 0.85 + Math.random() * 0.1,
        f1Score: 0.85 + Math.random() * 0.1
      },
      completedAt: new Date().toISOString(),
      trainedBy: req.user?.email || 'system'
    };
    
    res.status(200).json({
      success: true,
      data: trainingResult,
      message: 'Model training completed successfully'
    });
  } catch (error) {
    console.error('Error training model:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to train model',
      error: error.message
    });
  }
};

const updateModel = async (req, res) => {
  try {
    const { modelId } = req.params;
    const { name, status, hyperparameters } = req.body;
    
    // Validate status
    const validStatuses = ['active', 'inactive', 'training', 'deprecated'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: active, inactive, training, deprecated'
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const updatedModel = {
      modelId,
      name,
      status,
      hyperparameters,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user?.email || 'system'
    };
    
    res.status(200).json({
      success: true,
      data: updatedModel,
      message: 'Model updated successfully'
    });
  } catch (error) {
    console.error('Error updating model:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update model',
      error: error.message
    });
  }
};

module.exports = {
  getPredictionModels,
  generatePredictions,
  getBiofoulingPrediction,
  getFuelConsumptionPrediction,
  getMaintenancePrediction,
  trainModel,
  updateModel
};
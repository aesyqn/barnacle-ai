const mongoose = require('mongoose');

// Mock data generators (will be replaced with real APIs later)
const generateMockAISData = () => {
  const vessels = [];
  const vesselNames = [
    'MV Pacific Star', 'MV Atlantic Dawn', 'SS Northern Light', 'MV Southern Cross',
    'MS Ocean Explorer', 'MV Baltic Wind', 'SS Arctic Fox', 'MV Mediterranean Pearl'
  ];

  for (let i = 0; i < 8; i++) {
    vessels.push({
      id: `IMO${9234567 + i}`,
      name: vesselNames[i],
      lat: (Math.random() - 0.5) * 180,
      lng: (Math.random() - 0.5) * 360,
      speed: (Math.random() * 20).toFixed(1),
      course: Math.floor(Math.random() * 360),
      status: ['Under way using engine', 'At anchor', 'Moored', 'Not under command'][Math.floor(Math.random() * 4)],
      lastUpdate: new Date().toISOString(),
      draught: (5 + Math.random() * 10).toFixed(1),
      destination: ['Singapore', 'Rotterdam', 'Los Angeles', 'Shanghai'][Math.floor(Math.random() * 4)]
    });
  }

  return {
    vessels,
    totalMessages: Math.floor(Math.random() * 10000) + 50000,
    activeVessels: vessels.length,
    avgUpdateRate: '30s',
    coverage: '98.5%'
  };
};

const generateMockWeatherData = () => ({
  conditions: [
    {
      location: 'Singapore Strait',
      coordinates: { lat: 1.2966, lng: 103.8522 },
      windSpeed: (10 + Math.random() * 20).toFixed(1),
      windDirection: Math.floor(Math.random() * 360),
      windGust: (15 + Math.random() * 25).toFixed(1),
      waveHeight: (1 + Math.random() * 3).toFixed(1),
      waveDirection: Math.floor(Math.random() * 360),
      wavePeriod: (4 + Math.random() * 8).toFixed(1),
      visibility: (5 + Math.random() * 10).toFixed(1),
      temperature: (25 + Math.random() * 10).toFixed(1),
      humidity: Math.floor(Math.random() * 30) + 60,
      pressure: (1005 + Math.random() * 20).toFixed(1),
      cloudCover: Math.floor(Math.random() * 100),
      precipitation: (Math.random() * 5).toFixed(1),
      lastUpdate: new Date().toISOString()
    },
    {
      location: 'North Sea',
      coordinates: { lat: 56.0, lng: 3.0 },
      windSpeed: (15 + Math.random() * 25).toFixed(1),
      windDirection: Math.floor(Math.random() * 360),
      windGust: (20 + Math.random() * 30).toFixed(1),
      waveHeight: (2 + Math.random() * 4).toFixed(1),
      waveDirection: Math.floor(Math.random() * 360),
      wavePeriod: (5 + Math.random() * 7).toFixed(1),
      visibility: (3 + Math.random() * 12).toFixed(1),
      temperature: (8 + Math.random() * 12).toFixed(1),
      humidity: Math.floor(Math.random() * 25) + 70,
      pressure: (995 + Math.random() * 25).toFixed(1),
      cloudCover: Math.floor(Math.random() * 100),
      precipitation: (Math.random() * 10).toFixed(1),
      lastUpdate: new Date().toISOString()
    }
  ],
  forecast: {
    '24h': { windSpeed: '18.5', waveHeight: '2.1', temperature: '16.2' },
    '48h': { windSpeed: '22.1', waveHeight: '2.8', temperature: '14.7' },
    '72h': { windSpeed: '19.3', waveHeight: '2.3', temperature: '15.9' }
  },
  warnings: [],
  forecastAccuracy: '94.2%'
});

const generateMockOceanCurrents = () => ({
  currents: [
    {
      region: 'Malacca Strait',
      coordinates: { lat: 2.5, lng: 102.5 },
      speed: (0.5 + Math.random() * 2).toFixed(2),
      direction: Math.floor(Math.random() * 360),
      temperature: (28 + Math.random() * 4).toFixed(1),
      salinity: (33 + Math.random() * 2).toFixed(1),
      depth: '0-50m',
      lastUpdate: new Date().toISOString()
    },
    {
      region: 'English Channel',
      coordinates: { lat: 50.5, lng: 1.0 },
      speed: (0.8 + Math.random() * 2.5).toFixed(2),
      direction: Math.floor(Math.random() * 360),
      temperature: (12 + Math.random() * 6).toFixed(1),
      salinity: (34 + Math.random() * 1.5).toFixed(1),
      depth: '0-50m',
      lastUpdate: new Date().toISOString()
    }
  ],
  modelInfo: {
    resolution: '1/12°',
    updateFrequency: '3 hours',
    dataSource: 'HYCOM Global Ocean Model',
    accuracy: '92%'
  }
});

const generateMockEnvironmentalData = () => {
  const seaTemp = 25 + Math.random() * 8;
  const salinity = 33 + Math.random() * 3;
  
  // Calculate biofouling risk based on environmental factors
  let riskLevel = 'low';
  let riskScore = 0;
  
  if (seaTemp > 25 && seaTemp < 30) riskScore += 30;
  if (seaTemp >= 30) riskScore += 50;
  if (salinity > 34) riskScore += 20;
  if (salinity > 35) riskScore += 30;
  
  if (riskScore > 60) riskLevel = 'high';
  else if (riskScore > 30) riskLevel = 'moderate';

  return {
    biofoulingFactors: {
      seaTemperature: seaTemp.toFixed(1),
      salinity: salinity.toFixed(1),
      dissolvedOxygen: (6 + Math.random() * 3).toFixed(1),
      turbidity: (5 + Math.random() * 15).toFixed(1),
      phLevel: (7.8 + Math.random() * 0.6).toFixed(2),
      nutrients: {
        nitrates: (0.1 + Math.random() * 2).toFixed(2),
        phosphates: (0.05 + Math.random() * 0.5).toFixed(3),
        silicates: (1 + Math.random() * 10).toFixed(1)
      }
    },
    biofoulingRisk: {
      level: riskLevel,
      score: riskScore,
      factors: riskLevel === 'high' ? 
        ['Optimal temperature range', 'High salinity levels', 'Nutrient rich waters'] :
        riskLevel === 'moderate' ? 
        ['Moderate temperature', 'Normal salinity levels'] :
        ['Sub-optimal conditions', 'Low nutrient levels']
    },
    waterQuality: {
      pollutionLevel: Math.random() > 0.7 ? 'moderate' : 'low',
      oilSpills: [],
      plasticDebris: (Math.random() * 50).toFixed(0)
    },
    lastAssessment: new Date().toISOString()
  };
};

// Controller functions
const getAISData = async (req, res) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const aisData = generateMockAISData();
    
    res.status(200).json({
      success: true,
      data: aisData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching AIS data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch AIS data',
      error: error.message
    });
  }
};

const getWeatherData = async (req, res) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const weatherData = generateMockWeatherData();
    
    res.status(200).json({
      success: true,
      data: weatherData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch weather data',
      error: error.message
    });
  }
};

const getOceanCurrents = async (req, res) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const currentData = generateMockOceanCurrents();
    
    res.status(200).json({
      success: true,
      data: currentData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching ocean current data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ocean current data',
      error: error.message
    });
  }
};

const getEnvironmentalData = async (req, res) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 350));
    
    const envData = generateMockEnvironmentalData();
    
    res.status(200).json({
      success: true,
      data: envData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching environmental data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch environmental data',
      error: error.message
    });
  }
};

// Get all marine data in one request (for dashboard)
const getAllMarineData = async (req, res) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const allData = {
      ais: generateMockAISData(),
      weather: generateMockWeatherData(),
      oceanCurrents: generateMockOceanCurrents(),
      environmental: generateMockEnvironmentalData()
    };
    
    res.status(200).json({
      success: true,
      data: allData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching all marine data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch marine data',
      error: error.message
    });
  }
};

module.exports = {
  getAISData,
  getWeatherData,
  getOceanCurrents,
  getEnvironmentalData,
  getAllMarineData
};
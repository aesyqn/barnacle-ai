const mongoose = require('mongoose');

// Mock fleet data generator
const generateMockFleetData = () => {
  const vessels = [];
  const vesselTypes = ['Container Ship', 'Bulk Carrier', 'Tanker', 'RoRo'];
  const operators = ['Maersk', 'MSC', 'CMA CGM', 'COSCO'];
  
  for (let i = 1; i <= 8; i++) {
    const biofoulingLevel = Math.random() * 100;
    const fuelEfficiency = 85 + Math.random() * 30;
    
    vessels.push({
      id: `V${i.toString().padStart(3, '0')}`,
      imo: `IMO${9000000 + i}`,
      name: `MV Fleet Star ${i}`,
      type: vesselTypes[Math.floor(Math.random() * vesselTypes.length)],
      operator: operators[Math.floor(Math.random() * operators.length)],
      
      status: ['Active', 'In Port', 'Maintenance'][Math.floor(Math.random() * 3)],
      currentPort: ['Singapore', 'Rotterdam', 'Los Angeles'][Math.floor(Math.random() * 3)],
      
      performance: {
        biofoulingLevel: biofoulingLevel.toFixed(1),
        fuelConsumption: fuelEfficiency.toFixed(1),
        speedReduction: (Math.random() * 15).toFixed(1),
        operationalEfficiency: (100 - Math.random() * 15).toFixed(1),
        lastUpdate: new Date().toISOString()
      },
      
      maintenance: {
        status: ['Scheduled', 'Overdue', 'Current'][Math.floor(Math.random() * 3)],
        priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        nextService: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
        lastService: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString()
      },
      
      route: {
        current: `Route ${String.fromCharCode(65 + i % 26)}`,
        distance: Math.floor(Math.random() * 5000) + 1000,
        fuelEstimate: Math.floor(Math.random() * 300) + 100
      },
      
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  }
  
  return {
    vessels,
    summary: {
      totalVessels: vessels.length,
      activeVessels: vessels.filter(v => v.status === 'Active').length,
      inMaintenance: vessels.filter(v => v.status === 'Maintenance').length,
      avgBiofouling: (vessels.reduce((sum, v) => sum + parseFloat(v.performance.biofoulingLevel), 0) / vessels.length).toFixed(1),
      avgFuelEfficiency: (vessels.reduce((sum, v) => sum + parseFloat(v.performance.fuelConsumption), 0) / vessels.length).toFixed(1)
    }
  };
};

// Controller functions
const getFleetData = async (req, res) => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const fleetData = generateMockFleetData();
    
    res.status(200).json({
      success: true,
      data: fleetData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching fleet data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch fleet data',
      error: error.message
    });
  }
};

const getVesselById = async (req, res) => {
  try {
    const { vesselId } = req.params;
    
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Find vessel in mock data
    const fleetData = generateMockFleetData();
    const vessel = fleetData.vessels.find(v => v.id === vesselId || v.imo === vesselId);
    
    if (!vessel) {
      return res.status(404).json({
        success: false,
        message: 'Vessel not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: vessel,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching vessel data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vessel data',
      error: error.message
    });
  }
};

const updateVesselStatus = async (req, res) => {
  try {
    const { vesselId } = req.params;
    const { status, currentPort } = req.body;
    
    // Validate status
    const validStatuses = ['Active', 'In Port', 'Maintenance'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: Active, In Port, Maintenance'
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate update
    const updatedVessel = {
      vesselId,
      status,
      currentPort,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user?.email || 'system'
    };
    
    res.status(200).json({
      success: true,
      data: updatedVessel,
      message: 'Vessel status updated successfully'
    });
  } catch (error) {
    console.error('Error updating vessel status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update vessel status',
      error: error.message
    });
  }
};

const scheduleMaintenance = async (req, res) => {
  try {
    const { vesselId } = req.params;
    const { 
      type, 
      scheduledDate, 
      priority = 'Medium',
      description,
      estimatedDuration,
      estimatedCost 
    } = req.body;
    
    // Validate required fields
    if (!type || !scheduledDate) {
      return res.status(400).json({
        success: false,
        message: 'Type and scheduled date are required'
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const maintenanceRecord = {
      id: Math.random().toString(36).substr(2, 9),
      vesselId,
      type,
      scheduledDate,
      priority,
      description,
      estimatedDuration,
      estimatedCost,
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
      createdBy: req.user?.email || 'system'
    };
    
    res.status(201).json({
      success: true,
      data: maintenanceRecord,
      message: 'Maintenance scheduled successfully'
    });
  } catch (error) {
    console.error('Error scheduling maintenance:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to schedule maintenance',
      error: error.message
    });
  }
};

const getMaintenanceSchedule = async (req, res) => {
  try {
    const { vesselId } = req.params;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Generate mock maintenance schedule
    const maintenanceItems = [];
    const maintenanceTypes = ['Hull Cleaning', 'Engine Service', 'Safety Inspection', 'Propeller Maintenance'];
    
    for (let i = 0; i < 5; i++) {
      maintenanceItems.push({
        id: Math.random().toString(36).substr(2, 9),
        vesselId,
        type: maintenanceTypes[Math.floor(Math.random() * maintenanceTypes.length)],
        scheduledDate: new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
        priority: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        status: ['Scheduled', 'In Progress', 'Completed'][Math.floor(Math.random() * 3)],
        estimatedCost: Math.floor(Math.random() * 50000) + 10000,
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }
    
    res.status(200).json({
      success: true,
      data: maintenanceItems,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching maintenance schedule:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch maintenance schedule',
      error: error.message
    });
  }
};

const updateMaintenanceStatus = async (req, res) => {
  try {
    const { maintenanceId } = req.params;
    const { status, notes, actualCost, completedDate } = req.body;
    
    const validStatuses = ['Scheduled', 'In Progress', 'Completed', 'Cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: Scheduled, In Progress, Completed, Cancelled'
      });
    }
    
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const updatedMaintenance = {
      maintenanceId,
      status,
      notes,
      actualCost,
      completedDate,
      updatedAt: new Date().toISOString(),
      updatedBy: req.user?.email || 'system'
    };
    
    res.status(200).json({
      success: true,
      data: updatedMaintenance,
      message: 'Maintenance status updated successfully'
    });
  } catch (error) {
    console.error('Error updating maintenance status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update maintenance status',
      error: error.message
    });
  }
};

module.exports = {
  getFleetData,
  getVesselById,
  updateVesselStatus,
  scheduleMaintenance,
  getMaintenanceSchedule,
  updateMaintenanceStatus
};
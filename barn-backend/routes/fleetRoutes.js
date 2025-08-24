const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authMiddleware');
const {
  getFleetData,
  getVesselById,
  updateVesselStatus,
  scheduleMaintenance,
  getMaintenanceSchedule,
  updateMaintenanceStatus
} = require('../controllers/fleetController');

// All fleet routes require authentication
router.use(authenticateToken);

// Fleet Data endpoints
router.get('/', getFleetData);
router.get('/:vesselId', getVesselById);

// Vessel Management endpoints
router.put('/:vesselId/status', updateVesselStatus);

// Maintenance endpoints
router.get('/:vesselId/maintenance', getMaintenanceSchedule);
router.post('/:vesselId/maintenance', scheduleMaintenance);
router.put('/maintenance/:maintenanceId', updateMaintenanceStatus);

module.exports = router;
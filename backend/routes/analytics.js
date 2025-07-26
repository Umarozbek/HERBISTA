const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
router.get('/sales', analyticsController.sales);
router.get('/revenue', analyticsController.revenue);
router.get('/customers', analyticsController.customers);
module.exports = router; 
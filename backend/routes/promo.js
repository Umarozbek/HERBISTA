 const express = require('express');
 const {ClearCodes,CreateCodes,GetAllCodes,GetByPromo} = require('../controllers/promoController');


const router = express.Router();

router.get('/', GetAllCodes);
router.post('/:value', CreateCodes);
router.delete('/clear', ClearCodes);
router.get('/:promo', GetByPromo);

module.exports = router; 
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { default: uploadImage } = require('../middleware/uploadImage');
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getOne);
router.post('/', uploadImage, categoryController.create);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router; 
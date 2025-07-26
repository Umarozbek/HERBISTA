const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const upload = require('../middleware/upload');

router.get('/', galleryController.getAllGalleryItems);
router.post('/', upload.single('image'), galleryController.createGalleryItem);
router.put('/:id', upload.single('image'), galleryController.updateGalleryItem);
router.delete('/:id', galleryController.deleteGalleryItem);

module.exports = router; 
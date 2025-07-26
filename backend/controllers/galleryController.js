const Gallery = require('../models/Gallery');

exports.getAllGalleryItems = async (req, res) => {
  console.log('getAllGalleryItems called');
  try {
    const items = await Gallery.find();
    console.log('getAllGalleryItems success');
    res.json({ data: items });
  } catch (err) {
    console.error('getAllGalleryItems error:', err);
    res.status(500).json({ error: 'Failed to fetch gallery items' });
  }
};

exports.createGalleryItem = async (req, res) => {
  console.log('createGalleryItem called');
  try {
    const newItem = new Gallery({
      ...req.body,
      imageUrl: req.file ? `/uploads/gallery/${req.file.filename}` : req.body.imageUrl
    });
    await newItem.save();
    console.log('createGalleryItem success');
    res.status(201).json({ data: newItem });
  } catch (err) {
    console.error('createGalleryItem error:', err);
    res.status(400).json({ error: 'Failed to create gallery item' });
  }
};

exports.updateGalleryItem = async (req, res) => {
  console.log('updateGalleryItem called');
  try {
    const updateData = {
      ...req.body
    };
    if (req.file) {
      updateData.imageUrl = `/uploads/gallery/${req.file.filename}`;
    }
    const updated = await Gallery.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updated) {
      console.log('updateGalleryItem not found');
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    console.log('updateGalleryItem success');
    res.json({ data: updated });
  } catch (err) {
    console.error('updateGalleryItem error:', err);
    res.status(400).json({ error: 'Failed to update gallery item' });
  }
};

exports.deleteGalleryItem = async (req, res) => {
  console.log('deleteGalleryItem called');
  try {
    const deleted = await Gallery.findByIdAndDelete(req.params.id);
    if (!deleted) {
      console.log('deleteGalleryItem not found');
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    console.log('deleteGalleryItem success');
    res.json({ message: 'Gallery item deleted' });
  } catch (err) {
    console.error('deleteGalleryItem error:', err);
    res.status(400).json({ error: 'Failed to delete gallery item' });
  }
}; 
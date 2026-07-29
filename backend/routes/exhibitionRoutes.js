import express from 'express';
import Exhibition from '../models/Exhibition.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Fetch all exhibitions (Upcoming & Past Galleries)
// @route   GET /api/exhibitions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const exhibitions = await Exhibition.find({}).sort({ createdAt: -1 });
    res.json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create new exhibition pop-up or gallery item
// @route   POST /api/exhibitions
// @access  Private (Admin Only)
router.post('/', protectAdmin, async (req, res) => {
  try {
    const exhibition = new Exhibition(req.body);
    const createdExhibition = await exhibition.save();
    res.status(201).json(createdExhibition);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Update an exhibition
// @route   PUT /api/exhibitions/:id
// @access  Private (Admin Only)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id);

    if (exhibition) {
      Object.assign(exhibition, req.body);
      const updatedExhibition = await exhibition.save();
      res.json(updatedExhibition);
    } else {
      res.status(404).json({ message: 'Exhibition item not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Delete an exhibition item
// @route   DELETE /api/exhibitions/:id
// @access  Private (Admin Only)
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id);

    if (exhibition) {
      await exhibition.deleteOne();
      res.json({ message: 'Exhibition item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Exhibition item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

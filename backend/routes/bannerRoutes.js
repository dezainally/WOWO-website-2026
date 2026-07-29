import express from 'express';
import Banner from '../models/Banner.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Get Hero Banner & Announcement Bar configuration
// @route   GET /api/banner
// @access  Public
router.get('/', async (req, res) => {
  try {
    let banner = await Banner.findOne();
    if (!banner) {
      banner = await Banner.create({});
    }
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update Hero Banner & Announcement Ticker
// @route   PUT /api/banner
// @access  Private (Admin Only)
router.put('/', protectAdmin, async (req, res) => {
  try {
    let banner = await Banner.findOne();
    if (!banner) {
      banner = new Banner(req.body);
    } else {
      Object.assign(banner, req.body);
    }
    const updatedBanner = await banner.save();
    res.json(updatedBanner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

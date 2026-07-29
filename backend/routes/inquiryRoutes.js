import express from 'express';
import Inquiry from '../models/Inquiry.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Submit a new lead (Price Request, WhatsApp click, VIP RSVP)
// @route   POST /api/inquiries
// @access  Public (Submitted from website)
router.post('/', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    const createdInquiry = await inquiry.save();
    res.status(201).json(createdInquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc    Get all inquiries / lead submissions
// @route   GET /api/inquiries
// @access  Private (Admin Only)
router.get('/', protectAdmin, async (req, res) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update inquiry status (NEW -> CONTACTED -> CLOSED)
// @route   PUT /api/inquiries/:id
// @access  Private (Admin Only)
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);

    if (inquiry) {
      inquiry.status = req.body.status || inquiry.status;
      const updatedInquiry = await inquiry.save();
      res.json(updatedInquiry);
    } else {
      res.status(404).json({ message: 'Inquiry not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;

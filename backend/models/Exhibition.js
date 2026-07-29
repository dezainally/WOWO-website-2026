import mongoose from 'mongoose';

const exhibitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide an exhibition title'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please specify city'],
      trim: true
    },
    venue: {
      type: String,
      required: [true, 'Please specify venue'],
      trim: true
    },
    dates: {
      type: String,
      required: [true, 'Please specify exhibition dates']
    },
    time: {
      type: String,
      default: '10:30 AM - 8:30 PM'
    },
    status: {
      type: String,
      default: 'Upcoming Next'
    },
    badge: {
      type: String,
      default: 'Exclusive Pop-up'
    },
    description: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      required: true
    },
    highlights: {
      type: [String],
      default: []
    },
    isPastExhibition: {
      type: Boolean,
      default: false
    },
    year: {
      type: String,
      default: '2026'
    },
    media: [
      {
        type: {
          type: String,
          enum: ['image', 'video'],
          default: 'image'
        },
        src: { type: String, required: true },
        poster: { type: String },
        caption: { type: String }
      }
    ]
  },
  {
    timestamps: true
  }
);

export const Exhibition = mongoose.model('Exhibition', exhibitionSchema);
export default Exhibition;

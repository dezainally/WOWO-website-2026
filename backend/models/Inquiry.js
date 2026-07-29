import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['PRICE_REQUEST', 'WHATSAPP_INQUIRY', 'EXHIBITION_RSVP'],
      default: 'PRICE_REQUEST'
    },
    productName: {
      type: String
    },
    productSku: {
      type: String
    },
    customerName: {
      type: String,
      required: true
    },
    customerPhone: {
      type: String,
      required: true
    },
    customerEmail: {
      type: String
    },
    city: {
      type: String
    },
    eventInterest: {
      type: String
    },
    notes: {
      type: String
    },
    status: {
      type: String,
      enum: ['NEW', 'CONTACTED', 'CLOSED'],
      default: 'NEW'
    }
  },
  {
    timestamps: true
  }
);

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;

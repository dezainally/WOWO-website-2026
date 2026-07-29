import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    announcementText: {
      type: String,
      default: '✨ CELEBRATE WITH WOWO STUDIO: EXPLORE OUR MONTHLY BOUTIQUE EXHIBITIONS & BESPOKE BRIDAL COUTURE! CALL / INQUIRE FOR PRIVATE FITTINGS ✨'
    },
    announcementPhone: {
      type: String,
      default: '+91 96667 48789'
    },
    heroBadge: {
      type: String,
      default: 'BESPOKE INDIAN BRIDAL & HERITAGE WEAVES'
    },
    heroTitle: {
      type: String,
      default: 'ROYAL ELEGANCE IN EVERY THREAD'
    },
    heroSubtitle: {
      type: String,
      default: 'Handcrafted Kanjeevarams, Opulent Lehengas & Artisanal Groomswear for Royal Occasions'
    },
    heroVideoUrl: {
      type: String
    },
    heroImageUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export const Banner = mongoose.model('Banner', bannerSchema);
export default Banner;

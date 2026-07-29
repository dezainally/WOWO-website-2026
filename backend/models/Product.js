import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: ['all', 'sarees', 'lehengas', 'fusion', 'sherwanis', 'dupattas', 'gowns']
    },
    categoryName: {
      type: String,
      default: 'Couture'
    },
    sku: {
      type: String,
      required: [true, 'Please provide a SKU code'],
      unique: true,
      trim: true
    },
    tag: {
      type: String,
      default: 'Bespoke'
    },
    priceText: {
      type: String,
      default: 'Price on Request'
    },
    numericPrice: {
      type: Number,
      default: 0
    },
    images: {
      type: [String],
      required: [true, 'Please provide at least one product image']
    },
    shortDesc: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    fabric: {
      type: String,
      default: '100% Pure Handloom Silk'
    },
    craft: {
      type: String,
      default: 'Artisanal Zari Embroidery'
    },
    occasion: {
      type: String,
      default: 'Weddings & Celebrations'
    },
    care: {
      type: String,
      default: 'Dry Clean Only.'
    },
    leadTime: {
      type: String,
      default: '2 Weeks Handcrafted Delivery'
    },
    inStock: {
      type: Boolean,
      default: true
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export const Product = mongoose.model('Product', productSchema);
export default Product;

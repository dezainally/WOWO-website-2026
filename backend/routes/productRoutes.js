import express from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

let memoryProducts = [
  {
    _id: '66a8b1c4e901',
    name: 'Ikshita Kanjeevaram Saree',
    category: 'sarees',
    categoryName: 'Sarees',
    sku: 'WOWO-SAR-001',
    tag: 'Bespoke',
    priceText: '7999/-',
    images: ['/assets/images/image4.jpg', '/assets/images/image1.png', '/assets/images/image2.jpg'],
    shortDesc: 'Pure hand-loomed mulberry silk Kanjeevaram saree embellished with authentic gold zari weaves and royal peacock motifs.',
    description: 'The Ikshita Kanjeevaram Saree embodies timeless royal elegance.',
    fabric: '100% Pure Mulberry Silk with 24K Gold Zari',
    craft: 'Traditional Kanjeevaram Handloom Weaving',
    inStock: true
  },
  {
    _id: '66a8b1c4e902',
    name: 'Ruhani Velvet Dupatta & Lehenga',
    category: 'lehengas',
    categoryName: 'Bridal Lehengas',
    sku: 'WOWO-LEH-002',
    tag: 'Bridal Edit',
    priceText: 'Price on Request',
    images: ['/assets/images/image1.png', '/assets/images/image2.jpg'],
    shortDesc: 'Statement deep emerald velvet dupatta with heavy gold marodi and pearl border work.',
    fabric: 'Plush Silk Velvet & Organza',
    craft: 'Marodi & Pearl Artisan Hand Embroidery',
    inStock: true
  },
  {
    _id: '66a8b1c4e903',
    name: 'Vanya Indo-Western Fusion Set',
    category: 'fusion',
    categoryName: 'Fusion Wear',
    sku: 'WOWO-FUS-003',
    tag: 'Contemporary',
    priceText: '12999/-',
    images: ['/assets/images/image2.jpg', '/assets/images/image3.jpg'],
    shortDesc: 'Modern jacket style Indo-Western cape set with sequin embellishments and drape trousers.',
    fabric: 'Georgette & Raw Silk',
    craft: 'Hand-sewn Sequin & Threadwork',
    inStock: true
  },
  {
    _id: '66a8b1c4e904',
    name: 'Royal Heritage Groom Sherwani',
    category: 'sherwanis',
    categoryName: 'Sherwanis',
    sku: 'WOWO-SHR-004',
    tag: 'Royal Groom',
    priceText: 'Price on Request',
    images: ['/assets/images/image3.jpg', '/assets/images/image4.jpg'],
    shortDesc: 'Bespoke hand-embroidered groom sherwani with antique gold zari motifs.',
    fabric: 'Silk Brocade',
    craft: 'Antique Zari & Dabka Embroidery',
    inStock: true
  }
];

// @desc    Fetch all products with optional category & search filter
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const { category, search } = req.query;
      let query = {};

      if (category && category !== 'all') {
        query.category = category;
      }

      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { sku: { $regex: search, $options: 'i' } },
          { shortDesc: { $regex: search, $options: 'i' } }
        ];
      }

      const products = await Product.find(query).sort({ createdAt: -1 });
      if (products && products.length > 0) {
        return res.json(products);
      }
    } catch (error) {
      console.log('Using in-memory fallback for products');
    }
  }

  // Fast fallback
  const { category, search } = req.query;
  let result = [...memoryProducts];
  if (category && category !== 'all') {
    result = result.filter(p => p.category === category);
  }
  if (search) {
    result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase()));
  }
  res.json(result);
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        return res.json(product);
      }
    } catch (error) {
      console.log('Using fallback for product detail');
    }
  }

  const found = memoryProducts.find(p => p._id === req.params.id || p.sku === req.params.id);
  if (found) {
    res.json(found);
  } else {
    res.json(memoryProducts[0]);
  }
});

// @desc    Create a new product
// @route   POST /api/products
// @access  Private (Admin Only)
router.post('/', protectAdmin, async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const product = new Product(req.body);
      const createdProduct = await product.save();
      return res.status(201).json(createdProduct);
    } catch (error) {
      console.log('Creating in memory fallback');
    }
  }

  const newProd = {
    _id: `mem-${Date.now()}`,
    ...req.body,
    createdAt: new Date().toISOString()
  };
  memoryProducts.unshift(newProd);
  res.status(201).json(newProd);
});

// @desc    Update an existing product
// @route   PUT /api/products/:id
// @access  Private (Admin Only)
router.put('/:id', protectAdmin, async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        Object.assign(product, req.body);
        const updatedProduct = await product.save();
        return res.json(updatedProduct);
      }
    } catch (error) {
      console.log('Updating in memory fallback');
    }
  }

  const idx = memoryProducts.findIndex(p => p._id === req.params.id);
  if (idx !== -1) {
    memoryProducts[idx] = { ...memoryProducts[idx], ...req.body };
    res.json(memoryProducts[idx]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (Admin Only)
router.delete('/:id', protectAdmin, async (req, res) => {
  if (mongoose.connection.readyState === 1) {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        await product.deleteOne();
        return res.json({ message: 'Product removed successfully' });
      }
    } catch (error) {
      console.log('Deleting from memory fallback');
    }
  }

  memoryProducts = memoryProducts.filter(p => p._id !== req.params.id);
  res.json({ message: 'Product removed successfully' });
});

export default router;

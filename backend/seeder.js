import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/Product.js';
import Exhibition from './models/Exhibition.js';
import Banner from './models/Banner.js';
import User from './models/User.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear existing collections
    await Product.deleteMany();
    await Exhibition.deleteMany();
    await Banner.deleteMany();
    await User.deleteMany();

    // Create Initial Admin Account
    await User.create({
      username: 'admin',
      email: 'admin@wowostudio.com',
      password: 'admin123password',
      role: 'SUPER_ADMIN'
    });

    console.log(`👤 Admin Account Created: username = admin, email = admin@wowostudio.com`);

    // Import Products
    const sampleProducts = [
      {
        name: 'Ikshita Kanjeevaram Saree',
        category: 'sarees',
        categoryName: 'Sarees',
        sku: 'WOWO-SAR-001',
        tag: 'Bespoke',
        priceText: '7999/-',
        images: ['/assets/images/image4.jpg', '/assets/images/image1.png', '/assets/images/image2.jpg'],
        shortDesc: 'Pure hand-loomed mulberry silk Kanjeevaram saree embellished with authentic gold zari weaves and royal peacock motifs.',
        description: 'The Ikshita Kanjeevaram Saree embodies timeless royal elegance. Handcrafted over 180 hours by master weavers in Kanchipuram.',
        fabric: '100% Pure Mulberry Silk with 24K Gold Zari',
        craft: 'Traditional Kanjeevaram Handloom Weaving',
        occasion: 'Weddings & Celebrations',
        care: 'Dry Clean Only.',
        leadTime: '2 Weeks Handcrafted Delivery',
        inStock: true
      },
      {
        name: 'Ruhani Velvet Dupatta & Lehenga',
        category: 'lehengas',
        categoryName: 'Bridal Lehengas',
        sku: 'WOWO-LEH-002',
        tag: 'Bridal Edit',
        priceText: 'Price on Request',
        images: ['/assets/images/image1.png', '/assets/images/image2.jpg', '/assets/images/heroimage.webp'],
        shortDesc: 'Statement deep emerald velvet dupatta with heavy gold marodi and pearl border work.',
        description: 'Elevate any ensemble with the Ruhani Velvet Dupatta. Crafted from plush emerald green velvet.',
        fabric: 'Plush Silk Velvet & Organza',
        craft: 'Marodi & Pearl Artisan Hand Embroidery',
        occasion: 'Weddings, Receptions, Winter Festivities',
        care: 'Dry Clean Only.',
        leadTime: '3 Weeks Handcrafted Delivery',
        inStock: true
      },
      {
        name: 'Vanya Indo-Western Fusion Set',
        category: 'fusion',
        categoryName: 'Fusion Wear',
        sku: 'WOWO-FUS-003',
        tag: 'Contemporary',
        priceText: '12999/-',
        images: ['/assets/images/image2.jpg', '/assets/images/image3.jpg', '/assets/images/image4.jpg'],
        shortDesc: 'Modern jacket style Indo-Western cape set with sequin embellishments and drape trousers.',
        description: 'Chic fusion ensemble blending traditional handwork with contemporary silhouettes.',
        fabric: 'Georgette & Raw Silk',
        craft: 'Hand-sewn Sequin & Threadwork',
        occasion: 'Sangeet, Cocktail Parties',
        care: 'Dry Clean Only.',
        leadTime: '10 Days Delivery',
        inStock: true
      },
      {
        name: 'Royal Heritage Groom Sherwani',
        category: 'sherwanis',
        categoryName: 'Sherwanis',
        sku: 'WOWO-SHR-004',
        tag: 'Royal Groom',
        priceText: 'Price on Request',
        images: ['/assets/images/image3.jpg', '/assets/images/image4.jpg'],
        shortDesc: 'Bespoke hand-embroidered groom sherwani with antique gold zari motifs.',
        description: 'Designed for royal grooms, featuring mandarin collar and tailored luxury fit.',
        fabric: 'Silk Brocade',
        craft: 'Antique Zari & Dabka Embroidery',
        occasion: 'Groom Wedding Ceremony',
        care: 'Dry Clean Only.',
        leadTime: '3 Weeks Delivery',
        inStock: true
      }
    ];

    await Product.insertMany(sampleProducts);
    console.log(`🛍️ Imported ${sampleProducts.length} Couture Products`);

    // Import Upcoming Exhibitions
    const sampleExhibitions = [
      {
        title: 'The Royal Bridal & Festive Couture Edit 2026',
        city: 'Hyderabad',
        venue: 'Taj Krishna, Jubilee Hall, Banjara Hills',
        dates: 'August 14 - 16, 2026',
        time: '10:30 AM - 8:30 PM',
        status: 'Upcoming Next',
        badge: 'Exclusive Pop-up',
        description: 'Join us for an exclusive 3-day boutique showcase featuring our latest bridal lehengas.',
        image: '/assets/images/heroimage.webp',
        highlights: ['Private 1-on-1 consultations with Chief Designer Samatha Chowdary', 'Exclusive preview of Festive 2026 Trunk Collection'],
        isPastExhibition: false
      },
      {
        title: 'Symphony of Silks & Zari - Festive Trunk Show',
        city: 'Mumbai',
        venue: 'The St. Regis Mumbai, Lower Parel',
        dates: 'September 08 - 10, 2026',
        time: '11:00 AM - 8:00 PM',
        status: 'Registration Open',
        badge: 'Festive Special',
        description: 'An opulent luxury showcase tailored for Mumbai fashion connoisseurs.',
        image: '/assets/images/image2.jpg',
        highlights: ['Live handloom weaving demonstration', 'Curated bridal trousseau styling sessions'],
        isPastExhibition: false
      }
    ];

    await Exhibition.insertMany(sampleExhibitions);
    console.log(`📅 Imported Exhibitions`);

    // Import Initial Hero Banner
    await Banner.create({
      announcementText: '✨ EXPLORE OUR MONTHLY BOUTIQUE EXHIBITIONS & BESPOKE BRIDAL COUTURE! CALL / INQUIRE FOR PRIVATE FITTINGS ✨',
      announcementPhone: '+91 96667 48789',
      heroBadge: 'BESPOKE INDIAN BRIDAL & HERITAGE WEAVES',
      heroTitle: 'ROYAL ELEGANCE IN EVERY THREAD',
      heroSubtitle: 'Handcrafted Kanjeevarams, Opulent Lehengas & Artisanal Groomswear for Royal Occasions'
    });

    console.log(`🖼️ Initial Banner & Announcement Ticker Created`);
    console.log(`🎉 Database Seeding Complete!`);
    process.exit();
  } catch (error) {
    console.error(`❌ Error importing seed data: ${error.message}`);
    process.exit(1);
  }
};

importData();

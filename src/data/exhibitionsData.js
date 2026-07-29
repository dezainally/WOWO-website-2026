import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/image4.jpg';
import heroImage from '../assets/images/heroimage.webp';
import wowoVideo from '../assets/wowo-video.mp4';

export const UPCOMING_EXHIBITIONS = [
  {
    id: 'ex-hyd-aug-2026',
    title: 'The Royal Bridal & Festive Couture Edit 2026',
    city: 'Hyderabad',
    venue: 'Taj Krishna, Jubilee Hall, Banjara Hills',
    dates: 'August 14 - 16, 2026',
    time: '10:30 AM - 8:30 PM',
    status: 'Upcoming Next',
    badge: 'Exclusive Pop-up',
    description: 'Join us for an exclusive 3-day boutique showcase featuring our latest bridal lehengas, pure silk Kanjeevarams, and handcrafted groomswear for the upcoming wedding season.',
    image: heroImage,
    highlights: [
      'Private 1-on-1 consultations with Chief Designer Samatha Chowdary',
      'Exclusive preview of unreleased Festive 2026 Trunk Collection',
      'On-site measurement & bespoke customization bookings',
      'Complimentary champagne & high-tea for VIP registered guests'
    ]
  },
  {
    id: 'ex-mum-sep-2026',
    title: 'Symphony of Silks & Zari - Festive Trunk Show',
    city: 'Mumbai',
    venue: 'The St. Regis Mumbai, Lower Parel',
    dates: 'September 08 - 10, 2026',
    time: '11:00 AM - 8:00 PM',
    status: 'Registration Open',
    badge: 'Festive Special',
    description: 'An opulent luxury showcase tailored for Mumbai fashion connoisseurs, bringing Banarasi tissue sarees, embellished fusion gowns, and royal velvet dupattas.',
    image: image2,
    highlights: [
      'Live handloom weaving demonstration by master artisans',
      'Curated bridal trousseau styling sessions',
      'Priority delivery guarantees for Navratri & Diwali orders'
    ]
  },
  {
    id: 'ex-blr-oct-2026',
    title: 'Heritage Elegance - Autumn Trunk Show',
    city: 'Bengaluru',
    venue: 'The Leela Palace, Indiranagar',
    dates: 'October 18 - 20, 2026',
    time: '10:00 AM - 8:00 PM',
    status: 'Announced',
    badge: 'Autumn Edit',
    description: 'Discover South India’s finest handcrafted silks, bespoke half sarees, and contemporary fusion ensembles in Bangalore’s most luxurious setting.',
    image: image1,
    highlights: [
      'Handcrafted Kanjeevaram & Banarasi heirloom sarees showcase',
      'Personal bridal stylist matchmaking'
    ]
  }
];

export const EXHIBITION_GALLERY = [
  {
    id: 1,
    title: 'Hyderabad Grand Wedding Edit',
    location: 'Hyderabad',
    venue: 'Taj Krishna, Banjara Hills',
    year: '2026',
    image: heroImage,
    itemCount: '6 Media Items',
    description: 'Highlights from our 3-day luxury bridal pop-up in Hyderabad featuring over 500 bespoke Kanjeevaram sarees and bridal lehengas.',
    media: [
      { id: 'm1', type: 'video', src: wowoVideo, poster: heroImage, caption: 'Grand Trunk Show Opening & VIP Runway' },
      { id: 'm2', type: 'image', src: heroImage, caption: 'Bespoke Kanjeevaram Saree Showcase' },
      { id: 'm3', type: 'image', src: image1, caption: 'Artisanal Zardosi Lehenga Fitting Session' },
      { id: 'm4', type: 'image', src: image2, caption: 'Celebrity & Designer Fittings with Samatha Chowdary' },
      { id: 'm5', type: 'image', src: image3, caption: 'Hand-Embroidered Velvet Dupatta Display' },
      { id: 'm6', type: 'image', src: image4, caption: 'Happy Brides & Custom Orders Desk' }
    ]
  },
  {
    id: 2,
    title: 'Artisanal Weavers Showcase',
    location: 'Chennai',
    venue: 'The Leela Palace, Chennai',
    year: '2026',
    image: image1,
    itemCount: '5 Media Items',
    description: 'Celebrating master weavers of Kanchipuram and Banaras with live weaving demonstrations and exclusive loom creations.',
    media: [
      { id: 'm1', type: 'video', src: wowoVideo, poster: image1, caption: 'Live Artisan Handloom Weaving Showcase' },
      { id: 'm2', type: 'image', src: image1, caption: 'Pure Mulberry Silk Weaves Display' },
      { id: 'm3', type: 'image', src: image4, caption: 'Real Heirloom Saree Drape Session' },
      { id: 'm4', type: 'image', src: image2, caption: 'Bespoke Order Consultations' },
      { id: 'm5', type: 'image', src: heroImage, caption: 'Exclusive Trunk Show Atmosphere' }
    ]
  },
  {
    id: 3,
    title: 'Luxury Bridal Pop-up',
    location: 'Mumbai',
    venue: 'The St. Regis, Lower Parel',
    year: '2025',
    image: image2,
    itemCount: '5 Media Items',
    description: 'An intimate bridal preview featuring high-shine sequin lehengas, tissue Banarasi sarees, and groom sherwanis.',
    media: [
      { id: 'm1', type: 'video', src: wowoVideo, poster: image2, caption: 'Mumbai Pop-up Highlights & Event Video' },
      { id: 'm2', type: 'image', src: image2, caption: 'Statement Bridal Lehenga Collection' },
      { id: 'm3', type: 'image', src: image3, caption: 'Handloom Silk Tissue Sarees Display' },
      { id: 'm4', type: 'image', src: image4, caption: 'Groomswear & Heritage Sherwanis' },
      { id: 'm5', type: 'image', src: image1, caption: 'VIP High-Tea & Fitting Appointments' }
    ]
  },
  {
    id: 4,
    title: 'Royal Heritage Trunk Show',
    location: 'Bengaluru',
    venue: 'The Leela Palace, Indiranagar',
    year: '2025',
    image: image4,
    itemCount: '5 Media Items',
    description: 'A 3-day haute couture exhibition showcasing traditional heritage weaves and modern Indo-Western fusion wear.',
    media: [
      { id: 'm1', type: 'video', src: wowoVideo, poster: image4, caption: 'Bengaluru Trunk Show Walkthrough Video' },
      { id: 'm2', type: 'image', src: image4, caption: 'Royal Heritage Bridal Collection' },
      { id: 'm3', type: 'image', src: heroImage, caption: 'Pastel Embroidery & Floral Lehengas' },
      { id: 'm4', type: 'image', src: image3, caption: 'Scalloped Velvet & Silk Dupattas' },
      { id: 'm5', type: 'image', src: image2, caption: 'Bespoke Customization Corner' }
    ]
  },
  {
    id: 5,
    title: 'Festive Sequin & Zardosi Edit',
    location: 'Hyderabad',
    venue: 'Park Hyatt, Banjara Hills',
    year: '2025',
    image: image3,
    itemCount: '5 Media Items',
    description: 'Festive pop-up exhibition featuring hand-embroidered sequin sarees, cocktail gowns, and festive bridal ensembles.',
    media: [
      { id: 'm1', type: 'video', src: wowoVideo, poster: image3, caption: 'Festive Trunk Show Event Highlights' },
      { id: 'm2', type: 'image', src: image3, caption: 'Sequin & Metallic Zardosi Craftsmanship' },
      { id: 'm3', type: 'image', src: image1, caption: 'Evening Gowns & Fusion Outfits' },
      { id: 'm4', type: 'image', src: heroImage, caption: 'Silk Kanjeevaram Exhibition Counter' },
      { id: 'm5', type: 'image', src: image4, caption: 'Happy Patrons & Festive Fittings' }
    ]
  }
];

export const PAST_HIGHLIGHTS = [
  {
    number: '120+',
    label: 'Exhibitions Hosted',
    subtext: 'Across major luxury hubs including Hyderabad, Mumbai, Bangalore & Chennai'
  },
  {
    number: '15,000+',
    label: 'Boutique Patrons',
    subtext: 'Brides and families styled for their most memorable occasions'
  },
  {
    number: '100%',
    label: 'Handcrafted Heritage',
    subtext: 'Authentic weaves directly empowering artisan weaver clusters'
  }
];

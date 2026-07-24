import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.jpg';
import image3 from '../assets/images/image3.jpg';
import image4 from '../assets/images/image4.jpg';
import heroImage from '../assets/images/heroimage.webp';

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
  { id: 1, title: 'Hyderabad Grand Wedding Edit', location: 'Hyderabad', image: heroImage, year: '2026' },
  { id: 2, title: 'Artisanal Weavers Showcase', location: 'Chennai', image: image1, year: '2026' },
  { id: 3, title: 'Luxury Bridal Pop-up', location: 'Mumbai', image: image2, year: '2025' },
  { id: 4, title: 'Royal Heritage Trunk Show', location: 'Bengaluru', image: image4, year: '2025' },
  { id: 5, title: 'Festive Sequin & Zardosi Edit', location: 'Hyderabad', image: image3, year: '2025' }
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

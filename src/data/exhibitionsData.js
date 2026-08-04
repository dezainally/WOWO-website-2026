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
    venue: 'Taj Krishna, Jubilee Hills',
    image: heroImage,
    year: '2026',
    itemCount: '6 Items (Video + Photos)',
    media: [
      { id: 'm1', type: 'video', url: wowoVideo, title: 'Runway Highlights & Client Fittings (HD Video)', caption: 'Exclusive live showcase at Taj Krishna, Hyderabad' },
      { id: 'm2', type: 'image', url: heroImage, title: 'Bridal Couture Display Stage', caption: 'Handcrafted Kanjeevaram & Velvet Lehengas' },
      { id: 'm3', type: 'image', url: image1, title: 'VIP Consultation Lounge', caption: 'Personalized 1-on-1 consultations with Samatha Chowdary' },
      { id: 'm4', type: 'image', url: image2, title: 'Festive Velvet & Marodi Collection', caption: 'Bespoke bridal lehengas on display' },
      { id: 'm5', type: 'image', url: image3, title: 'Banarasi Zari Tissue Sarees', caption: 'Hand-loomed tissue silk sarees collection' },
      { id: 'm6', type: 'image', url: image4, title: 'Artisan Weavers Showcase', caption: 'Master weavers demonstrating live zari weaving' }
    ]
  },
  {
    id: 2,
    title: 'Artisanal Weavers Showcase',
    location: 'Chennai',
    venue: 'ITC Grand Chola, Guindy',
    image: image1,
    year: '2026',
    itemCount: '5 Items (Video + Photos)',
    media: [
      { id: 'm2-1', type: 'video', url: wowoVideo, title: 'Handloom Artisan Demonstration (HD Video)', caption: 'Live Kanjivaram silk weaving process demonstration' },
      { id: 'm2-2', type: 'image', url: image1, title: 'Ikshita Mulberry Silk Saree', caption: '24K Gold zari handloom silk saree' },
      { id: 'm2-3', type: 'image', url: image2, title: 'Royal Groom Sherwanis', caption: 'Embroidered silk sherwanis and stoles' },
      { id: 'm2-4', type: 'image', url: image3, title: 'Heritage Silk Dupattas', caption: 'Marodi & pearl artisan embroidered dupattas' },
      { id: 'm2-5', type: 'image', url: image4, title: 'Chennai Exhibition High-Tea Lounge', caption: 'Exclusive trunk show setup at ITC Grand Chola' }
    ]
  },
  {
    id: 3,
    title: 'Luxury Bridal Pop-up',
    location: 'Mumbai',
    venue: 'The St. Regis, Lower Parel',
    image: image2,
    year: '2025',
    itemCount: '5 Items (Video + Photos)',
    media: [
      { id: 'm3-1', type: 'video', url: wowoVideo, title: 'Mumbai Trunk Show Video Highlights', caption: 'Bridal trousseau styling sessions at St. Regis' },
      { id: 'm3-2', type: 'image', url: image2, title: 'Indira Velvet Bridal Lehenga', caption: 'Deep maroon velvet lehenga with zardosi work' },
      { id: 'm3-3', type: 'image', url: heroImage, title: 'Celebrity Styling Corner', caption: 'Exclusive fitting room for VIP guests' },
      { id: 'm3-4', type: 'image', url: image4, title: 'Pastel Organza Gowns', caption: 'Contemporary indo-western fusion gowns' },
      { id: 'm3-5', type: 'image', url: image3, title: 'Bespoke Blouse Tailoring Desk', caption: 'Custom embroidery mapping and measurements' }
    ]
  },
  {
    id: 4,
    title: 'Royal Heritage Trunk Show',
    location: 'Bengaluru',
    venue: 'The Leela Palace, Indiranagar',
    image: image4,
    year: '2025',
    itemCount: '5 Items (Video + Photos)',
    media: [
      { id: 'm4-1', type: 'video', url: wowoVideo, title: 'Bengaluru Trunk Show Walkthrough (Video)', caption: '3-day exhibition walkthrough at The Leela Palace' },
      { id: 'm4-2', type: 'image', url: image4, title: 'Kanjeevaram Bridal Pavilion', caption: 'Pure zari silk sarees display' },
      { id: 'm4-3', type: 'image', url: image1, title: 'Festive Indo-Western Ensembles', caption: 'Cape sets and designer gowns' },
      { id: 'm4-4', type: 'image', url: image3, title: 'Bridal Jewellery Matchmaking', caption: 'Styling lehengas with heritage jewellery' },
      { id: 'm4-5', type: 'image', url: heroImage, title: 'VIP Guest Reception Desk', caption: 'Welcome counter at Leela Palace' }
    ]
  },
  {
    id: 5,
    title: 'Festive Sequin & Zardosi Edit',
    location: 'Hyderabad',
    venue: 'Novotel Convention Centre',
    image: image3,
    year: '2025',
    itemCount: '5 Items (Video + Photos)',
    media: [
      { id: 'm5-1', type: 'video', url: wowoVideo, title: 'Festive Evening Showcase (Video)', caption: 'Runway presentation of handcrafted festive wear' },
      { id: 'm5-2', type: 'image', url: image3, title: 'Sequin & Zardosi Lehengas', caption: 'Hand-embroidered festive partywear' },
      { id: 'm5-3', type: 'image', url: image2, title: 'Embellished Silk Sarees', caption: 'Designer sarees for wedding receptions' },
      { id: 'm5-4', type: 'image', url: image1, title: 'Groomswear & Turban Styling', caption: 'Royal sherwanis and saafa styling' },
      { id: 'm5-5', type: 'image', url: heroImage, title: 'Grand Exhibition Stage', caption: 'Novotel convention center showcase' }
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

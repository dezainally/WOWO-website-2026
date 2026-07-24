import React from 'react';
import { Link } from 'react-router-dom';
import { useInquiry } from '../context/InquiryContext';
import logoImage from '../assets/wowologo.png';
import '../styles/Footer.css';

const Footer = () => {
  const { openWhatsApp, callNow, openInquiryModal } = useInquiry();

  return (
    <footer className="footer-section bg-dark text-white pt-5 pb-4">
      <div className="container px-3 px-lg-4">
        <div className="row g-4 g-lg-5 pb-5 border-bottom border-secondary border-opacity-25">
          
          {/* Column 1: Brand & About Us */}
          <div className="col-lg-4 col-md-6">
            <div className="footer-brand-block">
              <Link to="/">
                <img src={logoImage} alt="WOWO Studio Boutique" className="footer-logo mb-3" />
              </Link>
              <p className="footer-about-text mb-4">
                WOWO Studio is a premier luxury boutique specializing in bespoke bridal lehengas, pure silk Kanjeevarams, Banarasi weaves, and artisanal groomswear. We curate exclusive monthly exhibitions across major cities to bring royal heritage fashion directly to you.
              </p>
              <div className="d-flex align-items-center gap-3">
                <a href="https://www.instagram.com/wowobysamathachowdary/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.999 0zm-.08 1.44h.08c2.13 0 2.382.01 3.226.048.78.037 1.204.167 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                  </svg>
                </a>
                <a href="https://www.facebook.com/share/1FjM8gsDzK/" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                  </svg>
                </a>
                <a href="https://wa.me/919666748789" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.9 7.9 0 0 0 1.08 3.971L0 16l4.149-1.086a7.9 7.9 0 0 0 3.846 1.017h.005c4.368 0 7.92-3.56 7.924-7.93a7.9 7.9 0 0 0-2.323-5.657zm-5.607 11.8a6.56 6.56 0 0 1-3.344-.915l-.24-.143-2.487.652.665-2.42-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.69-4.982c-.193-.097-1.14-.562-1.312-.625-.172-.062-.297-.093-.422.093-.125.187-.484.625-.593.75-.11.125-.218.14-.412.043-.193-.097-.818-.302-1.557-.963-.574-.513-.96-1.147-1.072-1.34-.112-.193-.012-.298.085-.395.088-.088.193-.227.29-.34.097-.113.13-.19.193-.317.063-.127.03-.239-.015-.336-.046-.097-.422-1.018-.578-1.392-.153-.367-.305-.317-.422-.323-.108-.005-.233-.005-.357-.005a.7.7 0 0 0-.51.239c-.176.19-.672.656-.672 1.6 0 .943.688 1.854.783 1.983.097.129 1.353 2.067 3.28 2.898.458.197.815.316 1.094.404.46.146.88.125 1.212.076.37-.055 1.14-.466 1.3-.915.16-.45.16-.836.113-.916-.047-.08-.172-.128-.365-.225" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-lg-2 col-md-6 col-6">
            <h5 className="footer-title mb-3">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/collections">Browse Catalog</Link></li>
              <li><Link to="/exhibitions">Monthly Exhibitions</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact & Location</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="col-lg-3 col-md-6 col-6">
            <h5 className="footer-title mb-3">Couture Categories</h5>
            <ul className="list-unstyled footer-links">
              <li><Link to="/collections?cat=sarees">Sarees & Half Sarees</Link></li>
              <li><Link to="/collections?cat=lehengas">Bridal Lehengas</Link></li>
              <li><Link to="/collections?cat=fusion">Indo-Western Fusion</Link></li>
              <li><Link to="/collections?cat=sherwanis">Heritage Sherwanis</Link></li>
              <li><Link to="/collections?cat=dupattas">Hand-Embroidered Dupattas</Link></li>
              <li><Link to="/collections?cat=gowns">Dresses & Evening Gowns</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Appointments */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-title mb-3">Boutique & Inquiries</h5>
            <div className="footer-contact-info">
              <p className="mb-2">
                <strong className="text-gold">Boutique Studio:</strong><br />
                Road No. 10, Jubilee Hills,<br />
                Hyderabad, Telangana - 500033
              </p>
              <p className="mb-2">
                <strong className="text-gold">Phone / Inquiry:</strong><br />
                <a href="tel:+919666748789" className="text-white text-decoration-none">+91 96667 48789</a>
              </p>
              <p className="mb-3">
                <strong className="text-gold">Direct WhatsApp:</strong><br />
                <button type="button" onClick={() => openWhatsApp()} className="btn btn-outline-light btn-sm mt-1 px-3 rounded-pill">
                  💬 Chat With Stylist
                </button>
              </p>
              <button type="button" onClick={() => openInquiryModal()} className="btn btn-gold w-100 btn-sm py-2">
                Request Private Fitting
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-4">
          <p className="footer-copy-text mb-2 mb-md-0">
            © {new Date().getFullYear()} WOWO Studio by Samatha Chowdary. All Rights Reserved.
          </p>
          <p className="footer-disclaimer-text mb-0">
            * WOWO Studio operates as a luxury boutique. Purchases are finalized via direct inquiry, WhatsApp, or in-person exhibitions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

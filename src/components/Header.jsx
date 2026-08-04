import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useInquiry } from '../context/InquiryContext';
import CategoryIcon from './CategoryIcon';
import { CATEGORIES_DATA } from '../data/productsData';
import logoImage from '../assets/wowo-logo-website.avif';
import '../styles/Header.css';

const Header = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const { callNow } = useInquiry();

  return (
    <div className="header-wrapper sticky-top">
      {/* Scrollable Announcement Bar */}
      {showAnnouncement && (
        <div className="announcement-bar d-flex align-items-center justify-content-between px-3">
          <div className="marquee-container flex-grow-1">
            <div className="marquee-content">
              <span>✨ CELEBRATE WITH WOWO STUDIO: EXPLORE OUR MONTHLY BOUTIQUE EXHIBITIONS & BESPOKE BRIDAL COUTURE! CALL / INQUIRE FOR PRIVATE FITTINGS ✨</span>
              <span>✨ CELEBRATE WITH WOWO STUDIO: EXPLORE OUR MONTHLY BOUTIQUE EXHIBITIONS & BESPOKE BRIDAL COUTURE! CALL / INQUIRE FOR PRIVATE FITTINGS ✨</span>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3 ms-2">
            <button type="button" onClick={callNow} className="call-now-topbar-btn text-nowrap">
              📞 Call: +91 96667 48789
            </button>
            <button
              type="button"
              className="announcement-close-btn border-0 bg-transparent text-white"
              onClick={() => setShowAnnouncement(false)}
              aria-label="Close Announcement"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container-fluid px-lg-5 d-flex align-items-center justify-content-between">

          {/* Left Side: Brand Logo */}
          <Link className="navbar-brand d-flex align-items-center logo-brand me-0" to="/">
            <img src={logoImage} alt="WOWO Studio Logo" className="logo-image" />
          </Link>

          {/* Center: Navigation Links */}
          <div className="collapse navbar-collapse justify-content-center" id="navbarContent">
            <ul className="navbar-nav gap-xl-4 gap-lg-3 my-3 my-lg-0 text-center text-lg-start">
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/">
                  Home
                </NavLink>
              </li>

              {/* Collections with Category Hover Dropdown */}
              <li className="nav-item position-relative dropdown-parent">
                <NavLink
                  className={({ isActive }) => `nav-link nav-link-custom d-flex align-items-center justify-content-center gap-1 ${isActive ? 'active' : ''}`}
                  to="/collections"
                >
                  <span>Collections</span>
                  <svg className="dropdown-chevron" width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 4l4 4 4-4" />
                  </svg>
                </NavLink>

                {/* Hover Dropdown Menu */}
                <div className="collections-dropdown-menu">
                  <div className="dropdown-menu-header">
                    <span className="dropdown-header-title">COUTURE CATEGORIES</span>
                  </div>
                  <div className="dropdown-menu-list">
                    {CATEGORIES_DATA.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/collections?cat=${cat.id}`}
                        className="collections-dropdown-item"
                      >
                        <CategoryIcon categoryId={cat.id} isActive={true} size={16} className="dropdown-gold-icon" />
                        <span className="dropdown-item-title">
                          {cat.id === 'all' ? 'All Collections' : cat.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/past-works">
                  Works
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/exhibitions">
                  Exhibitions <span className="badge bg-gold ms-1">Monthly</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/about">
                  About Us
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`} to="/contact">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right Side: Social Media Icons & Mobile Toggler */}
          <div className="d-flex align-items-center gap-2 gap-sm-3 header-right-section">
            <a href="https://www.instagram.com/wowobysamathachowdary/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.999 0zm-.08 1.44h.08c2.13 0 2.382.01 3.226.048.78.037 1.204.167 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </svg>
            </a>
            <a href="https://www.facebook.com/share/1FjM8gsDzK/" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg>
            </a>
            <a href="https://wa.me/919666748789" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="WhatsApp">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.93a7.9 7.9 0 0 0 1.08 3.971L0 16l4.149-1.086a7.9 7.9 0 0 0 3.846 1.017h.005c4.368 0 7.92-3.56 7.924-7.93a7.9 7.9 0 0 0-2.323-5.657zm-5.607 11.8a6.56 6.56 0 0 1-3.344-.915l-.24-.143-2.487.652.665-2.42-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.69-4.982c-.193-.097-1.14-.562-1.312-.625-.172-.062-.297-.093-.422.093-.125.187-.484.625-.593.75-.11.125-.218.14-.412.043-.193-.097-.818-.302-1.557-.963-.574-.513-.96-1.147-1.072-1.34-.112-.193-.012-.298.085-.395.088-.088.193-.227.29-.34.097-.113.13-.19.193-.317.063-.127.03-.239-.015-.336-.046-.097-.422-1.018-.578-1.392-.153-.367-.305-.317-.422-.323-.108-.005-.233-.005-.357-.005a.7.7 0 0 0-.51.239c-.176.19-.672.656-.672 1.6 0 .943.688 1.854.783 1.983.097.129 1.353 2.067 3.28 2.898.458.197.815.316 1.094.404.46.146.88.125 1.212.076.37-.055 1.14-.466 1.3-.915.16-.45.16-.836.113-.916-.047-.08-.172-.128-.365-.225" />
              </svg>
            </a>

            {/* Mobile Navigation Toggler */}
            <button
              className="navbar-toggler border-0 ms-1 d-lg-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

        </div>
      </nav>
    </div>
  );
};

export default Header;

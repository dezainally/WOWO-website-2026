import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

import heroImg1 from '../assets/images/heroimage.webp';
import heroImg2 from '../assets/hero.png';
import heroImg3 from '../assets/images/image1.png';
import heroImg4 from '../assets/images/image2.jpg';

import '../styles/HeroSection.css';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'WOWO Studio Royal Bridal Saree & Couture',
    link: '/collections',
    image: heroImg1,
  },
  {
    id: 2,
    title: 'WOWO Studio Authentic Handloom Silk Weaves',
    link: '/collections?category=sarees',
    image: heroImg2,
  },
  {
    id: 3,
    title: 'WOWO Studio Luxury Pop-up Exhibitions',
    link: '/exhibitions',
    image: heroImg3,
  },
  {
    id: 4,
    title: 'WOWO Studio Bespoke Bridal Ensembles',
    link: '/past-works',
    image: heroImg4,
  },
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play timer (5.5 seconds per slide)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const currentSlide = HERO_SLIDES[currentIndex];

  // Motion variants for slide transition
  const slideVariants = {
    initial: (dir) => ({
      opacity: 0,
      scale: 1.03,
      x: dir > 0 ? '3%' : '-3%',
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: '0%',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir) => ({
      opacity: 0,
      scale: 0.98,
      x: dir > 0 ? '-3%' : '3%',
      transition: { duration: 0.6, ease: [0.7, 0, 0.84, 0] },
    }),
  };

  return (
    <section
      className="hero-banner-section position-relative overflow-hidden w-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Homepage Luxury Carousel"
    >
      {/* Background Slides Container */}
      <div className="hero-carousel-viewport position-relative w-100 h-100 overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="hero-slide-item position-absolute top-0 start-0 w-100 h-100"
          >
            <Link
              to={currentSlide.link}
              className="d-block w-100 h-100 position-relative text-decoration-none"
              title={currentSlide.title}
            >
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="hero-slide-bg-img w-100 h-100"
              />
              <div className="hero-slide-gradient-overlay" />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Arrows */}
        <button
          type="button"
          onClick={prevSlide}
          className="hero-carousel-nav-btn hero-nav-prev"
          aria-label="Previous Slide"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="hero-carousel-nav-btn hero-nav-next"
          aria-label="Next Slide"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Bottom Carousel Pagination Controls */}
        <div className="hero-carousel-controls-bar position-absolute bottom-0 start-0 w-100 py-3 px-4 d-flex justify-content-between align-items-center">
          {/* Slide Numbers Counter */}
          <div className="hero-slide-counter text-white small fw-medium">
            <span className="current-slide-num text-gold fs-5 fw-bold">
              0{currentIndex + 1}
            </span>
            <span className="counter-divider mx-2 opacity-50">/</span>
            <span className="total-slides-num opacity-75">0{HERO_SLIDES.length}</span>
          </div>

          {/* Dots Pagination with Active Timer Progress */}
          <div className="hero-carousel-dots d-flex align-items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`hero-dot-btn ${isActive ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  <span className="dot-line-fill" />
                </button>
              );
            })}
          </div>

          {/* Pause Indicator / Status badge */}
          <div className="hero-pause-indicator text-light small d-none d-md-flex align-items-center gap-1.5 opacity-75">
            <span className={`pulse-dot ${isPaused ? 'paused' : ''}`} />
            <span>{isPaused ? 'Paused' : 'Auto-Playing'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;



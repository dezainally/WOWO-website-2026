import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPIntro = () => {
  const location = useLocation();

  useEffect(() => {
    // Ensure page is scrolled to top on navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Small delay to ensure DOM nodes are painted after route/location change
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      ScrollTrigger.refresh();

      // 1. Hero & Header Banner Elements (Titles, Subtitles, Breadcrumbs, Paragraphs)
      const headerContainers = document.querySelectorAll(
        '.contact-header-banner, .catalog-header-banner, .about-header-banner, .exhibition-hero-banner, .past-works-header, .hero-banner-section, .pdp-header'
      );

      headerContainers.forEach((container) => {
        const elements = container.querySelectorAll(
          '.subtitle-gold, h1, h2, p, .breadcrumb, .badge, button, a'
        );
        if (elements.length > 0) {
          gsap.fromTo(
            elements,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: 'power3.out',
              overwrite: 'auto'
            }
          );
        }
      });

      // 2. Section Headers (Curated Season, Shop Styles, Testimonials, Video, Newsletter)
      const sectionHeaders = document.querySelectorAll(
        '.curated-header-block, .shop-styles-header, .testimonials-header, .video-section-content, .newsletter-box, .exhibition-spotlight-section, .boutique-trust-section .text-center'
      );

      sectionHeaders.forEach((header) => {
        const children = header.querySelectorAll(
          '.subtitle-gold, .curated-title, .shop-styles-title, .testimonials-title, .video-section-subtitle, .video-section-title, .newsletter-section-tag, .newsletter-section-title, .curated-motif, .curated-title-line, .shop-styles-divider, .testimonials-divider, p'
        );
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: header,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // 3. Grid Cards (Product Cards, Category Cards, Testimonial Cards, Trust Cards, Stat Cards, Gallery Cards)
      const cardSections = document.querySelectorAll(
        '.row, .curated-cards-grid, .shop-slider-track, .testimonial-slider-track'
      );

      cardSections.forEach((section) => {
        const cards = section.querySelectorAll(
          '.shop-product-card, .curated-card-wrapper, .catalog-product-card, .testimonial-card, .trust-card, .stat-card, .exhibition-event-card, .gallery-item-card, .past-work-card'
        );
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 45, opacity: 0, scale: 0.96 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.75,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });

      // 4. Photos / Product Display Stages
      const photoContainers = document.querySelectorAll(
        '.main-image-stage, .about-img-stage, .hero-banner-img, .video-section img, .testimonial-img-box img, .next-exhibition-mini-card'
      );

      photoContainers.forEach((photo) => {
        gsap.fromTo(
          photo,
          { opacity: 0, scale: 0.97, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: photo,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 5. Interactive Action Buttons & Pill Filters
      const buttonGroups = document.querySelectorAll(
        '.category-pill-btn, .btn-pdp-request-price, .btn-pdp-whatsapp, .btn-pdp-call, .btn-gold-lg, .btn-request-header, .shop-slider-arrow, .testimonial-arrow'
      );

      if (buttonGroups.length > 0) {
        gsap.fromTo(
          buttonGroups,
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.04,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: buttonGroups[0],
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

    }, 120);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [location.pathname, location.search, location.hash, location.key]);
};

// Custom helper function to trigger card animations when filtering/changing categories dynamically
export const animateCardsGSAP = (selector = '.shop-product-card, .catalog-product-card') => {
  const cards = document.querySelectorAll(selector);
  if (cards.length > 0) {
    gsap.fromTo(
      cards,
      { y: 30, opacity: 0, scale: 0.96 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        overwrite: 'auto'
      }
    );
  }
};

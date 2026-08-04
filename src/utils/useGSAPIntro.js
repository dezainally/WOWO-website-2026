import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPIntro = () => {
  const location = useLocation();

  // Instant pre-paint scroll reset to top (0,0) before browser paint
  useLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.search, location.hash, location.key]);

  useEffect(() => {
    // Re-verify top position after DOM paint
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Small delay to allow React DOM paint before initializing GSAP triggers
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      ScrollTrigger.refresh();

      // 1. Hero & Top Banner Intro (Titles, Subtitles, Badges, Action Buttons)
      const heroBanners = document.querySelectorAll(
        '.contact-header-banner, .catalog-header-banner, .about-header-banner, .exhibition-hero-banner, .past-works-header, .hero-banner-section, .pdp-header'
      );

      heroBanners.forEach((banner) => {
        const textElements = banner.querySelectorAll(
          '.subtitle-gold, h1, h2, p, .breadcrumb, .badge, .btn, button, a'
        );
        if (textElements.length > 0) {
          gsap.fromTo(
            textElements,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.1,
              ease: 'power3.out',
              overwrite: 'auto'
            }
          );
        }
      });

      // 2. Section Headers (Subtitles, Section Titles, Accent Lines)
      const sectionHeaders = document.querySelectorAll(
        '.curated-header-block, .shop-styles-header, .testimonials-header, .video-section-content, .newsletter-box, .exhibition-spotlight-section, .boutique-trust-section .text-center'
      );

      sectionHeaders.forEach((header) => {
        const children = header.querySelectorAll(
          '.subtitle-gold, h2, p, .curated-motif, .curated-title-line, .shop-styles-divider, .testimonials-divider, .newsletter-section-tag'
        );
        if (children.length > 0) {
          gsap.fromTo(
            children,
            { y: 35, opacity: 0 },
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

      // 3. Grid Cards (Product Cards, Category Cards, Testimonial Cards, Stat Cards, Gallery Cards)
      const cardSections = document.querySelectorAll(
        '.row, .curated-cards-grid, .shop-slider-track, .testimonial-slider-track, .category-filter-pills'
      );

      cardSections.forEach((section) => {
        const cards = section.querySelectorAll(
          '.shop-product-card, .curated-card-wrapper, .catalog-product-card, .testimonial-card, .trust-card, .stat-card, .exhibition-event-card, .gallery-item-card, .past-work-card, .category-pill-btn'
        );
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 45, opacity: 0, scale: 0.95 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.8,
              stagger: 0.07,
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

      // 4. Photos, Main Images, Display Stages
      const photoContainers = document.querySelectorAll(
        '.main-image-stage, .about-img-stage, .hero-banner-img, .video-section img, .testimonial-img-box img, .next-exhibition-card'
      );

      photoContainers.forEach((photo) => {
        gsap.fromTo(
          photo,
          { opacity: 0, scale: 0.96, y: 25 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: photo,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // 5. Interactive Buttons
      const actionButtons = document.querySelectorAll(
        '.btn-gold, .btn-gold-lg, .btn-pdp-request-price, .btn-pdp-whatsapp, .btn-pdp-call, .btn-request-header, .shop-slider-arrow, .testimonial-arrow'
      );

      if (actionButtons.length > 0) {
        gsap.fromTo(
          actionButtons,
          { y: 20, opacity: 0, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.04,
            ease: 'back.out(1.5)',
            scrollTrigger: {
              trigger: actionButtons[0],
              start: 'top 92%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

    }, 80);

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

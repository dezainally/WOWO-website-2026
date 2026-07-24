import React from 'react';
import { Link } from 'react-router-dom';
import { useInquiry } from '../context/InquiryContext';
import heroImage from '../assets/images/heroimage.webp';
import '../styles/HeroSection.css';

const HeroSection = () => {
  const { openInquiryModal } = useInquiry();

  return (
    <section className="hero-banner-section position-relative overflow-hidden w-100">
      <img
        src={heroImage}
        alt="WOWO Studio Luxury Bridal Collection"
        className="hero-banner-img w-100"
      />

    </section>
  );
};

export default HeroSection;

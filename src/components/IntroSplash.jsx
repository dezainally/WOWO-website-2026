import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import roundButton from '../assets/round-button.png';
import wowologo1 from '../assets/wowologo2.png';
import wowologo2 from '../assets/wowologo1.png';

export default function IntroSplash({ onFinish }) {
  const [showSplash, setShowSplash] = useState(true);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    // Step 2: Reveal logo at t = 3.3s
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 3300);

    // Step 4: Initiate splash exit fade out at t = 7.3s
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 7300);

    // Step 4: Call onFinish callback after exit animation completes at t = 8.1s (7.3s + 0.8s)
    const finishTimer = setTimeout(() => {
      if (typeof onFinish === 'function') {
        onFinish();
      }
    }, 8100);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(splashTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="intro-splash-screen"
          className="intro-splash-wrapper"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Absolute Centered Anchor (200px x 200px) */}
          <div
            className="intro-center-anchor"
            style={{
              position: 'relative',
              width: '200px',
              height: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Step 1: Rolling Wheel / Round Button (0.0s – 3.0s) */}
            <motion.img
              src={roundButton}
              alt="Rolling Wheel"
              initial={{ x: '-200vw', rotate: -1800, opacity: 1 }}
              animate={{ x: 0, rotate: 0, opacity: 1 }}
              transition={{ duration: 3, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                width: '100px',
                height: 'auto',
                zIndex: 1,
              }}
            />

            {/* Step 2: Brand Logo Reveal (t = 3.3s) */}
            {showLogo && (
              <motion.img
                src={wowologo1}
                alt="WOWO Brand Logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  width: '120px',
                  height: 'auto',
                  zIndex: 2,
                }}
              />
            )}

            {/* Step 3: Caption Reveal (t = 3.8s, 0.5s delay after showLogo) */}
            {showLogo && (
              <motion.img
                src={wowologo2}
                alt="WOWO Studio Caption"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '170px',
                  width: '130px',
                  height: 'auto',
                  zIndex: 1,
                }}
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

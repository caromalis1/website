import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionTwoOverlay = ({ containerRef }) => {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["100vh", "0vh"]);

  return (
    <motion.section
      className="fullscreen-section section-two"
      style={{ y, willChange: 'transform' }}
    >
      <div className="section-content">
        <h2 className="section-heading">Heading Two</h2>
        <p className="section-paragraph">Lorem ipsum dolor sit amet</p>
        <div className="svg-icon-placeholder">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="50" fill="#6E75FF" stroke="#8B5CF6" strokeWidth="4"/>
            <path d="M40 60L55 75L80 45" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="60" cy="60" r="8" fill="white"/>
          </svg>
        </div>
      </div>
    </motion.section>
  );
};

export default SectionTwoOverlay;

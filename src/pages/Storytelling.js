import '../App.css';
import React, { useRef } from 'react';
import HeroSection from '../components/sections/HeroSection';
import SectionOne from '../components/sections/SectionOne';
import SectionTwo from '../components/sections/SectionTwo';
import SectionTwoOverlay from '../components/sections/SectionTwoOverlay';
import SectionThree from '../components/sections/SectionThree';
import SectionFour from '../components/sections/SectionFour';

export default function Storytelling() {
  const overlayRef = useRef(null);

  return (
    <div className="App">
      <div className="sections-container">
        <div className="stacked-container">
          <HeroSection />
          <SectionOne />
          <SectionTwo />
          <SectionThree />
          <SectionFour />
          </div>
      </div>
    </div>
  );
}



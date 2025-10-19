import React from 'react';

const SVGPattern = ({ variant = 'geometric' }) => {
  const patterns = {
    geometric: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="geometric" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="currentColor" opacity="0.3"/>
            <path d="M0 10h20M10 0v20" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#geometric)"/>
      </svg>
    ),
    waves: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
            <path d="M0,10 Q25,0 50,10 T100,10 V20 H0 Z" fill="currentColor" opacity="0.1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#waves)"/>
      </svg>
    ),
    dots: (
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1" fill="currentColor" opacity="0.2"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)"/>
      </svg>
    )
  };

  return (
    <div className="svg-pattern">
      {patterns[variant] || patterns.geometric}
    </div>
  );
};

export default SVGPattern;

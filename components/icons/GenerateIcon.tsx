
import React from 'react';

const GenerateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m12 3-1.9 1.9a10 10 0 0 0-5.2 8.2A10 10 0 0 0 12 21a10 10 0 0 0 7.1-2.9 10 10 0 0 0-5.2-13.2L12 3Z" />
    <path d="M12 3v1" />
    <path d="M21 12h-1" />
    <path d="M3 12H2" />
    <path d="m18.4 5.6-.8.8" />
    <path d="m6.4 17.6-.8.8" />
  </svg>
);

export default GenerateIcon;

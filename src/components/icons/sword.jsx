import React from "react";

const Sword = ({ width, height }) => (
  <svg
    width="321"
    height="4"
    viewBox="0 0 321 4"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      x1="18"
      y1="2"
      x2="321"
      y2="2.00003"
      stroke="url(#paint0_linear)"
      stroke-width="4"
    />
    <rect x="9" width="5" height="4" fill="white" />
    <rect width="5" height="4" fill="white" />
    <defs>
      <linearGradient
        id="paint0_linear"
        x1="26.9394"
        y1="4.00004"
        x2="321"
        y2="4.00119"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="white" />
        <stop offset="1" stop-color="white" stop-opacity="0" />
      </linearGradient>
    </defs>
  </svg>
)

export default Sword;

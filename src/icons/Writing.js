import { lightGray, secondaryGreenShades } from 'anker-colors';
import React from 'react';
import styled from 'styled-components';

const StyledSvg = styled.svg`
  .cls-1 {
    fill: ${() => lightGray}; /* lightest */
  }
  .cls-2,
  .cls-3 {
    fill: ${() => secondaryGreenShades['100']};
  }
  .cls-3,
  .cls-5,
  .cls-6 {
    stroke: ${secondaryGreenShades['500']}; /* full */
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .cls-4,
  .cls-6 {
    fill: #fff;
  }
  .cls-5 {
    fill: none;
  }
`;

const SpeakingIcon = props => {
  return (
    <StyledSvg
      id="Duotone"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 112"
      {...props}
    >
      <title>18- pseudo-code</title>
      <g id="Icons">
        <g id="Background">
          <circle className="cls-1" cx="50.34" cy="56" r="40" />
        </g>
        <g id="Scene">
          <ellipse
            className="cls-2"
            cx="49.12"
            cy="82.96"
            rx="22.24"
            ry="1.72"
          />
          <path
            className="cls-3"
            d="M30.7,31.75H58.44a2,2,0,0,1,2,2v39.4a0,0,0,0,1,0,0H30.7a2,2,0,0,1-2-2V33.75a2,2,0,0,1,2-2Z"
            transform="translate(-12.37 13.78) rotate(-15.47)"
          />
          <rect
            className="cls-4"
            x="34.79"
            y="35.23"
            width="31.74"
            height="41.4"
            rx="2"
            ry="2"
            transform="translate(101.33 111.86) rotate(180)"
          />
          <rect
            className="cls-5"
            x="34.79"
            y="35.23"
            width="31.74"
            height="41.4"
            rx="2"
            ry="2"
          />
          <polyline
            className="cls-5"
            points="45.14 43.51 41.69 46.96 45.14 50.41"
          />
          <polyline
            className="cls-5"
            points="52.73 43.51 56.18 46.96 52.73 50.41"
          />
          <line className="cls-5" x1="49.97" y1="43.51" x2="47.21" y2="50.41" />
          <line className="cls-5" x1="40.31" y1="55.93" x2="58.25" y2="55.93" />
          <line className="cls-5" x1="40.31" y1="60.07" x2="53.42" y2="60.07" />
          <line className="cls-5" x1="40.31" y1="64.21" x2="49.97" y2="64.21" />
          <rect
            className="cls-4"
            x="67.65"
            y="43.78"
            width="5.52"
            height="26.22"
            transform="translate(60.85 -33.12) rotate(45)"
          />
          <path
            className="cls-6"
            d="M59.19,64.21c-.09,0-1.7,3.87-2.49,5.78a.46.46,0,0,0,.61.6l5.78-2.48Z"
          />
          <rect
            className="cls-5"
            x="67.65"
            y="43.78"
            width="5.52"
            height="26.22"
            transform="translate(60.85 -33.12) rotate(45)"
          />
          <rect
            className="cls-3"
            x="77.89"
            y="45.26"
            width="5.52"
            height="2.76"
            transform="translate(56.6 -43.37) rotate(45)"
          />
          <path
            className="cls-6"
            d="M85.05,46.15a2.76,2.76,0,0,0-3.91-3.9l-1.46,1.46,3.9,3.91Z"
          />
          <path
            className="cls-3"
            d="M60.36,69.28,58,66.91C57.53,68,57,69.17,56.7,70a.46.46,0,0,0,.61.6Z"
          />
        </g>
      </g>
    </StyledSvg>
  );
};

export default SpeakingIcon;

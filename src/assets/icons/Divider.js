import React from "react";

const css = `
.cls-1{fill:none;}
.cls-2{clip-path:url(#clip-path);}
.cls-3{fill:#822000;}
`;

const SvgDivider = props => (
  <svg className='dividerImage' id="Layer_1" data-name="Layer 1" viewBox="0 0 226.08 3">
    <defs>
      <style>{css}</style>
      <clipPath id="clip-path" transform="translate(-666 -479)">
        <rect className="cls-1" x="666" y="479" width="226.08" height="3" />
      </clipPath>
    </defs>
    <title>stat-block-header-bar</title>
    <g className="cls-2">
      <path
        className="cls-3"
        d="M666,482c5.76,0,226.08-1.5,226.08-1.5S671.76,479,666,479Z"
        transform="translate(-666 -479)"
      />
    </g>
  </svg>
);

export default SvgDivider;

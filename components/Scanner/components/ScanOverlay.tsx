import React from "react";
import "../style/style.scss";

const ScanOverlay = () => {
  return (
    <div className={"scan-overlay"}>
      <svg viewBox="0 0 100 100">
        <path
          fill="none"
          d="M13,0 L0,0 L0,13"
          stroke="#ff7e0a"
          stroke-width="5"
        ></path>
        <path
          fill="none"
          d="M0,87 L0,100 L13,100"
          stroke="#ff7e0a"
          stroke-width="5"
        ></path>
        <path
          fill="none"
          d="M87,100 L100,100 L100,87"
          stroke="#ff7e0a"
          stroke-width="5"
        ></path>
        <path
          fill="none"
          d="M100,13 L100,0 87,0"
          stroke="#ff7e0a"
          stroke-width="5"
        ></path>
      </svg>
      <p className="text-[#ff7e0a] text-center mt-3 bg-[#fff1e6] font-semibold rounded-xl">
        Quét QR tại bàn ăn của quý khách
      </p>
    </div>
  );
};

export default ScanOverlay;

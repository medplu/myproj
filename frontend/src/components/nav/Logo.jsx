import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/landing" className="flex rounded-xl overflow-hidden">
      {/* Left Section with SVG */}
      <div
        className="bg-yellow-400 flex items-center justify-center"
        style={{ width: "40px", height: "40px" }}
      >
        <svg
          fill="#FFFFFF"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 431.771 431.771"
          xml:space="preserve"
          stroke="#ffa500"
          width="20"
          height="20"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <g>
              <g>
                <path
                  d="M332.314,239.837c2.292,6.147,8.154,10.219,14.711,10.219h69.044c8.664,0,15.701-7.029,15.701-15.701 c0-8.66-7.037-15.701-15.701-15.701h-58.144L326.647,134.7c-2.236-6.014-7.927-10.057-14.335-10.215 c-6.455-0.134-12.282,3.619-14.811,9.506l-28.236,65.866L232.733,63.702c-1.884-7.077-8.491-11.936-15.726-11.621 c-7.309,0.26-13.471,5.534-14.853,12.717l-43.703,226.947L127.473,169.25c-1.688-6.658-7.494-11.447-14.349-11.834 c-6.899-0.294-13.167,3.749-15.577,10.169l-22.506,60.018H15.699C7.025,227.603,0,234.631,0,243.304 c0,8.664,7.025,15.7,15.699,15.7h70.214c6.546,0,12.403-4.063,14.704-10.198l8.706-23.22l35.962,142.256 c1.773,6.993,8.057,11.862,15.214,11.862c0.156,0,0.307,0,0.463-0.008c7.356-0.217,13.573-5.507,14.966-12.728l44.15-229.239 l30.612,114.021c1.731,6.464,7.358,11.116,14.046,11.598c6.561,0.433,12.908-3.326,15.537-9.474l30.629-71.471L332.314,239.837z"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* Right Section with Text */}
      <div
        className="bg-blue-500 text-white text-sm items-center p-1"
        style={{ width: "calc(100% - 40px)", minHeight: "40px" }}
      >
        Medplus<sup>+</sup>
      </div>
    </Link>
  );
};

export default Logo;

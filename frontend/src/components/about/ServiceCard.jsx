import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";
import './about.css';
const ServiceCard = ({ title, details, icon, link }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.5, // Trigger when 50% of the card is in view
  });

  return (
<div
  ref={ref}
  className={`w-full  p-4 bg-blue-200 ${
    inView ? "animate-fadeIn" : "opacity-0"
  }`}
>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

        <div className="p-6 flex flex-col items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white">
            <img src={icon} alt={title} />
          </div>
          <h3 className="text-xl font-bold text-slate-950 text-center mb-2">{title}</h3>
          <p className="font-normal text-gray-700 dark:text-gray-400">{details}</p>
          <a href="/services" className="text-blue-600">{link}</a>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
